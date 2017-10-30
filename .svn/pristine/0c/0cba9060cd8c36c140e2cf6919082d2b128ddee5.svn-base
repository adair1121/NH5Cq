var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//移动状态
var MoveState = (function (_super) {
    __extends(MoveState, _super);
    function MoveState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MoveState.prototype, "state", {
        //状态
        get: function () { return FSMState.Move; },
        enumerable: true,
        configurable: true
    });
    //进入状态 [0]:目标 [1]:移动时间
    MoveState.prototype.OnEnter = function (args) {
        this.target = args[0];
        this.moveTime = args[1];
        var selfComp = this.owner.getComponent(ComponentType.Blackboard);
        var selfPos = selfComp.getPosition();
        var targetComp = this.target.getComponent(ComponentType.Blackboard);
        var targetPos = targetComp.getPosition();
        var findPathComp = this.owner.getComponent(ComponentType.FindPath);
        var toPostion = findPathComp.getNextMoveCell(targetPos, selfPos, 1);
        this.owner.currDirection = Utility.lookAt(selfPos.x, selfPos.y, toPostion.x, toPostion.y);
        this.owner.trigger(RoleEventDefine.PlayAnimation, this.state, this.owner.currDirection);
        ModuleEventMgr.instance.triger(new RoleMoveEvent(this.owner, selfPos, toPostion, this.moveTime));
    };
    //执行状态
    MoveState.prototype.OnExcuter = function (deltaTime) {
        this.moveTime -= deltaTime;
        if (this.moveTime > 0)
            return;
        this.owner.trigger(RoleEventDefine.ChangeState, FSMState.Idle, this.target);
    };
    //离开状态
    MoveState.prototype.OnLeave = function () { };
    return MoveState;
}(StateBase));
__reflect(MoveState.prototype, "MoveState");
//# sourceMappingURL=MoveState.js.map