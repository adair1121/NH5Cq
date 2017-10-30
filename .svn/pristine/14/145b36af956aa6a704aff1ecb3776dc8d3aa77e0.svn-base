var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//伤害/治疗
var DamageTreatBuff = (function (_super) {
    __extends(DamageTreatBuff, _super);
    function DamageTreatBuff() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DamageTreatBuff.prototype, "type", {
        //Buff类型
        get: function () { return BuffType.DamageTreat; },
        enumerable: true,
        configurable: true
    });
    //Buff被添加时调用
    DamageTreatBuff.prototype.addBuff = function (target) {
        if (this.buffTp.EffectUpLimit > 0 && this.buffTp.EffectSpace > 0) {
            this.callTimes = Math.ceil(this.buffTp.EffectUpLimit / this.buffTp.EffectSpace);
            this.timerInfo = new TimerInfo(this, this.buffTp.EffectSpace);
            TimerMgr.Instance.addTimerEvent(this.timerInfo);
        }
        return _super.prototype.addBuff.call(this, target);
    };
    //Buff被移除时调用
    DamageTreatBuff.prototype.removeBuff = function () {
        return _super.prototype.removeBuff.call(this);
    };
    //定时器更新
    DamageTreatBuff.prototype.TimerUpdate = function (timerInfo, deltaTime) {
        if (this.buffTp.EffectUpLimit > 0 && this.callTimes > 0)
            this.callTimes--;
        var blackboardComp = this.caster.getComponent(ComponentType.Blackboard);
        var atk = blackboardComp.getAttrValue(data.RoleAttr.ATK);
        var drd = blackboardComp.getAttrValue(data.RoleAttr.DRD);
        var value = Math.floor(atk * this.buffTp.Argument1[0] / 10000 + this.buffTp.Argument2[0]);
        value = value < 0 ? Math.floor(value * (1 - drd / 10000)) : value;
        var targetComp = this.target.getComponent(ComponentType.Blackboard);
        var maxHp = targetComp.getAttrValue(data.RoleAttr.MHP);
        var currHp = targetComp.getAttrValue(data.RoleAttr.HP) + value;
        var currHp = currHp <= 0 ? 0 : currHp;
        var currHp = currHp >= maxHp ? maxHp : currHp;
        targetComp.setAttrValue(data.RoleAttr.HP, currHp);
        ModuleEventMgr.instance.triger(new HpTipsEvent(this.target, value));
        if (this.callTimes <= 0) {
            var battleComp = this.target.getComponent(ComponentType.Battle);
            battleComp.removeBuff(this);
        }
    };
    return DamageTreatBuff;
}(BuffBase));
__reflect(DamageTreatBuff.prototype, "DamageTreatBuff");
//# sourceMappingURL=DamageTreatBuff.js.map