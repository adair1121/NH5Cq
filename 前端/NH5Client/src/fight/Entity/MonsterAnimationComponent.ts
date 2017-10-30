//怪物动画组件
class MonsterAnimationComponent extends AnimationComponent
{
	//装备动画
	protected modelClipList:List<MovieClip>;

	//构造  [0]:技能ID数组 [1]:怪物ID
	public constructor(owner:Entity, args:any[])
	{
		super(owner, args[0] as List<number>);

		var monsterId = args[1] as number || 0;
		if (monsterId == 0)
			return;

		this.loadModelClip(monsterId);
	}

	//加载怪物动画
	private loadModelClip(monsterId:number):void
	{
		var unitTp = TempleMgr.select<data.UnitTemple>("UnitTemple", monsterId);
		if (!unitTp)
			return;

		this.loadRoleMovieClip(ShowClipDefine.Attack, AssetsDefine.MoviePath, unitTp.model, AssetsDefine.monster + AssetsDefine.AtkRule);
		this.loadRoleMovieClip(ShowClipDefine.Idle, AssetsDefine.MoviePath, unitTp.model, AssetsDefine.monster + AssetsDefine.IdleRule, true);
		this.loadRoleMovieClip(ShowClipDefine.Move, AssetsDefine.MoviePath, unitTp.model, AssetsDefine.monster + AssetsDefine.MoveRule, true);
	}
}