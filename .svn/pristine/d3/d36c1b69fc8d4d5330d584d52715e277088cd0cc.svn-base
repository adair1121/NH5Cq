var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//Buff基类
var BuffBase = (function () {
    function BuffBase() {
        if (BuffBase.buffTypeDic.count == 0) {
            this.addConstructor(BuffType.AdditionalSkillDamage, AdditionalSkillDamageBuff);
            this.addConstructor(BuffType.BaseBattleProperty, BasePropertyBuff);
            this.addConstructor(BuffType.BaseProperty, BasePropertyBuff);
            this.addConstructor(BuffType.DamageTreat, DamageTreatBuff);
            this.addConstructor(BuffType.Faint, FaintBuff);
            this.addConstructor(BuffType.IgnoreDefPercent, IgnoreDefPercentBuff);
            this.addConstructor(BuffType.Protect, ProtectBuff);
        }
    }
    //Buff修正技能参数列表 只要在buff参与技能预算时才会调用
    BuffBase.prototype.TriggerSkillBuff = function (skillArgList) { };
    //获取构造
    BuffBase.prototype.addConstructor = function (type, newT) {
        BuffBase.buffTypeDic.add(type, newT);
    };
    //定时器更新
    BuffBase.prototype.TimerUpdate = function (timerInfo, deltaTime) { };
    //Buff被添加时调用
    BuffBase.prototype.addBuff = function (target) {
        this.target = target;
        return this;
    };
    //Buff被移除时调用
    BuffBase.prototype.removeBuff = function () {
        if (!!this.timerInfo)
            TimerMgr.Instance.removeTimerEvent(this.timerInfo);
        return this;
    };
    //通过BuffId创建Buff
    BuffBase.createBuffById = function (owner, buffId, skillId) {
        var buffTp = TempleMgr.select("BuffTemple", buffId);
        if (!buffTp)
            return null;
        return this.createBuffByTp(owner, buffTp, skillId);
    };
    //通过Buff模版创建Buff
    BuffBase.createBuffByTp = function (owner, buffTp, skillId) {
        var func = BuffBase.buffTypeDic.getValue(buffTp.BuffType);
        if (!func)
            return null;
        var buff = new func();
        buff.caster = owner;
        buff.buffTp = buffTp;
        buff.ownerSkillId = skillId;
        return buff;
    };
    return BuffBase;
}());
//所有buff类型对应的创建函数
BuffBase.buffTypeDic = new Dictionary();
__reflect(BuffBase.prototype, "BuffBase", ["TimerBehaviour"]);
//# sourceMappingURL=BuffBase.js.map