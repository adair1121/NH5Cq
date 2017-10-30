var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//基础属性
var BasePropertyBuff = (function (_super) {
    __extends(BasePropertyBuff, _super);
    function BasePropertyBuff() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BasePropertyBuff.prototype, "type", {
        //Buff类型
        get: function () { return BuffType.BaseProperty; },
        enumerable: true,
        configurable: true
    });
    //Buff被添加时调用
    BasePropertyBuff.prototype.addBuff = function (target) {
        var blackboardComp = this.target.getComponent(ComponentType.Blackboard);
        for (var i = 0; i < this.buffTp.Argument1.length; i++)
            blackboardComp.modifyAttrValue(this.buffTp.Argument1[i], this.buffTp.Argument2[i]);
        this.effectTime = this.buffTp.EffectUpLimit;
        if (this.buffTp.EffectUpLimit > 0) {
            this.timerInfo = new TimerInfo(this);
            TimerMgr.Instance.addTimerEvent(this.timerInfo);
        }
        return _super.prototype.addBuff.call(this, target);
    };
    //Buff被移除时调用
    BasePropertyBuff.prototype.removeBuff = function () {
        var blackboardComp = this.target.getComponent(ComponentType.Blackboard);
        for (var i = 0; i < this.buffTp.Argument1.length; i++)
            blackboardComp.modifyAttrValue(this.buffTp.Argument1[i], -this.buffTp.Argument2[i]);
        return _super.prototype.removeBuff.call(this);
    };
    //定时器更新
    BasePropertyBuff.prototype.TimerUpdate = function (timerInfo, deltaTime) {
        if (this.buffTp.EffectUpLimit <= 0)
            return;
        this.effectTime -= deltaTime;
        if (this.effectTime <= 0) {
            var battleComp = this.target.getComponent(ComponentType.Battle);
            battleComp.removeBuff(this);
        }
    };
    return BasePropertyBuff;
}(BuffBase));
__reflect(BasePropertyBuff.prototype, "BasePropertyBuff");
//# sourceMappingURL=BasePropertyBuff.js.map