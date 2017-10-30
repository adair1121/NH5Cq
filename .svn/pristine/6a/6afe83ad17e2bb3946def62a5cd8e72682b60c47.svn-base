//伤害/治疗
class DamageTreatBuff extends BuffBase
{
	//调用次数
	protected callTimes:number;

	//Buff类型
	public get type():BuffType { return BuffType.DamageTreat; }

	//Buff被添加时调用
	public addBuff(target:Entity):BuffBase
	{
		if (this.buffTp.EffectUpLimit > 0 && this.buffTp.EffectSpace > 0)
		{
			this.callTimes = Math.ceil(this.buffTp.EffectUpLimit / this.buffTp.EffectSpace);

			this.timerInfo = new TimerInfo(this, this.buffTp.EffectSpace);
			TimerMgr.Instance.addTimerEvent(this.timerInfo);
		}

		return super.addBuff(target);
	}

	//Buff被移除时调用
	public removeBuff():BuffBase
	{
		return super.removeBuff();
	}

	//定时器更新
	public TimerUpdate(timerInfo:TimerInfo, deltaTime:number):void
	{
		if (this.buffTp.EffectUpLimit > 0 && this.callTimes > 0)
			this.callTimes--;

		var blackboardComp = this.caster.getComponent<BlackboardComponent>(ComponentType.Blackboard);
		var atk = blackboardComp.getAttrValue(data.RoleAttr.ATK);
		var drd = blackboardComp.getAttrValue(data.RoleAttr.DRD);

		var value = Math.floor(atk * this.buffTp.Argument1[0] / 10000 + this.buffTp.Argument2[0]);
		value = value < 0 ? Math.floor(value * (1 - drd / 10000)) : value;

		var targetComp = this.target.getComponent<BlackboardComponent>(ComponentType.Blackboard);
		var maxHp = targetComp.getAttrValue(data.RoleAttr.MHP);
		var currHp = targetComp.getAttrValue(data.RoleAttr.HP) + value;

		var currHp = currHp <= 0 ? 0 : currHp;
		var currHp = currHp >= maxHp ? maxHp : currHp;

		targetComp.setAttrValue(data.RoleAttr.HP, currHp);
		ModuleEventMgr.instance.triger(new HpTipsEvent(this.target, value));

		if (this.callTimes <= 0)
		{
			var battleComp = this.target.getComponent<BattleComponent>(ComponentType.Battle);
			battleComp.removeBuff(this);
		}
	}
}