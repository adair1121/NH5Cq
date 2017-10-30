var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//角色战斗组件
var RoleBattleComponent = (function (_super) {
    __extends(RoleBattleComponent, _super);
    //构造 [0]:角色技能信息 [1]:职业
    function RoleBattleComponent(owner, arg) {
        var _this = _super.call(this, owner) || this;
        _this.isStartFight = true;
        var skillIdList = arg[0];
        _this.jobInitTp = TempleMgr.select("JobInitTemple", _this.owner.job);
        var skillDic = new Dictionary();
        skillIdList.forEach(function (id) {
            var skill = SkillBase.createSkillById(owner, id);
            if (!!skill)
                skillDic.add(skill.skillGroupId, skill);
        });
        _this.skillQueue = new Queue();
        _this.jobInitTp.skillOrder.forEach(function (skillId) {
            var skill = skillDic.getValue(skillId);
            if (!!skill)
                _this.skillQueue.enQueue(skill);
        });
        return _this;
    }
    Object.defineProperty(RoleBattleComponent.prototype, "moveTime", {
        //移动时间
        get: function () { return this.jobInitTp.moveTime; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleBattleComponent.prototype, "atkDistance", {
        //攻击距离
        get: function () { return this.jobInitTp.atkDistance; },
        enumerable: true,
        configurable: true
    });
    //初始化组件
    RoleBattleComponent.prototype.init = function () {
        _super.prototype.init.call(this);
        this.owner.addEventListener(RoleEventDefine.SkillUpgrade, this.skillUpgrade);
    };
    //释放组件
    RoleBattleComponent.prototype.release = function () {
        _super.prototype.release.call(this);
        this.owner.removeEventListener(RoleEventDefine.SkillUpgrade, this.skillUpgrade);
    };
    //获取可释放的技能
    RoleBattleComponent.prototype.getCastSkill = function () {
        for (var i = 0; i < this.skillQueue.count; i++) {
            var currSkill = this.skillQueue.deQueue();
            this.skillQueue.enQueue(currSkill);
            if (!!currSkill.isCastSkill() && !!currSkill.canUseSkill)
                return currSkill;
        }
        console.error("PlayerBattleComponent getCastSkill == null");
        return null;
    };
    //技能升级 [0]:职业 [1]:升级前技能ID [2]:升级后技能ID
    RoleBattleComponent.prototype.skillUpgrade = function (args) {
        if (!args || args.length < 3) {
            console.error("PlayerBattleComponent skillUpgrade args.length < 3");
            return;
        }
        var job = args[0];
        var preSkillId = args[1];
        var currSkillId = args[2];
        this.skillQueue.forEach(function (skill) {
            if (skill.skillTp.ID == preSkillId)
                skill.resetSkill(currSkillId);
        });
    };
    return RoleBattleComponent;
}(BattleComponent));
__reflect(RoleBattleComponent.prototype, "RoleBattleComponent");
//# sourceMappingURL=RoleBattleComponent.js.map