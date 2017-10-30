var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//护盾 可抵挡Ap和Ad伤害 减免百分比
var ProtectBuff = (function (_super) {
    __extends(ProtectBuff, _super);
    function ProtectBuff() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ProtectBuff.prototype, "type", {
        //Buff类型
        get: function () { return BuffType.Protect; },
        enumerable: true,
        configurable: true
    });
    //Buff被添加时调用
    ProtectBuff.prototype.addBuff = function (target) {
        var blackboardComp = this.caster.getComponent(ComponentType.Blackboard);
        blackboardComp.modifyAttrValue(data.RoleAttr.DRD, this.buffTp.Argument1[0]);
        if (this.buffTp.EffectUpLimit > 0) {
            this.timerInfo = new TimerInfo(this);
            TimerMgr.Instance.addTimerEvent(this.timerInfo);
        }
        return _super.prototype.addBuff.call(this, target);
    };
    //Buff被移除时调用
    ProtectBuff.prototype.removeBuff = function () {
        var blackboardComp = this.caster.getComponent(ComponentType.Blackboard);
        blackboardComp.modifyAttrValue(data.RoleAttr.DRD, -this.buffTp.Argument1[0]);
        return _super.prototype.removeBuff.call(this);
    };
    //定时器更新
    ProtectBuff.prototype.TimerUpdate = function (timerInfo, deltaTime) {
        if (this.buffTp.EffectUpLimit <= 0)
            return;
        this.effectTime -= deltaTime;
        if (this.effectTime <= 0) {
            var battleComp = this.target.getComponent(ComponentType.Battle);
            battleComp.removeBuff(this);
        }
    };
    return ProtectBuff;
}(BuffBase));
__reflect(ProtectBuff.prototype, "ProtectBuff");
//# sourceMappingURL=ProtectBuff.js.map