/**
 * 模块间事件管理器
 */
class ModuleEventMgr
{
	//模块事件管理器单例
	public static readonly instance:ModuleEventMgr = new ModuleEventMgr();

	//通过事件枚举查询
	private readonly eventDic:Dictionary<ModuleEvent, List<Object>>;

	public constructor()
	{
		this.eventDic = new Dictionary<ModuleEvent, List<Object>>();
	}

	//侦听事件
	public addModuleEventListener(eventType:ModuleEvent, func:(arg:EventBase) => void, eventThis?:any):void
	{
		var funcList = this.eventDic.getValue(eventType);
		if (!funcList)
		{
			funcList = new List<Object>();
			this.eventDic.add(eventType, funcList);
		}

		if (!funcList.find(obj => obj["_func"] == func && obj["_this"] == eventThis))
		{
			funcList.add({ _func: func.bind(eventThis), _this: eventThis });
		}
	}

	//触发事件
	public triger<T extends EventBase>(eventBase:T):void
	{
		var funcList = this.eventDic.getValue(eventBase.id);
		if(!!funcList && funcList.count > 0)
			funcList.forEach(obj => { obj["_func"](eventBase); }, this);
	}

	//移除事件
	public removeModuleEventListener(eventType:ModuleEvent, func:(arg:EventBase) => void, argThis?:any):void
	{
		var funcList = this.eventDic.getValue(eventType);

		if (!!funcList && funcList.count > 0)
			funcList.removeAll(obj => obj["_func"] == func && obj["_this"] == argThis);
	}
}