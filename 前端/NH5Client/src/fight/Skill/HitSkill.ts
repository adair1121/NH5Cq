//野蛮冲撞技能
class HitSkill extends SkillBase
{
    //冲撞到目标后再移动几格
    protected moveCellCount:number;

    //获取技能目标列表
	protected getSkillTargetList(target:BlackboardComponent, sx:number, sy:number, tx:number, ty:number):List<BlackboardComponent>
    {
        return new List<BlackboardComponent>(new Array<BlackboardComponent>(target));
    }

    //是否能使用技能 只有在水平、垂直、斜线方向
	public canUseSkill(tx:number, ty:number):boolean
    {
        var blackboardComp = this.owner.getComponent<BlackboardComponent>(ComponentType.Blackboard);
        var sx = blackboardComp.getAttrValue(data.RoleAttr.x);
        var sy = blackboardComp.getAttrValue(data.RoleAttr.y);

        if (sx == tx && sy == ty)
            return false;

        var vecX = tx - sx;
        var vecY = ty - sy;

        var distanceX = vecX < 0 ? -vecX : vecX;
        var distanceY = vecY < 0 ? -vecY : vecY;

        if (distanceX == distanceY || distanceX == 0 || distanceY == 0)
        {
            var pathList = MapModule.findPath(sx, sy, tx, ty, 1);
            if (!pathList || pathList.count == 0)
                return false;

            //检查冲撞路径内是否有阻挡
            var isBlock = false;
            pathList.forEach(mapCell => { if (!mapCell.isOpen) isBlock = true; });

            if (isBlock)
                return false;

            return true;
        }

        return false;
    }

    //进入技能
	public OnEnter(target:Entity):void
	{
		if (!this.isCastSkill)
			return;

		var selfComp = this.owner.getComponent<BlackboardComponent>(ComponentType.Blackboard);
		var selfPos = selfComp.getPosition();

		var targetComp = target.getComponent<BlackboardComponent>(ComponentType.Blackboard);
		var targetPos = targetComp.getPosition();

        var pathList = MapModule.findPath(selfPos.x, selfPos.y, targetPos.x, targetPos.y, 1);
        if (!!pathList || pathList.count == 0)
            return;

        var effectArgList = this.skillEffectArgumentsDic.getValue(SkillEffect.HitMove);
        if (!effectArgList || effectArgList.count == 0)
        {
            console.error("HitSkill castSkill effectArgList.count == 0");
            return;
        }

        super.OnEnter(target);

        this.moveCellCount = effectArgList.getItem(0) - pathList.count;
        this.skillTime = this.skillTp.skillTime / effectArgList.getItem(0) * pathList.count;

        if (pathList.count > 0)
        {
            //先冲撞到目标面前
            var cell = pathList.deQueueLast();
            this.owner.trigger(RoleEventDefine.ChangeState, FSMState.Move, cell.toPoint(), this.skillTime, ShowClipDefine.Idle,
                () => { this.owner.trigger(RoleEventDefine.ChangeToPreState); }, this);
        }
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

        var selfPos = selfComp.getPosition();
        
        var damageInfoEvent = damageInfoList.getItem(0);

        var targetComp = damageInfoEvent.who.getComponent<BlackboardComponent>(ComponentType.Blackboard);
        var targetPos = targetComp.getPosition();

        var effectArgList = this.skillEffectArgumentsDic.getValue(SkillEffect.HitMove);
        if (!effectArgList || effectArgList.count == 0)
        {
            console.error("HitSkill castSkill effectArgList.count == 0");
            return true;
        }

        //冲撞距离和攻击距离相同，将只播放特效无位移
        var targetPt = this.getHitMovePt(selfPos.x, selfPos.y, targetPos.x, targetPos.y, this.moveCellCount);

        var moveTime = this.skillTp.skillTime / effectArgList.getItem(0) * Utility.distanceCellByPt(selfPos, targetPt);
        this.owner.trigger(RoleEventDefine.ChangeState, FSMState.Move, targetPt, moveTime, ShowClipDefine.Idle, () =>
        {
            ModuleEventMgr.instance.triger(damageInfoEvent);

            //if (damageInfoEvent.isDead)
            //    damageInfoEvent.who.trigger(RoleEventDefine.ChangeState, FSMState.Dead);

        }, this);

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