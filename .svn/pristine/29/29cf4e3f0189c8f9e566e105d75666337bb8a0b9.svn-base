//定时器接口
interface TimerBehaviour
{
	TimerUpdate(timerInfo:TimerInfo, deltaTime:number):void;
}

//定时信息
class TimerInfo
{
	public isDelete:boolean = false; //是否删除
	public currTime:number = 0; //当前时间
	public callTimes:number = 0;//调用次数
	public intervalTime:number = 0; //调用周期
	public target:TimerBehaviour = null;//目标

	public constructor(target:TimerBehaviour, interval?:number)
	{
		this.target = target;
		this.intervalTime = interval || 0;
	}
}

class TimerMgr
{
	public static readonly Instance:TimerMgr = new TimerMgr();

	//所有定时
	private timerList:List<TimerInfo>;

	public constructor()
	{
		this.timerList = new List<TimerInfo>();
	}

	//添加定时器
	public addTimerEvent(timerInfo:TimerInfo):void
	{
		if (!!timerInfo && !this.timerList.contains(timerInfo))
			this.timerList.add(timerInfo);
	}

	//移除定时器
	public removeTimerEvent(timerInfo:TimerInfo):void
	{
		if (!!timerInfo && !this.timerList.contains(timerInfo))
			timerInfo.isDelete = true;			
	}

	//定时器更新
	public update(deltaTime:number):void
	{
		if (this.timerList.count == 0)
			return;
		
		this.timerList.removeAll(timerInfo =>
		{
			if(timerInfo.isDelete || !timerInfo.target)
				return true;

			if (timerInfo.intervalTime > 0)
				timerInfo.currTime += deltaTime;

			if (timerInfo.intervalTime == 0 || timerInfo.currTime >= timerInfo.intervalTime)
			{
				if (timerInfo.intervalTime > 0)
					timerInfo.currTime %= timerInfo.intervalTime;

				timerInfo.target.TimerUpdate(timerInfo, deltaTime);
			}

			return false;
		});
	}
}