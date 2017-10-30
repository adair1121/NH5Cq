var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//待机状态
var IdleState = (function (_super) {
    __extends(IdleState, _super);
    function IdleState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(IdleState.prototype, "state", {
        //状态
        get: function () { return FSMState.Idle; },
        enumerable: true,
        configurable: true
    });
    //进入状态 [0]:目标
    IdleState.prototype.OnEnter = function (args) {
        var target = args[0];
        if (!target) {
            this.owner.currDirection = MapModule.Around.DOWN;
            this.owner.trigger(RoleEventDefine.PlayAnimation, ShowClipDefine.Idle, MapModule.Around.DOWN);
            return;
        }
        var targetComp = target.getComponent(ComponentType.Blackboard);
        if (targetComp.getAttrValue(data.RoleAttr.HP) <= 0) {
            this.owner.trigger(RoleEventDefine.PlayAnimation, ShowClipDefine.Idle, this.owner.currDirection);
            return;
        }
        var selfComp = this.owner.getComponent(ComponentType.Blackboard);
        var selfPos = selfComp.getPosition();
        var targetPos = targetComp.getPosition();
        var battleComp = this.owner.getComponent(ComponentType.Battle);
        //如果在移动状态并且没有在攻击范围内
        if (Utility.distanceCellByPt(selfPos, targetPos) > battleComp.atkDistance && this.fsm.preFSMState.state == FSMState.Move)
            return;
        var lookAt = Utility.lookAt(selfPos.x, selfPos.y, targetPos.x, targetPos.y);
        this.owner.currDirection = lookAt;
        this.owner.trigger(RoleEventDefine.PlayAnimation, ShowClipDefine.Idle, lookAt);
    };
    //执行状态
    IdleState.prototype.OnExcuter = function (deltaTime) {
        var selfComp = this.owner.getComponent(ComponentType.Blackboard);
        var selfPos = selfComp.getPosition();
        var objRet = this.getNearestTarget(selfPos);
        if (!objRet || !objRet["targetEntity"])
            return;
        var target = objRet["targetEntity"];
        var battleComp = this.owner.getComponent(ComponentType.Battle);
        if (objRet["distance"] <= battleComp.atkDistance) {
            this.owner.trigger(RoleEventDefine.ChangeState, FSMState.Attack, target);
            return;
        }
        this.owner.trigger(RoleEventDefine.ChangeState, FSMState.Move, target, battleComp.moveTime);
    };
    //离开状态
    IdleState.prototype.OnLeave = function () { };
    //获取最近的目标
    IdleState.prototype.getNearestTarget = function (selfPos) {
        var entityList = EntityMgr.Instance.getOtherCampEnityList(this.owner.camp);
        if (!entityList || entityList.count == 0)
            return null;
        var distance = ConstDefine.IntMaxValue;
        var targetEntity = null;
        entityList.forEach(function (entity) {
            var targetComp = entity.getComponent(ComponentType.Blackboard);
            if (targetComp.getAttrValue(data.RoleAttr.HP) <= 0)
                return;
            var targetDistance = Utility.distanceCellByPt(selfPos, targetComp.getPosition());
            if (targetDistance < distance) {
                targetEntity = entity;
                distance = targetDistance;
            }
        });
        return { distance: distance, targetEntity: targetEntity };
    };
    return IdleState;
}(StateBase));
__reflect(IdleState.prototype, "IdleState");
//# sourceMappingURL=IdleState.js.map