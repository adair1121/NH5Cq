//角色动画组件
class RoleAnimationComponent extends AnimationComponent
{
	//装备动画
	private equipClipDic:Dictionary<number, MovieClip>;

	//构造 [0]:技能ID数组 [1]:装备数组
	public constructor(owner:Entity, args:any[])
	{
		super(owner, args[0] as List<number>);

		//装备动画待处理
	}

	//初始化组件
	public init():void
	{
		var blackboardComp = this.owner.getComponent<BlackboardComponent>(ComponentType.Blackboard);
		var sex = blackboardComp.getAttrValue(data.RoleAttr.sex);

		//没有装备时，使用默认装备动画
		this.loadRoleClip(this.owner.job, sex);

		super.init();
	}

	//释放组件
	public release():void
	{
		super.release();
	}

	//加载角色动画
	private loadRoleClip(job:number, sex:number):void
	{
		var jobTp = TempleMgr.select<data.JobInitTemple>("JobInitTemple", job);
		if (!jobTp)
			return;

		var weapon = sex == 1 ? jobTp.maleWeaponID : jobTp.femaleWeaponID;
		var clothes = sex == 1 ? jobTp.maleResID : jobTp.femaleResID;

		this.loadRoleMovieClip(ShowClipDefine.Attack, AssetsDefine.MoviePath, weapon, AssetsDefine.weapon + AssetsDefine.AtkRule);
		this.loadRoleMovieClip(ShowClipDefine.Attack, AssetsDefine.MoviePath, clothes, AssetsDefine.clothes + AssetsDefine.AtkRule);

		this.loadRoleMovieClip(ShowClipDefine.Idle, AssetsDefine.MoviePath, weapon, AssetsDefine.weapon + AssetsDefine.IdleRule, true);
		this.loadRoleMovieClip(ShowClipDefine.Idle, AssetsDefine.MoviePath, clothes, AssetsDefine.clothes + AssetsDefine.IdleRule, true);

		this.loadRoleMovieClip(ShowClipDefine.Move, AssetsDefine.MoviePath, weapon, AssetsDefine.weapon + AssetsDefine.MoveRule, true);
		this.loadRoleMovieClip(ShowClipDefine.Move, AssetsDefine.MoviePath, clothes, AssetsDefine.clothes + AssetsDefine.MoveRule, true);

		this.loadRoleMovieClip(ShowClipDefine.Cast, AssetsDefine.MoviePath, weapon, AssetsDefine.weapon + AssetsDefine.CastRule);
		this.loadRoleMovieClip(ShowClipDefine.Cast, AssetsDefine.MoviePath, clothes, AssetsDefine.clothes + AssetsDefine.CastRule);
	}

	//private load
}