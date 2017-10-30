//抗拒火环
class CircleHitSkill extends SkillBase
{
    //获取技能目标列表
	protected getSkillTargetList(target:BlackboardComponent, sx:number, sy:number, tx:number, ty:number):List<BlackboardComponent>
    {
        return this.getTargetList(Utility.getCircleRangeByRadius(sx, sy, this.skillTp.range));
    }

	//执行技能
	public OnExcuter(deltaTime:number):boolean
    { 
		this.skillTime -= deltaTime;

		if (this.skillTime > 0)
			return false;

        var selfComp = this.owner.getComponent<BlackboardComponent>(ComponentType.Blackboard);

        var damageInfoList = this.useSkill(selfComp);
        if (!damageInfoList || damageInfoList.count == 0)
            return true;

        var effectArgList = this.skillEffectArgumentsDic.getValue(SkillEffect.HitMove);
        if (!effectArgList || effectArgList.count == 0)
        {
            console.error("HitSkill castSkill effectArgList.count == 0");
            return true;
        }

        var selfPos = selfComp.getPosition();

        damageInfoList.forEach(damageInfoEvent =>
		{
			var targetBlackboard = damageInfoEvent.who.getComponent<BlackboardComponent>(ComponentType.Blackboard);
			var targetPos = targetBlackboard.getPosition();

        	var targetPt = this.getHitMovePt(selfPos.x, selfPos.y, targetPos.x, targetPos.y, effectArgList.getItem(0));

            this.owner.trigger(RoleEventDefine.ChangeState, FSMState.Move, targetPt, this.skillTp.strikeTime, () =>
            {
                ModuleEventMgr.instance.triger(damageInfoEvent);

            //if (damageInfoEvent.isDead)
            //    damageInfoEvent.who.trigger(RoleEventDefine.ChangeState, FSMState.Dead);

            }, this, FSMState.Idle);
		});

        return true;
    }

	//返回撞击目标点
    private getHitMovePt(sx:number, sy:number, tx:number, ty:number, distance:number):egret.Point
    {
        var vecX = tx - sx;
        var vecY = ty - sy;

        var distanceX = vecX < 0 ? -vecX : vecX;
        var distanceY = vecY < 0 ? -vecY : vecY;

        var targetPt = new egret.Point(sx, sy);

        //在斜线方向 以当前方向击退X格
        if (distanceX == distanceY)
        {
            for(let i = 1; i <= distance; i++)
            {
                let x = tx + (vecX < 0 ? -i : i);
                let y = ty + (vecY < 0 ? -i : i);

                if (MapModule.isBlock(x, y))
                    break;

                targetPt.x = x;
                targetPt.y = y;
            }
        }
        //由于斜线算1，所以有可能x的距离是2，y距离是1的情况，这时将以X方向击退
        else if (distanceY == 0)
        {
            for(let i = 1; i <= distance; i++)
            {
                let x = tx + (vecX < 0 ? -i : i);

                if (MapModule.isBlock(x, sy))
                    break;

                targetPt.x = x;
            }
        }
        //将以Y方向击退
        else
        {
            for(let i = 1; i <= distance; i++)
            {
                let y = ty + (vecY < 0 ? -i : i);

                if (MapModule.isBlock(sx, y))
                    break;

                targetPt.y = y;
            }
        }

        return targetPt;
    }
}