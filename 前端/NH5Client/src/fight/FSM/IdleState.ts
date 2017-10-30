//待机状态
class IdleState extends StateBase
{
	//状态
	public get state():FSMState { return FSMState.Idle; }

	//进入状态 [0]:目标
	public OnEnter(args:any[]):void
	{
		var target = args[0] as Entity;

		if (!target)
		{
			this.owner.currDirection = MapModule.Around.DOWN;
			this.owner.trigger(RoleEventDefine.PlayAnimation, ShowClipDefine.Idle, MapModule.Around.DOWN);
			return;
		}
		
		var targetComp = target.getComponent<BlackboardComponent>(ComponentType.Blackboard);
		if (targetComp.getAttrValue(data.RoleAttr.HP) <= 0)
		{
			this.owner.trigger(RoleEventDefine.PlayAnimation, ShowClipDefine.Idle, this.owner.currDirection);
			return;
		}

		var selfComp = this.owner.getComponent<BlackboardComponent>(ComponentType.Blackboard);
		var selfPos = selfComp.getPosition();

		var targetPos = targetComp.getPosition();

		var battleComp = this.owner.getComponent<BattleComponent>(ComponentType.Battle);

		//如果在移动状态并且没有在攻击范围内
		if (Utility.distanceCellByPt(selfPos, targetPos) > battleComp.atkDistance && this.fsm.preFSMState.state == FSMState.Move)
			return;

		var lookAt = Utility.lookAt(selfPos.x, selfPos.y, targetPos.x, targetPos.y);
		this.owner.currDirection = lookAt;
		this.owner.trigger(RoleEventDefine.PlayAnimation, ShowClipDefine.Idle, lookAt);
	}

	//执行状态
	public OnExcuter(deltaTime:number):void
	{
		var selfComp = this.owner.getComponent<BlackboardComponent>(ComponentType.Blackboard);
		var selfPos = selfComp.getPosition();

		var objRet = this.getNearestTarget(selfPos);
		if (!objRet || !(objRet["targetEntity"] as Entity))
			return;

		var target = objRet["targetEntity"] as Entity;
		var battleComp = this.owner.getComponent<BattleComponent>(ComponentType.Battle);

		if (objRet["distance"] <= battleComp.atkDistance)
		{
			this.owner.trigger(RoleEventDefine.ChangeState, FSMState.Attack, target);
			return;
		}

		this.owner.trigger(RoleEventDefine.ChangeState, FSMState.Move, target, battleComp.moveTime);
	}

	//离开状态
	public OnLeave():void {}

	//获取最近的目标
	protected getNearestTarget(selfPos:egret.Point):{}
	{
		var entityList = EntityMgr.Instance.getOtherCampEnityList(this.owner.camp);
		if (!entityList || entityList.count == 0)
			return null;

		var distance:number = ConstDefine.IntMaxValue;
		var targetEntity:Entity = null;

		entityList.forEach(entity =>
		{
			var targetComp = entity.getComponent<BlackboardComponent>(ComponentType.Blackboard);
			if (targetComp.getAttrValue(data.RoleAttr.HP) <= 0)
				return;

			var targetDistance = Utility.distanceCellByPt(selfPos, targetComp.getPosition());
			if (targetDistance < distance)
			{
				targetEntity = entity;
				distance = targetDistance;
			}
		});

		return { distance: distance, targetEntity : targetEntity };
	}
}