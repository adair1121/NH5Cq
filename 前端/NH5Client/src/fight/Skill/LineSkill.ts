//矩形范围技能
class LineSkill extends SkillBase
{
    //获取技能目标列表
	protected getSkillTargetList(target:BlackboardComponent, sx:number, sy:number, tx:number, ty:number):List<BlackboardComponent>
    {
        var vecX = sx - tx;
        var vecY = sy - ty;

        var ptList = new List<egret.Point>();

        for(var i = 1; i <= this.skillTp.range; i++)
            ptList.add(new egret.Point(sx + vecX * i, sy + vecY * i));

        return this.getTargetList(ptList);
    }
}