//移动状态
class MoveState extends StateBase
{
	//移动时间
	protected moveTime:number;

	//目标
	protected target:Entity;

	//状态
	public get state():FSMState { return FSMState.Move; }

	//进入状态 [0]:目标 [1]:移动时间
	public OnEnter(args:any[]):void
	{
		this.target = args[0] as Entity;
		this.moveTime = args[1] as number;

		var selfComp = this.owner.getComponent<BlackboardComponent>(ComponentType.Blackboard);
		var selfPos = selfComp.getPosition();

		var targetComp = this.target.getComponent<BlackboardComponent>(ComponentType.Blackboard);
		var targetPos = targetComp.getPosition();

		var findPathComp = this.owner.getComponent<FindPathComponent>(ComponentType.FindPath);
		var toPostion = findPathComp.getNextMoveCell(targetPos, selfPos, 1);

		this.owner.currDirection = Utility.lookAt(selfPos.x, selfPos.y, toPostion.x, toPostion.y);
		this.owner.trigger(RoleEventDefine.PlayAnimation, this.state, this.owner.currDirection);
		ModuleEventMgr.instance.triger(new RoleMoveEvent(this.owner, selfPos, toPostion, this.moveTime));
	}

	//执行状态
	public OnExcuter(deltaTime:number):void
	{
		this.moveTime -= deltaTime;

		if (this.moveTime > 0)
			return;

		this.owner.trigger(RoleEventDefine.ChangeState, FSMState.Idle, this.target);
	}

	//离开状态
	public OnLeave():void {}
}