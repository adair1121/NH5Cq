//状态基类
abstract class StateBase
{
	//归属于哪个实体
	protected readonly owner:Entity;

	//状态机
	protected readonly fsm:FSM;

	//状态
	public abstract get state():FSMState;

	//构造
	public constructor(owner:Entity, fsm:FSM)
	{
		this.owner = owner;
		this.fsm = fsm;
	}

	//进入状态
	public OnEnter(args:any[]):void {}

	//执行状态
	public OnExcuter(deltaTime:number):void { }

	//离开状态
	public OnLeave():void {}
}