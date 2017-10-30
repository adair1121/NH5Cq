//动画组件
class AnimationComponent extends ComponentBase
{
	//通过技能ID和方向查询
	private skillClipDic:Dictionary<number, Dictionary<number, List<MovieClip>>>;

	//角色展示动画 通过展示ID ShowClipDefine和方向查询
	protected roleClipDic:Dictionary<number, Dictionary<number, List<MovieClip>>>;

	//组件类型
	public get type():ComponentType { return ComponentType.Animator; }

	//构造
	public constructor(owner:Entity, skillIdList:List<number>)
	{
		super(owner);

		this.skillClipDic = new Dictionary<number, Dictionary<number, List<MovieClip>>>();
		this.roleClipDic = new Dictionary<number, Dictionary<number, List<MovieClip>>>();

		if (!skillIdList)
			return;

		skillIdList.forEach(id => { this.loadSkill(id); }, this);
	}

	//初始化组件
	public init():void
	{
		this.owner.addEventListener(RoleEventDefine.PlayAnimation, this.playAnimation, this);
		this.owner.addEventListener(RoleEventDefine.PlayAtkAnimation, this.playAtkAnimation, this);
	}

	//释放组件
	public release():void
	{
		this.owner.removeEventListener(RoleEventDefine.PlayAnimation, this.playAnimation, this);
		this.owner.removeEventListener(RoleEventDefine.PlayAtkAnimation, this.playAtkAnimation, this);

		this.skillClipDic.foreach(directionDic => { directionDic.clear(); });
		this.skillClipDic.clear();
		this.skillClipDic = null;

		this.roleClipDic.foreach(directionDic => { directionDic.clear(); });
		this.roleClipDic.clear();
		this.roleClipDic = null;
	}

	//播放通用动画 [0]:展示状态ID [1]:朝向
	public playAnimation(args:any[]):void
	{
		var showId:ShowClipDefine = args[0] as ShowClipDefine;
		var direction:number = args[1] as number;

		var clipList = this.getRoleClipList(showId, direction);
		if (!!clipList)
			ModuleEventMgr.instance.triger(new PlayStateEvent(this.owner, clipList));
	}

	//播放攻击动画 [0]:技能模版 [1]:朝向 [2]:目标
	public playAtkAnimation(args:any[]):void
	{
		if (!args || args.length < 3)
		{
			console.error("AnimatorComponent playAnimation args.length < 3");
			return;
		}

		var skillTp:data.SkillTemple = args[0] as data.SkillTemple;
		var direction:number = args[1] as number;
		var target:Entity = args[2] as Entity;

		var skillClipList = this.getSkillMovieClipList(skillTp.ID, direction);
		if (!skillClipList)
			skillClipList = this.getSkillMovieClipList(skillTp.ID, MapModule.Around.DOWN);

		var roleClipList = this.getRoleClipList(ShowClipDefine.Attack, direction);
		var roleIdleClpList = this.getRoleClipList(ShowClipDefine.Idle, direction);

		if (!!skillClipList)
		{
			let skillRes = !!skillClipList ? skillClipList.getItem(SkillClipDefine.SkillRes) : null;
			let FlyRes = !!skillClipList ? skillClipList.getItem(SkillClipDefine.FlyRes) : null;

			ModuleEventMgr.instance.triger(new PlayAtkStateEvent(this.owner, target, skillTp, direction, skillRes, FlyRes, roleClipList, roleIdleClpList));
		}
	}

	//加载技能动画
	private loadSkill(skillId:number):void
	{
		var skillTp:data.SkillTemple = TempleMgr.select<data.SkillTemple>("SkillTemple", skillId);
		if (!skillTp)
			return;

		if (skillTp.skillResId > 0)
			this.loadSkillMovieClip(skillTp.ID, SkillClipDefine.SkillRes, AssetsDefine.MoviePath, skillTp.skillResId, skillTp.effectDirection);

		if (skillTp.skillResIdFly > 0)
			this.loadSkillMovieClip(skillTp.ID, SkillClipDefine.FlyRes, AssetsDefine.MoviePath, skillTp.skillResIdFly);

		if (skillTp.skillResIdRock > 0)
			this.loadSkillMovieClip(skillTp.ID, SkillClipDefine.RockRes, AssetsDefine.MoviePath, skillTp.skillResIdRock);
	}

	//加载技能动画
	private loadSkillMovieClip(skillId:number, resIndex:SkillClipDefine, filePath:string, id:number, dirArr?:Array<number>):void
	{
		dirArr = dirArr || AssetsDefine.Dir_1;

		var movieClipDic = AssetsMgr.instance.loadMovieGroup(filePath, AssetsDefine.effect + AssetsDefine.AtkRule, id, dirArr);

		var skillClipDic = this.skillClipDic.getValue(skillId);
		if (!skillClipDic)
		{
			skillClipDic = new Dictionary<number, List<MovieClip>>();
			this.skillClipDic.add(skillId, skillClipDic);
		}

		movieClipDic.foreach((clip, direction) =>
		{
			let clipList = skillClipDic.getValue(direction);
			if (!clipList)
			{
				clipList = new List<MovieClip>(null, SkillClipDefine.Max);
				skillClipDic.add(direction, clipList);
			}

			clipList.setItem(resIndex, clip);
		});
	}

	//加载角色动画
	protected loadRoleMovieClip(showId:number, filePath:string, id:number, rule:string, isLoop:boolean = false):void
	{
		var roleClipDic = AssetsMgr.instance.loadMovieGroup(filePath, rule, id, AssetsDefine.Dir_8, isLoop);

		var clipDic = this.roleClipDic.getValue(showId);
		if (!clipDic)
		{
			clipDic = new Dictionary<number, List<MovieClip>>();
			this.roleClipDic.add(showId, clipDic);
		}

		roleClipDic.foreach((clip, direction) =>
		{
			var clipList = clipDic.getValue(direction);
			if (!clipList)
			{
				clipList = new List<MovieClip>();
				clipDic.add(direction, clipList);
			}
			
			clipList.add(clip);
		});
	}

	//通过技能ID和朝向获取技能动画
	public getSkillMovieClipList(skillId:number, direction:number):List<MovieClip>
	{
		var skillClipDic = this.skillClipDic.getValue(skillId);
		if (!!skillClipDic)
			return skillClipDic.getValue(direction);

		return null;
	}

	//获取角色动画
	public getRoleClipList(showId:ShowClipDefine, direction:number):List<MovieClip>
	{
		var clipDic = this.roleClipDic.getValue(showId);
		if (!!clipDic)
			return clipDic.getValue(direction);

		return null;
	}
}