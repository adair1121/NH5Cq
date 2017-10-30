//圆形范围技能
class CircleSkill extends SkillBase
{
    //获取技能目标列表
	protected getSkillTargetList(target:BlackboardComponent, sx:number, sy:number, tx:number, ty:number):List<BlackboardComponent>
    {
        return this.getTargetList(Utility.getCircleRangeByRadius(sx, sy, this.skillTp.range));
    }
}