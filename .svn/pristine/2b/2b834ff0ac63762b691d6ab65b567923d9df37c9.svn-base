/**
 * 协议管理器
 */
class ProtocolMgr {
	//协议管理器单例
	public static readonly instance:ProtocolMgr = new ProtocolMgr();
	private proDic:Dictionary<Number,Array<Object>> = new Dictionary<Number,Array<Object>>();
	public constructor() {

	}
	/**
	 * 协议触发
	 * @:param {type} 协议字段
	 * @:param {mess} 返回数据
	 */
	public trigger(type:number,mess:proto.Pro):void{
		var arr: Array<Object> = this.proDic.getValue(type);
		if (!!arr && arr.length > 0)
		{
			for(var i:number = 0;i<arr.length;i++){
				arr[i]["_func"].call(arr[i]["_this"], mess);
			}
		}
	}

	/**
	 * 注册协议
	 * @:param {type} 协议字段
	 * @:param {func} 回调函数
	 * @:param {arg}  回调作用域
	 */
	public addProListener(type:number,func:Function, FuncThis : any):void{
		var self = this;

		var funArr : Array<Object> = self.proDic.getValue(type);
		if (!!funArr)
		{
			funArr.push({_this:FuncThis, _func:func });
			return;
		}

		self.proDic.add(type, [{ _this:FuncThis, _func:func }]);
	}
	/**
	 * 移除协议侦听
	 */
	public removeProListener(type:number):void{
		var self = this;

		self.proDic.remove(type);
	}
}