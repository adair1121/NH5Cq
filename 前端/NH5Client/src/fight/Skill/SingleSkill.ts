//单体技能
class SingleSkill extends SkillBase
{
    //获取技能目标列表
	protected getSkillTargetList(target:BlackboardComponent, sx:number, sy:number, tx:number, ty:number):List<BlackboardComponent>
    {
        return new List<BlackboardComponent>(new Array<BlackboardComponent>(target));
    }
}