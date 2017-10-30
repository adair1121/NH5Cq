//攻击状态
class AttackState extends StateBase
{
	//攻击目标
	protected target:Entity;

	//正在播放的技能模版
	protected skill:SkillBase;

	//技能周期
	protected skillPeriod:number;

	//是否释放完技能
	protected isCastSkill:boolean;

	//状态
	public get state():FSMState { return FSMState.Attack; }

	//进入状态 [0]:目标
	public OnEnter(args:any[]):void
	{
		this.target = args[0] as Entity;

		var battleComp = this.owner.getComponent<BattleComponent>(ComponentType.Battle);
		this.skill = battleComp.getCastSkill();

		this.skillPeriod = this.skill.skillTp.skillPeriod;
		this.isCastSkill = false;

		this.skill.OnEnter(this.target);
	}

	//执行状态
	public OnExcuter(deltaTime:number):void
	{
		this.skillPeriod -= deltaTime;

		if (!!this.skill && !this.isCastSkill)
			this.isCastSkill = this.skill.OnExcuter(deltaTime);

		if (this.skillPeriod <= 0 && this.isCastSkill)
			this.owner.trigger(RoleEventDefine.ChangeState, FSMState.Idle, this.target);
	}

	//离开状态
	public OnLeave():void
	{
		if (!!this.skill)
			this.skill.OnLeave();
	}
}