//护盾 可抵挡Ap和Ad伤害 减免百分比
class ProtectBuff extends BuffBase
{
	//Buff影响时间
	protected effectTime:number;

	//Buff类型
	public get type():BuffType { return BuffType.Protect; }

	//Buff被添加时调用
	public addBuff(target:Entity):BuffBase
	{
		var blackboardComp = this.caster.getComponent<BlackboardComponent>(ComponentType.Blackboard);
		blackboardComp.modifyAttrValue(data.RoleAttr.DRD, this.buffTp.Argument1[0]);

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
		var blackboardComp = this.caster.getComponent<BlackboardComponent>(ComponentType.Blackboard);
		blackboardComp.modifyAttrValue(data.RoleAttr.DRD, -this.buffTp.Argument1[0]);

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