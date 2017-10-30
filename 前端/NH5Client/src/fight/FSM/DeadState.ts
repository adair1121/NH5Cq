//死亡状态
class DeadState extends StateBase
{
	//状态
	public get state():FSMState { return FSMState.Dead; }

	//进入状态 重生需在此处理
	public OnEnter(args:any[]):void
	{
		ModuleEventMgr.instance.triger(new RemoveEntityEvent(this.owner));
	}

	//执行状态
	//public OnExcuter(deltaTime:number):void {}

	//离开状态
	public OnLeave():void {}
}