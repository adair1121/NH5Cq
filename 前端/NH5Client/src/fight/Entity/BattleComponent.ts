//战斗组件
abstract class BattleComponent extends ComponentBase
{
	//角色身上Buff列表
	protected buffList:List<BuffBase>;

	//是否开始战斗
	protected isStartFight:boolean;

	//组件类型
	public get type():ComponentType { return ComponentType.Battle; }

	//移动时间
	public abstract get moveTime():number;

	//攻击距离
	public abstract get atkDistance():number;

	//角色状态机
	public readonly fsm:FSM;

	//构造
	public constructor(owner:Entity)
	{
		super(owner);

		this.fsm = new FSM(owner);
	}

	//初始化组件
	public init():void
	{
		this.owner.addEventListener(RoleEventDefine.ChangeState, this.RoleChangeState, this);
		this.owner.addEventListener(RoleEventDefine.ChangeToPreState, this.RoleChangeToPreState, this);

		this.buffList = new List<BuffBase>();

		var argArr = new Array<number>();
		argArr.push(FSMState.Idle);
		this.RoleChangeState(argArr);
	}

	//释放组件
	public release():void
	{
		this.owner.removeEventListener(RoleEventDefine.ChangeState, this.RoleChangeState, this);
		this.owner.removeEventListener(RoleEventDefine.ChangeToPreState, this.RoleChangeToPreState, this);

		this.buffList.clear();
		this.buffList = null;
	}

	//更新
	public Update(deltaTime:number):void
	{
		if (!this.isStartFight)
			return;

		if (!!this.fsm)
			this.fsm.Update(deltaTime);
	}

	//获取可释放的技能
	public abstract getCastSkill():SkillBase;

	//角色状态改变 [0]:改变成哪个状态 [1]:参数
	public RoleChangeState(args:any[]):void
	{
		if (!args || args.length < 1)
			return;

		var state:FSMState = args.shift();
		if (!!this.fsm.switchTo(state, args))
			this.owner.currState = state;
	}

	//角色切换到上一个状态 [0]:参数
	public RoleChangeToPreState(args:any[]):void
	{
		if (!!this.fsm.switchToPreState(args))
			this.owner.currState = this.fsm.state;
	}

	//添加Buff 添加时必须做深拷贝
	public addBuff(buff:BuffBase):Object
	{
		var objRet = { isAddSuccess: false, removeBuffList: new List<number>() };

		if (buff.buffTp.DeleteType == BuffDelType.NeverDestroy)
		{
			this.buffList.add(BuffBase.createBuffByTp(buff.caster, buff.buffTp, buff.ownerSkillId).addBuff(this.owner));
			objRet.isAddSuccess = true;
			return objRet;
		}

		//如果buffer存在, 并且新buffer等级>=原有buffer等级，将进行替换
		var findBuff = this.buffList.find(x => x.type == buff.type && x.buffTp.DeleteType != BuffDelType.NeverDestroy);
		if (!!findBuff)
		{
			if (buff.buffTp.Lev >= findBuff.buffTp.Lev)
			{
				this.removeBuff(findBuff);
				objRet.removeBuffList.add(findBuff.buffTp.ID);
				objRet.isAddSuccess = true;
				this.buffList.add(BuffBase.createBuffByTp(buff.caster, buff.buffTp, buff.ownerSkillId).addBuff(this.owner));
			}

			return objRet;
		}

		//如果出现比添加Buffer更高优先级的，将不添加，0最大
		findBuff = this.buffList.find(x => x.buffTp.BuffPriority < buff.buffTp.BuffPriority && x.buffTp.DeleteType != BuffDelType.NeverDestroy);
		if (!!findBuff)
			return objRet;

		//如果buff不存在，将判定buffer优先级，优先级大的替换小的, 移除准则等于所有或相应状态时，将被移除
		this.buffList.removeAll(buffBase =>
		{
			if (buffBase.buffTp.DeleteType == BuffDelType.NeverDestroy)
				return false;

			if (buffBase.buffTp.BuffPriority > buff.buffTp.BuffPriority &&
				(buffBase.buffTp.BufferState == buff.buffTp.RemoveRule || buff.buffTp.RemoveRule == BufferRemoveRule.All))
			{
				buffBase.removeBuff();
				objRet.removeBuffList.add(buffBase.buffTp.ID);
				return true;
			}

			return false;

		}, this);

		this.buffList.add(BuffBase.createBuffByTp(buff.caster, buff.buffTp, buff.ownerSkillId).addBuff(this.owner));
		objRet.isAddSuccess = true;
		return objRet;
	}

	//移除Buff
	public removeBuff(buff:BuffBase):void
	{
		this.buffList.removeItem(buff.removeBuff());
	}
}