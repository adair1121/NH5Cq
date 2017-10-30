var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SceneModule;
(function (SceneModule) {
    //创建场景
    function createScene(levelStageId) {
        BattleScene.Instance.init(levelStageId);
    }
    SceneModule.createScene = createScene;
    //战斗场景
    var BattleScene = (function () {
        function BattleScene() {
            //定时器索引
            this.timerIndex = -1;
            this.roleStayDic = new Dictionary();
            this.roleStayInstDic = new Dictionary();
            this.removeEntityList = new List();
        }
        Object.defineProperty(BattleScene, "currMapId", {
            get: function () { return this.mapId; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BattleScene, "currTickCount", {
            get: function () { return this.tickCount; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BattleScene, "currTime", {
            get: function () { return this.tickCount * BattleScene.fixTime; },
            enumerable: true,
            configurable: true
        });
        //初始化场景
        BattleScene.prototype.init = function (levelStageId) {
            this.levelStageTp = TempleMgr.select("LevelStageTemple", levelStageId);
            if (!this.levelStageTp) {
                console.error("BattleScene init levelStageTp == null");
                return;
            }
            BattleScene.mapId = this.levelStageTp.MapID;
            ModuleEventMgr.instance.addModuleEventListener(ModuleEvent.RoleMove, this.roleMove, this);
            ModuleEventMgr.instance.addModuleEventListener(ModuleEvent.CreateEntity, this.createEntity, this);
            ModuleEventMgr.instance.addModuleEventListener(ModuleEvent.RemoveEntity, this.removeEntity, this);
            var birthPoint = new egret.Point(this.levelStageTp.BirthPoint[0], this.levelStageTp.BirthPoint[1]);
            ViewMap.instance.init(this.levelStageTp.MapID, birthPoint);
            this.createPlayer(birthPoint);
            this.createMonster(this.levelStageTp.MonsterID, this.levelStageTp.Num, birthPoint);
            //this.timerIndex = egret.setInterval<BattleScene>(this.update, this, BattleScene.fixTime);
            egret.startTick(this.update, this);
        };
        //释放场景
        BattleScene.prototype.release = function () {
            ModuleEventMgr.instance.removeModuleEventListener(ModuleEvent.RoleMove, this.roleMove, this);
            ModuleEventMgr.instance.removeModuleEventListener(ModuleEvent.CreateEntity, this.createEntity, this);
            ModuleEventMgr.instance.removeModuleEventListener(ModuleEvent.RemoveEntity, this.removeEntity, this);
            ViewMap.instance.release();
            this.roleStayDic.foreach(function (cell) { return cell.isOpen = true; });
            this.roleStayDic.clear();
            this.roleStayInstDic.clear();
            this.removeEntityList.clear();
            EntityMgr.Instance.clear();
            this.removeSceneTimer();
        };
        //每帧更新
        //private update(this:BattleScene, args:any[]):boolean
        BattleScene.prototype.update = function (deltaTime) {
            var _this = this;
            EntityMgr.Instance.foreach(function (entity) {
                var blackboardComp = entity.getComponent(ComponentType.Blackboard);
                if (blackboardComp.getAttrValue(data.RoleAttr.HP) <= 0)
                    return;
                var battleComp = entity.getComponent(ComponentType.Battle);
                battleComp.Update(BattleScene.fixTime);
            }, this);
            if (this.removeEntityList.count > 0) {
                this.removeEntityList.forEach(function (entity) {
                    var stayCell = _this.roleStayInstDic.getValue(entity.instanceId);
                    if (!!stayCell) {
                        stayCell.isOpen = true;
                        _this.roleStayDic.remove(stayCell.Index);
                        _this.roleStayInstDic.remove(entity.instanceId);
                    }
                    EntityMgr.Instance.removeEntity(entity);
                }, this);
                this.removeEntityList.clear();
            }
            var otherCampList = EntityMgr.Instance.getOtherCampEnityList(CampDefine.Player);
            var playerEntityList = EntityMgr.Instance.getGroupEnityList(CampDefine.Player);
            if (otherCampList.count == 0 || playerEntityList.count == 0)
                this.fightEnd(otherCampList.count == 0 ? FightResult.Win : FightResult.Lose);
            return false;
        };
        //战斗结束
        BattleScene.prototype.fightEnd = function (result) {
            //this.removeSceneTimer();
            console.log("fightEnd result:" + result);
            var birthPt;
            var entityList = EntityMgr.Instance.getEntityList(CampDefine.Player, "111111");
            entityList.forEach(function (entity) {
                var blackboardComp = entity.getComponent(ComponentType.Blackboard);
                blackboardComp.setAttrValue(data.RoleAttr.HP, blackboardComp.getAttrValue(data.RoleAttr.MHP));
                blackboardComp.setAttrValue(data.RoleAttr.MP, blackboardComp.getAttrValue(data.RoleAttr.MHP));
                if (entity.createSeq == 0)
                    birthPt = blackboardComp.getPosition();
            });
            this.createMonster(this.levelStageTp.MonsterID, this.levelStageTp.Num, birthPt);
        };
        //移除场景定时器
        BattleScene.prototype.removeSceneTimer = function () {
            egret.stopTick(this.update, this);
        };
        //创建玩家
        BattleScene.prototype.createPlayer = function (birthPoint) {
            var roleInfo = new proto.Client_RoleInfo();
            roleInfo.instanceId = "1";
            roleInfo.job = 1;
            roleInfo.roleAttr = new Array(data.RoleAttr.MAX);
            var roleInitTp = TempleMgr.select("RoleInitTemple", roleInfo.job);
            for (var i = 0; i < roleInitTp.FightAttr.length; i++)
                roleInfo.roleAttr[roleInitTp.FightAttr[i]] = roleInitTp.FightValue[i];
            roleInfo.skills = new Array();
            roleInfo.skills.push(new proto.SkillInfo().init(600110001));
            var entity = Entity.createRoleEntity(roleInfo, CampDefine.Player, "111111", 0);
            ModuleEventMgr.instance.triger(new CreateEntityEvent(entity, birthPoint));
        };
        //创建怪物
        BattleScene.prototype.createMonster = function (monsterId, count, birthPoint, mapId) {
            var rangeX = TempleMgr.select("GlobalDefineTemple", GlobalDefine.RefreshX).argument;
            var rangeY = TempleMgr.select("GlobalDefineTemple", GlobalDefine.RefreshY).argument;
            var ptRefresh = MapModule.randomBorder(birthPoint, rangeX, rangeY, mapId);
            var cellList = MapModule.getRandomCellByPoint(ptRefresh, count, mapId);
            if (!!cellList && cellList.count > 0) {
                cellList.forEach(function (cell) {
                    var entity = Entity.createMonsterEntity(monsterId);
                    ModuleEventMgr.instance.triger(new CreateEntityEvent(entity, cell.toPoint()));
                });
            }
        };
        //角色移动
        BattleScene.prototype.roleMove = function (roleMove) {
            var fromCell = MapModule.getMapCellByPoint(roleMove.ptFrom, BattleScene.mapId);
            var toCell = MapModule.getMapCellByPoint(roleMove.ptTo, BattleScene.mapId);
            if (!!fromCell) {
                fromCell.isOpen = true;
                this.roleStayDic.remove(fromCell.Index);
                this.roleStayInstDic.remove(roleMove.who.instanceId);
            }
            if (!!toCell) {
                toCell.isOpen = false;
                this.roleStayDic.add(toCell.Index, toCell);
                this.roleStayInstDic.add(roleMove.who.instanceId, toCell);
                var blackboardComp = roleMove.who.getComponent(ComponentType.Blackboard);
                blackboardComp.setPosition(toCell.toPoint());
            }
        };
        //创建实体
        BattleScene.prototype.createEntity = function (createEntity) {
            var entity = createEntity.who;
            var blackboardComp = entity.getComponent(ComponentType.Blackboard);
            blackboardComp.setAttrValue(data.RoleAttr.x, createEntity.pos.x);
            blackboardComp.setAttrValue(data.RoleAttr.y, createEntity.pos.y);
            blackboardComp.setAttrValue(data.RoleAttr.HP, blackboardComp.getAttrValue(data.RoleAttr.MHP));
            blackboardComp.setAttrValue(data.RoleAttr.MP, blackboardComp.getAttrValue(data.RoleAttr.MMP));
            EntityMgr.Instance.addEntity(entity);
        };
        //移除实体
        BattleScene.prototype.removeEntity = function (removeEntity) {
            this.removeEntityList.add(removeEntity.who);
        };
        return BattleScene;
    }());
    //固定帧更新时间 毫秒
    BattleScene.fixTime = 16.67;
    BattleScene.Instance = new BattleScene();
    SceneModule.BattleScene = BattleScene;
    __reflect(BattleScene.prototype, "SceneModule.BattleScene");
})(SceneModule || (SceneModule = {}));
//# sourceMappingURL=SceneModule.js.map