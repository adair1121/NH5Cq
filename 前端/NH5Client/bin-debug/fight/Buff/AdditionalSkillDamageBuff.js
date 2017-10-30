var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//附加技能伤害
var AdditionalSkillDamageBuff = (function (_super) {
    __extends(AdditionalSkillDamageBuff, _super);
    function AdditionalSkillDamageBuff() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AdditionalSkillDamageBuff.prototype, "type", {
        //Buff类型
        get: function () { return BuffType.AdditionalSkillDamage; },
        enumerable: true,
        configurable: true
    });
    //Buff修正技能参数列表 只要在buff参与技能预算时才会调用
    AdditionalSkillDamageBuff.prototype.TriggerSkillBuff = function (skillArgList) {
        if (Utility.random(0, 10000) <= this.buffTp.Argument1[0]) {
            var value = skillArgList.getItem(SkillArgDefine.AtkValue);
            skillArgList.setItem(SkillArgDefine.AtkValue, value + this.buffTp.Argument2[0]);
        }
    };
    //Buff被添加时调用
    AdditionalSkillDamageBuff.prototype.addBuff = function (target) {
        this.effectTime = this.buffTp.EffectUpLimit;
        if (this.buffTp.EffectUpLimit > 0) {
            this.timerInfo = new TimerInfo(this);
            TimerMgr.Instance.addTimerEvent(this.timerInfo);
        }
        return _super.prototype.addBuff.call(this, target);
    };
    //定时器更新
    AdditionalSkillDamageBuff.prototype.TimerUpdate = function (timerInfo, deltaTime) {
        if (this.buffTp.EffectUpLimit <= 0)
            return;
        this.effectTime -= deltaTime;
        if (this.effectTime <= 0) {
            var battleComp = this.target.getComponent(ComponentType.Battle);
            battleComp.removeBuff(this);
        }
    };
    return AdditionalSkillDamageBuff;
}(BuffBase));
__reflect(AdditionalSkillDamageBuff.prototype, "AdditionalSkillDamageBuff");
//# sourceMappingURL=AdditionalSkillDamageBuff.js.map