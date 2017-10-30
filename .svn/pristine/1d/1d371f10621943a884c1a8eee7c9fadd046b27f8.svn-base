var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//怪物战斗组件
var MonsterBattleComponent = (function (_super) {
    __extends(MonsterBattleComponent, _super);
    //构造 [0]:角色技能信息 [1]:怪物模版ID
    function MonsterBattleComponent(owner, arg) {
        var _this = _super.call(this, owner) || this;
        _this.isStartFight = true;
        var skillIdList = arg[0];
        var monsterId = arg[1];
        _this.monsterTp = TempleMgr.select("UnitTemple", monsterId);
        _this.monsterAiTp = TempleMgr.select("MonsterAITemple", _this.monsterTp.AI);
        _this.skillDic = new Dictionary();
        skillIdList.forEach(function (id) {
            var skill = SkillBase.createSkillById(owner, id);
            if (!!skill)
                _this.skillDic.add(skill.skillGroupId, skill);
        });
        return _this;
    }
    Object.defineProperty(MonsterBattleComponent.prototype, "moveTime", {
        //移动时间
        get: function () { return this.monsterTp.moveTime; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonsterBattleComponent.prototype, "atkDistance", {
        //攻击距离
        get: function () { return this.monsterTp.atkDistance; },
        enumerable: true,
        configurable: true
    });
    //初始化组件
    MonsterBattleComponent.prototype.init = function () {
        _super.prototype.init.call(this);
        this.owner.addEventListener(RoleEventDefine.TriggerFight, this.triggerFight);
    };
    //释放组件
    MonsterBattleComponent.prototype.release = function () {
        _super.prototype.release.call(this);
        this.owner.removeEventListener(RoleEventDefine.TriggerFight, this.triggerFight);
    };
    //获取可释放的技能
    MonsterBattleComponent.prototype.getCastSkill = function () {
        var blackboardComp = this.owner.getComponent(ComponentType.Blackboard);
        var hp = blackboardComp.getAttrValue(data.RoleAttr.HP);
        var mhp = blackboardComp.getAttrValue(data.RoleAttr.MHP);
        var hpRate = hp / mhp;
        //当出现多个血量比例时，应该升序填写，满足任何一个时跳出
        var skillId = 0;
        for (var i = 0; i < this.monsterAiTp.lifePrc.length; i++) {
            var liftRate = this.monsterAiTp.lifePrc[i] / 10000;
            if (hpRate <= liftRate) {
                skillId = this.monsterAiTp.lifePrc[i];
                break;
            }
        }
        if (skillId <= 0) {
            for (var j = 0; j < this.monsterAiTp.fightTime.length; j++) {
                var fightTime = this.monsterAiTp.fightTime[j] / 10000;
                if (SceneModule.BattleScene.currTime >= fightTime) {
                    skillId = this.monsterAiTp.timeSkill[j];
                    break;
                }
            }
        }
        if (skillId <= 0) {
            var random = Utility.random(0, 10000);
            for (var k = 0; k < this.monsterAiTp.rate.length; k++) {
                var rate = this.monsterAiTp.rate[k] / 10000;
                if (random <= rate) {
                    skillId = this.monsterAiTp.rateSkill[k];
                    break;
                }
            }
        }
        if (skillId <= 0)
            skillId = this.monsterAiTp.skill;
        var skill = this.skillDic.getValue(skillId);
        if (!skill)
            console.error("MonsterBattleComponent getCastSkill cast skillId == 0");
        return skill;
    };
    //触发战斗
    MonsterBattleComponent.prototype.triggerFight = function (args) {
        this.isStartFight = true;
        this.owner.removeEventListener(RoleEventDefine.TriggerFight, this.triggerFight);
    };
    return MonsterBattleComponent;
}(BattleComponent));
__reflect(MonsterBattleComponent.prototype, "MonsterBattleComponent");
//# sourceMappingURL=MonsterBattleComponent.js.map