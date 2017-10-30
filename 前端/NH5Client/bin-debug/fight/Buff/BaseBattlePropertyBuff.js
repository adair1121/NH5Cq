var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//战斗属性
var BaseBattlePropertyBuff = (function (_super) {
    __extends(BaseBattlePropertyBuff, _super);
    function BaseBattlePropertyBuff() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BaseBattlePropertyBuff.prototype, "type", {
        //Buff类型
        get: function () { return BuffType.BaseBattleProperty; },
        enumerable: true,
        configurable: true
    });
    //Buff被添加时调用
    BaseBattlePropertyBuff.prototype.addBuff = function (target) {
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
    BaseBattlePropertyBuff.prototype.removeBuff = function () {
        var blackboardComp = this.target.getComponent(ComponentType.Blackboard);
        for (var i = 0; i < this.buffTp.Argument1.length; i++)
            blackboardComp.modifyAttrValue(this.buffTp.Argument1[i], -this.buffTp.Argument2[i]);
        return _super.prototype.removeBuff.call(this);
    };
    //定时器更新
    BaseBattlePropertyBuff.prototype.TimerUpdate = function (timerInfo, deltaTime) {
        if (this.buffTp.EffectUpLimit <= 0)
            return;
        this.effectTime -= deltaTime;
        if (this.effectTime <= 0) {
            var battleComp = this.target.getComponent(ComponentType.Battle);
            battleComp.removeBuff(this);
        }
    };
    return BaseBattlePropertyBuff;
}(BuffBase));
__reflect(BaseBattlePropertyBuff.prototype, "BaseBattlePropertyBuff");
//# sourceMappingURL=BaseBattlePropertyBuff.js.map