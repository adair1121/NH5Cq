var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//攻击状态
var AttackState = (function (_super) {
    __extends(AttackState, _super);
    function AttackState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AttackState.prototype, "state", {
        //状态
        get: function () { return FSMState.Attack; },
        enumerable: true,
        configurable: true
    });
    //进入状态 [0]:目标
    AttackState.prototype.OnEnter = function (args) {
        this.target = args[0];
        var battleComp = this.owner.getComponent(ComponentType.Battle);
        this.skill = battleComp.getCastSkill();
        this.skillPeriod = this.skill.skillTp.skillPeriod;
        this.isCastSkill = false;
        this.skill.OnEnter(this.target);
    };
    //执行状态
    AttackState.prototype.OnExcuter = function (deltaTime) {
        this.skillPeriod -= deltaTime;
        if (!!this.skill && !this.isCastSkill)
            this.isCastSkill = this.skill.OnExcuter(deltaTime);
        if (this.skillPeriod <= 0 && this.isCastSkill)
            this.owner.trigger(RoleEventDefine.ChangeState, FSMState.Idle, this.target);
    };
    //离开状态
    AttackState.prototype.OnLeave = function () {
        if (!!this.skill)
            this.skill.OnLeave();
    };
    return AttackState;
}(StateBase));
__reflect(AttackState.prototype, "AttackState");
//# sourceMappingURL=AttackState.js.map