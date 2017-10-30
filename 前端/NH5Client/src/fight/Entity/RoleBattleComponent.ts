//角色战斗组件
class RoleBattleComponent extends BattleComponent
{
	//角色技能释放队列
	protected skillQueue:Queue<SkillBase>;

	//职业初始化表
	protected jobInitTp:data.JobInitTemple;

	//移动时间
	public get moveTime():number { return this.jobInitTp.moveTime; }

	//攻击距离
	public get atkDistance():number { return this.jobInitTp.atkDistance; }

	//构造 [0]:角色技能信息 [1]:职业
	public constructor(owner:Entity, arg:any[])
	{
		super(owner);

		this.isStartFight = true;

		var skillIdList = arg[0] as List<number>;
		
		this.jobInitTp = TempleMgr.select<data.JobInitTemple>("JobInitTemple", this.owner.job);

		var skillDic = new Dictionary<number, SkillBase>();
		skillIdList.forEach(id =>
		{
			let skill = SkillBase.createSkillById(owner, id);
			if (!!skill)
				skillDic.add(skill.skillGroupId, skill);
		});

		this.skillQueue = new Queue<SkillBase>();
		this.jobInitTp.skillOrder.forEach(skillId =>
		{
			let skill = skillDic.getValue(skillId);
			if (!!skill)
				this.skillQueue.enQueue(skill);
		});
	}

	//初始化组件
	public init():void
	{
		super.init();

		this.owner.addEventListener(RoleEventDefine.SkillUpgrade, this.skillUpgrade);
	}

	//释放组件
	public release():void
	{
		super.release();

		this.owner.removeEventListener(RoleEventDefine.SkillUpgrade, this.skillUpgrade);
	}

	//获取可释放的技能
	public getCastSkill():SkillBase
	{
		for(let i = 0; i < this.skillQueue.count; i++)
		{
			let currSkill = this.skillQueue.deQueue();
			this.skillQueue.enQueue(currSkill);

			if (!!currSkill.isCastSkill() && !!currSkill.canUseSkill)
				return currSkill;
		}

		console.error("PlayerBattleComponent getCastSkill == null");
		return null;
	}

	//技能升级 [0]:职业 [1]:升级前技能ID [2]:升级后技能ID
	private skillUpgrade(args:any[]):void
	{
		if (!args || args.length < 3)
		{
			console.error("PlayerBattleComponent skillUpgrade args.length < 3");
			return;
		}

		var job = args[0] as number;
		var preSkillId = args[1] as number;
		var currSkillId = args[2] as number;

		this.skillQueue.forEach(skill =>
		{
			if (skill.skillTp.ID == preSkillId)
				skill.resetSkill(currSkillId);
		});
	}
}