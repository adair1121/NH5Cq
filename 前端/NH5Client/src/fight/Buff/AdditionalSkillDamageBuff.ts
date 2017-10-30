//附加技能伤害
class AdditionalSkillDamageBuff extends BuffBase
{
	//影响时间
	public effectTime:number;

	//Buff类型
	public get type():BuffType { return BuffType.AdditionalSkillDamage; }

	//Buff修正技能参数列表 只要在buff参与技能预算时才会调用
	public TriggerSkillBuff(skillArgList:List<number>)
	{
		if (Utility.random(0, 10000) <= this.buffTp.Argument1[0])
		{
			var value:number = skillArgList.getItem(SkillArgDefine.AtkValue);
			skillArgList.setItem(SkillArgDefine.AtkValue, value + this.buffTp.Argument2[0]);
		}
	}

	//Buff被添加时调用
	public addBuff(target:Entity):BuffBase
	{
		this.effectTime = this.buffTp.EffectUpLimit;

		if (this.buffTp.EffectUpLimit > 0)
		{
			this.timerInfo = new TimerInfo(this);
			TimerMgr.Instance.addTimerEvent(this.timerInfo);
		}

		return super.addBuff(target);
	}

	//定时器更新
	public TimerUpdate(timerInfo:TimerInfo, deltaTime:number):void
	{
		if (this.buffTp.EffectUpLimit <= 0)
			return;

		this.effectTime -= deltaTime;
		
		if (this.effectTime <= 0)
		{
			var battleComp = this.target.getComponent<BattleComponent>(ComponentType.Battle);
			battleComp.removeBuff(this);
		}
	}
}