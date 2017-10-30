abstract class ComponentBase
{
	//组件类型
	public abstract get type():ComponentType;

	//所属实体
	public readonly owner:Entity;

	public constructor(owner:Entity)
	{
		this.owner = owner;
	}

	//初始化组件
	public init():void {}

	//释放组件
	public release():void {}
}