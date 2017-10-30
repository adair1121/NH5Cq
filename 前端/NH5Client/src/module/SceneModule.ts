module SceneModule
{
    //创建场景
	export function createScene(levelStageId:number):void
    {
        BattleScene.Instance.init(levelStageId);
    }

    //战斗场景
    export class BattleScene
    {
        //固定帧更新时间 毫秒
        public static readonly fixTime:number = 16.67;
        protected static mapId:number;
        public static get currMapId() { return this.mapId; }

        //当前帧数和游戏时间
        protected static tickCount:number;
        public static get currTickCount() { return this.tickCount; }
        public static get currTime() { return this.tickCount * BattleScene.fixTime; }

        public static readonly Instance:BattleScene = new BattleScene();

        //定时器索引
        protected timerIndex:number = -1;

        //目标停留的格子 通过格子下标查询
        protected readonly roleStayDic:Dictionary<number, MapModule.MapCell>;

        //目标停留的格子 通过实例ID查询
        protected readonly roleStayInstDic:Dictionary<string, MapModule.MapCell>;

        //需要移除的实体列表
        protected readonly removeEntityList:List<Entity>;

        //关卡模版
        protected levelStageTp:data.LevelStageTemple;

        public constructor()
        {
            this.roleStayDic = new Dictionary<number, MapModule.MapCell>();
            this.roleStayInstDic = new Dictionary<string, MapModule.MapCell>();
            this.removeEntityList = new List<Entity>();
        }

        //初始化场景
        public init(levelStageId:number):void
        {
            this.levelStageTp = TempleMgr.select<data.LevelStageTemple>("LevelStageTemple", levelStageId);
            if (!this.levelStageTp)
            {
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
        }
        
        //释放场景
        public release():void
        {
            ModuleEventMgr.instance.removeModuleEventListener(ModuleEvent.RoleMove, this.roleMove, this);
            ModuleEventMgr.instance.removeModuleEventListener(ModuleEvent.CreateEntity, this.createEntity, this);
            ModuleEventMgr.instance.removeModuleEventListener(ModuleEvent.RemoveEntity, this.removeEntity, this);

            ViewMap.instance.release();

            this.roleStayDic.foreach(cell => cell.isOpen = true);
            this.roleStayDic.clear();
            this.roleStayInstDic.clear();
            this.removeEntityList.clear();

            EntityMgr.Instance.clear();

            this.removeSceneTimer();
        }

        //每帧更新
        //private update(this:BattleScene, args:any[]):boolean
        private update(deltaTime:number):boolean
        {
            EntityMgr.Instance.foreach(entity =>
            {
                var blackboardComp = entity.getComponent<BlackboardComponent>(ComponentType.Blackboard);
                if (blackboardComp.getAttrValue(data.RoleAttr.HP) <= 0)
                    return;

                var battleComp = entity.getComponent<BattleComponent>(ComponentType.Battle);
                battleComp.Update(BattleScene.fixTime);

            }, this);

            if (this.removeEntityList.count > 0)
            {
                this.removeEntityList.forEach(entity =>
                { 
                    var stayCell = this.roleStayInstDic.getValue(entity.instanceId);
                    if (!!stayCell)
                    {
                        stayCell.isOpen = true;
                        this.roleStayDic.remove(stayCell.Index);
                        this.roleStayInstDic.remove(entity.instanceId);
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
        }

        //战斗结束
        private fightEnd(result:FightResult):void
        {
            //this.removeSceneTimer();
            console.log("fightEnd result:" + result);

            var birthPt:egret.Point;
            var entityList = EntityMgr.Instance.getEntityList(CampDefine.Player, "111111");
            entityList.forEach(entity =>
            {
                var blackboardComp = entity.getComponent<BlackboardComponent>(ComponentType.Blackboard);
                blackboardComp.setAttrValue(data.RoleAttr.HP, blackboardComp.getAttrValue(data.RoleAttr.MHP));
                blackboardComp.setAttrValue(data.RoleAttr.MP, blackboardComp.getAttrValue(data.RoleAttr.MHP));

                if (entity.createSeq == 0)
                    birthPt = blackboardComp.getPosition();
            });

            this.createMonster(this.levelStageTp.MonsterID, this.levelStageTp.Num, birthPt);
        }

        //移除场景定时器
        public removeSceneTimer():void
        {
            egret.stopTick(this.update, this);
        }

        //创建玩家
        public createPlayer(birthPoint:egret.Point):void
        {
            var roleInfo:proto.Client_RoleInfo = new proto.Client_RoleInfo();
            roleInfo.instanceId = "1";
            roleInfo.job = 1;
            roleInfo.roleAttr = new Array<number>(data.RoleAttr.MAX);

            var roleInitTp = TempleMgr.select<data.RoleInitTemple>("RoleInitTemple", roleInfo.job);
            for(let i = 0; i <roleInitTp.FightAttr.length; i++)
                roleInfo.roleAttr[roleInitTp.FightAttr[i]] = roleInitTp.FightValue[i];

            roleInfo.skills = new Array<proto.SkillInfo>();
            roleInfo.skills.push(new proto.SkillInfo().init(600110001));

            var entity = Entity.createRoleEntity(roleInfo, CampDefine.Player, "111111", 0);
            ModuleEventMgr.instance.triger(new CreateEntityEvent(entity, birthPoint));
        }

        //创建怪物
        public createMonster(monsterId:number, count:number, birthPoint:egret.Point, mapId?:number):void
        {
            let rangeX = TempleMgr.select<data.GlobalDefineTemple>("GlobalDefineTemple", GlobalDefine.RefreshX).argument;
            let rangeY = TempleMgr.select<data.GlobalDefineTemple>("GlobalDefineTemple", GlobalDefine.RefreshY).argument;

            var ptRefresh = MapModule.randomBorder(birthPoint, rangeX, rangeY, mapId);

            var cellList = MapModule.getRandomCellByPoint(ptRefresh, count, mapId);
            if (!!cellList && cellList.count > 0)
            {
                cellList.forEach(cell =>
                {
                    let entity = Entity.createMonsterEntity(monsterId);
                    ModuleEventMgr.instance.triger(new CreateEntityEvent(entity, cell.toPoint()));
                });
            }
        }
        
        //角色移动
        private roleMove(roleMove:RoleMoveEvent):void
        {
            var fromCell = MapModule.getMapCellByPoint(roleMove.ptFrom, BattleScene.mapId);
            var toCell = MapModule.getMapCellByPoint(roleMove.ptTo, BattleScene.mapId);

            if (!!fromCell)
            {
                fromCell.isOpen = true;
                this.roleStayDic.remove(fromCell.Index);
                this.roleStayInstDic.remove(roleMove.who.instanceId);
            }

            if (!!toCell)
            {
                toCell.isOpen = false;
                this.roleStayDic.add(toCell.Index, toCell);
                this.roleStayInstDic.add(roleMove.who.instanceId, toCell);

                var blackboardComp = roleMove.who.getComponent<BlackboardComponent>(ComponentType.Blackboard);
                blackboardComp.setPosition(toCell.toPoint());
            }
        }

        //创建实体
        private createEntity(createEntity:CreateEntityEvent):void
        {
            var entity = createEntity.who;
            var blackboardComp = entity.getComponent<BlackboardComponent>(ComponentType.Blackboard);

            blackboardComp.setAttrValue(data.RoleAttr.x, createEntity.pos.x);
            blackboardComp.setAttrValue(data.RoleAttr.y, createEntity.pos.y);

            blackboardComp.setAttrValue(data.RoleAttr.HP, blackboardComp.getAttrValue(data.RoleAttr.MHP));
            blackboardComp.setAttrValue(data.RoleAttr.MP, blackboardComp.getAttrValue(data.RoleAttr.MMP));
            
            EntityMgr.Instance.addEntity(entity);
        }

        //移除实体
        private removeEntity(removeEntity:RemoveEntityEvent):void
        {
            this.removeEntityList.add(removeEntity.who);
        }
    }
}