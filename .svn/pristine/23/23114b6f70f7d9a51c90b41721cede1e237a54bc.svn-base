//扇形范围技能
class SectorSkill extends SkillBase
{
    //获取技能目标列表
	protected getSkillTargetList(target:BlackboardComponent, sx:number, sy:number, tx:number, ty:number):List<BlackboardComponent>
    {
        var ptList = new List<egret.Point>();
        ptList.add(new egret.Point(sx, sy));

        var lookAt = Utility.lookAt(sx, sy, tx, ty);

        switch(lookAt)
        {
            case MapModule.Around.UP:
            case MapModule.Around.LEFTUP: //8,1,2,3
                ptList.add(new egret.Point(sx - 1, sy - 1));
                ptList.add(new egret.Point(sx, sy - 1));
                ptList.add(new egret.Point(sx + 1, sy - 1));
                ptList.add(new egret.Point(sx + 1, sy));
                break;

            case MapModule.Around.RIGHT:
            case MapModule.Around.RIGHTUP: //2,3,4,5
                ptList.add(new egret.Point(sx + 1, sy - 1));
                ptList.add(new egret.Point(sx + 1, sy));
                ptList.add(new egret.Point(sx + 1, sy + 1));
                ptList.add(new egret.Point(sx, sy + 1));
                break;

            case MapModule.Around.DOWN:
            case MapModule.Around.RIGHTDOWN: //4,5,6,7
                ptList.add(new egret.Point(sx + 1, sy + 1));
                ptList.add(new egret.Point(sx, sy + 1));
                ptList.add(new egret.Point(sx - 1, sy + 1));
                ptList.add(new egret.Point(sx - 1, sy));
                break;

            case MapModule.Around.LEFT:
            case MapModule.Around.LEFTDOWN:
                ptList.add(new egret.Point(sx - 1, sy + 1));
                ptList.add(new egret.Point(sx - 1, sy));
                ptList.add(new egret.Point(sx - 1, sy - 1));
                ptList.add(new egret.Point(sx, sy - 1));
                break;
        }

        return this.getTargetList(ptList);
    }
}