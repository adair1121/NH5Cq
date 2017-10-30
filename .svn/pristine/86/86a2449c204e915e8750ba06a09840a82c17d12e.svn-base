//基础属性
class BasePropertyBuff extends BuffBase
{
	//影响时间
	protected effectTime:number;

	//Buff类型
	public get type():BuffType { return BuffType.BaseProperty; }

	//Buff被添加时调用
	public addBuff(target:Entity):BuffBase
	{
		var blackboardComp = this.target.getComponent<BlackboardComponent>(ComponentType.Blackboard);
		
		for(let i = 0; i < this.buffTp.Argument1.length; i++)
			blackboardComp.modifyAttrValue(this.buffTp.Argument1[i], this.buffTp.Argument2[i]);

		this.effectTime = this.buffTp.EffectUpLimit;

		if (this.buffTp.EffectUpLimit > 0)
		{
			this.timerInfo = new TimerInfo(this);
			TimerMgr.Instance.addTimerEvent(this.timerInfo);
		}

		return super.addBuff(target);
	}

	//Buff被移除时调用
	public removeBuff():BuffBase
	{
		var blackboardComp = this.target.getComponent<BlackboardComponent>(ComponentType.Blackboard);

		for(let i = 0; i < this.buffTp.Argument1.length; i++)
			blackboardComp.modifyAttrValue(this.buffTp.Argument1[i], -this.buffTp.Argument2[i]);

		return super.removeBuff();
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