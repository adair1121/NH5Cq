//Buff基类
abstract class BuffBase implements TimerBehaviour
{
	//Buff类型
	public abstract get type():BuffType;

	//定时信息
	protected timerInfo:TimerInfo;

	//Buff模版
	public buffTp:data.BuffTemple;

	//Buff归属的技能ID
	public ownerSkillId:number;

	//谁释放了这个Buffer
	public caster:Entity;

	//谁中了这个Buffer
	public target:Entity;

	//所有buff类型对应的创建函数
	private static readonly buffTypeDic:Dictionary<BuffType, {new():BuffBase}> = new Dictionary<BuffType, {new():BuffBase}>();

	public constructor()
	{
		if (BuffBase.buffTypeDic.count == 0)
		{
			this.addConstructor(BuffType.AdditionalSkillDamage, AdditionalSkillDamageBuff);
			this.addConstructor(BuffType.BaseBattleProperty, BasePropertyBuff);
			this.addConstructor(BuffType.BaseProperty, BasePropertyBuff);
			this.addConstructor(BuffType.DamageTreat, DamageTreatBuff);
			this.addConstructor(BuffType.Faint, FaintBuff);
			this.addConstructor(BuffType.IgnoreDefPercent, IgnoreDefPercentBuff);
			this.addConstructor(BuffType.Protect, ProtectBuff);
			//this.addConstructor(BuffType.HitBack, )
		}
	}

	//Buff修正技能参数列表 只要在buff参与技能预算时才会调用
	public TriggerSkillBuff(skillArgList:List<number>):void {}

	//获取构造
	private addConstructor<T extends BuffBase>(type:BuffType, newT:{new():T}):void
	{
		BuffBase.buffTypeDic.add(type, newT);
	}

	//定时器更新
	public TimerUpdate(timerInfo:TimerInfo, deltaTime:number):void {}

	//Buff被添加时调用
	public addBuff(target:Entity):BuffBase
	{
		this.target = target;

		return this;
	}

	//Buff被移除时调用
	public removeBuff():BuffBase
	{
		if (!!this.timerInfo)
			TimerMgr.Instance.removeTimerEvent(this.timerInfo);

		return this;
	}

	//通过BuffId创建Buff
	public static createBuffById(owner:Entity, buffId:number, skillId?:number):BuffBase
	{
		var buffTp:data.BuffTemple = TempleMgr.select<data.BuffTemple>("BuffTemple", buffId);
		if (!buffTp)
			return null;

		return this.createBuffByTp(owner, buffTp, skillId);
	}

	//通过Buff模版创建Buff
	public static createBuffByTp(owner:Entity, buffTp:data.BuffTemple, skillId?:number):BuffBase
	{
		var func:{new():BuffBase} = BuffBase.buffTypeDic.getValue(buffTp.BuffType);
		if (!func)
			return null;

		var buff = new func();

		buff.caster = owner;
		buff.buffTp = buffTp;
		buff.ownerSkillId = skillId;

		return buff;
	}
}