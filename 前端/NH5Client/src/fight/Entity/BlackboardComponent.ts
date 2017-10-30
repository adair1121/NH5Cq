//黑板组件
class BlackboardComponent extends ComponentBase
{
	//属性数组
	protected attributeArr:Array<number>;

	//组件类型
	public get type():ComponentType { return ComponentType.Blackboard; }

	//获取属性数组
	public get attrArr():Array<number> { return this.attributeArr; }

	//构造 [0]:属性数组
	public constructor(owner:Entity, args:any[])
	{
		super(owner);

		this.attributeArr = args[0] as Array<number>;
	}

	//初始化组件
	public init():void { }

	//释放组件
	public release():void { }

	//修改属性值 应传入变化量 返回改变后的结果
	public modifyAttrValue(attrId:number, changeValue:number):number
	{
		if (attrId < 0 || attrId >= this.attributeArr.length)
		{
			console.log("BlackboardComponent modifyAttrValue attrId: " + attrId);
			return;
		}

		var value:number = this.attributeArr[attrId] + changeValue;
		this.attributeArr[attrId] = value;
		return value;
	}

	//获取属性值
	public getAttrValue(attrId:number):number
	{
		if (attrId < 0 || attrId >= this.attributeArr.length)
			return 0;

		return this.attributeArr[attrId];
	}

	//设置属性值
	public setAttrValue(attrId:number, value:number)
	{
		if (attrId < 0 || attrId >= this.attributeArr.length)
			return;

		this.attributeArr[attrId] = value;
	}

	//设置角色位置
	public setPosition(pt:egret.Point):void
	{
		this.setAttrValue(data.RoleAttr.x, pt.x);
		this.setAttrValue(data.RoleAttr.y, pt.y);
	}

	//获得位置
	public getPosition():egret.Point
	{
		return new egret.Point(this.getAttrValue(data.RoleAttr.x), this.getAttrValue(data.RoleAttr.y));
	}
}