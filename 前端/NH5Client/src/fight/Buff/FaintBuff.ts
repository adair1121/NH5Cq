//眩晕
class FaintBuff extends BuffBase
{
	//影响时间
	protected effectTime:number;

	//Buff类型
	public get type():BuffType { return BuffType.Faint; }

	//Buff被添加时调用
	public addBuff(target:Entity):BuffBase
	{
		var targetComp = this.target.getComponent<BlackboardComponent>(ComponentType.Blackboard);
		targetComp.setAttrValue(data.RoleAttr.state, RoleState.Faint);

		this.target.trigger(RoleEventDefine.ChangeState, FSMState.Faint, this.target.currDirection);

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
		var targetComp = this.target.getComponent<BlackboardComponent>(ComponentType.Blackboard);
		targetComp.setAttrValue(data.RoleAttr.state, RoleState.Normal);

		this.target.trigger(RoleEventDefine.ChangeState, FSMState.Idle, this.target.currDirection);

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