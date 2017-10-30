//召唤技能
class SummonSkill extends SkillBase
{
    //技能召唤实体ID
    protected get getSummonEntityInstId() { return this.owner.instanceId + "_summon"; } 

    //是否可以释放此技能
	public isCastSkill():boolean
	{
        return super.isCastSkill() && !EntityMgr.Instance.getEntity(this.getSummonEntityInstId);
	}

    //执行技能
	public OnExcuter(deltaTime:number):boolean
	{
		this.skillTime -= deltaTime;

		if (this.skillTime > 0)
			return false;

		var selfComp = this.owner.getComponent<BlackboardComponent>(ComponentType.Blackboard);    

        var x = selfComp.getAttrValue(data.RoleAttr.x);
        var y = selfComp.getAttrValue(data.RoleAttr.y);

        var cellList = MapModule.getRandomCell(x, y, 1);
        if (!cellList || cellList.count == 0)
        {
            console.error("SummonSkill cellList == null");
            return true;
        }

        var effectArgList = this.skillEffectArgumentsDic.getValue(SkillEffect.Summon);
        if (effectArgList == null || effectArgList.count == 0)
        {
            console.log("SummonSkill effectArgList == null");
            return true;
        }

        var summonEntity = Entity.createMonsterEntity(effectArgList[0], this.owner.camp, this.owner.ownerId, null, this.getSummonEntityInstId);    
        ModuleEventMgr.instance.triger(new CreateEntityEvent(summonEntity, cellList.getItem(0).toPoint()));
        return true;
	}

    //获取技能目标列表
	protected getSkillTargetList(target:BlackboardComponent, sx:number, sy:number, tx:number, ty:number):List<BlackboardComponent>
    {
        return null;
    }
}