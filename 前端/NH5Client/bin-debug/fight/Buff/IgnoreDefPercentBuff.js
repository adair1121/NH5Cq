var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//无视防御百分比
var IgnoreDefPercentBuff = (function (_super) {
    __extends(IgnoreDefPercentBuff, _super);
    function IgnoreDefPercentBuff() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(IgnoreDefPercentBuff.prototype, "type", {
        //Buff类型
        get: function () { return BuffType.IgnoreDefPercent; },
        enumerable: true,
        configurable: true
    });
    //Buff修正技能参数列表 只要在buff参与技能预算时才会调用
    IgnoreDefPercentBuff.prototype.TriggerSkillBuff = function (skillArgList) {
        if (Utility.random(0, 10000) <= this.buffTp.Argument1[0]) {
            var value = skillArgList.getItem(SkillArgDefine.Def);
            skillArgList.setItem(SkillArgDefine.Def, value * (10000 + this.buffTp.Argument2[0] / 10000));
        }
    };
    //Buff被添加时调用
    IgnoreDefPercentBuff.prototype.addBuff = function (target) {
        this.effectTime = this.buffTp.EffectUpLimit;
        if (this.buffTp.EffectUpLimit > 0) {
            this.timerInfo = new TimerInfo(this);
            TimerMgr.Instance.addTimerEvent(this.timerInfo);
        }
        return _super.prototype.addBuff.call(this, target);
    };
    //定时器更新
    IgnoreDefPercentBuff.prototype.TimerUpdate = function (timerInfo, deltaTime) {
        if (this.buffTp.EffectUpLimit <= 0)
            return;
        this.effectTime -= deltaTime;
        if (this.effectTime <= 0) {
            var battleComp = this.target.getComponent(ComponentType.Battle);
            battleComp.removeBuff(this);
        }
    };
    return IgnoreDefPercentBuff;
}(BuffBase));
__reflect(IgnoreDefPercentBuff.prototype, "IgnoreDefPercentBuff");
//# sourceMappingURL=IgnoreDefPercentBuff.js.map