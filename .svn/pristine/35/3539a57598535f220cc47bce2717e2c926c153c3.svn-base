var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//野蛮冲撞技能
var HitSkill = (function (_super) {
    __extends(HitSkill, _super);
    function HitSkill() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //获取技能目标列表
    HitSkill.prototype.getSkillTargetList = function (target, sx, sy, tx, ty) {
        return new List(new Array(target));
    };
    //是否能使用技能 只有在水平、垂直、斜线方向
    HitSkill.prototype.canUseSkill = function (tx, ty) {
        var blackboardComp = this.owner.getComponent(ComponentType.Blackboard);
        var sx = blackboardComp.getAttrValue(data.RoleAttr.x);
        var sy = blackboardComp.getAttrValue(data.RoleAttr.y);
        if (sx == tx && sy == ty)
            return false;
        var vecX = tx - sx;
        var vecY = ty - sy;
        var distanceX = vecX < 0 ? -vecX : vecX;
        var distanceY = vecY < 0 ? -vecY : vecY;
        if (distanceX == distanceY || distanceX == 0 || distanceY == 0) {
            var pathList = MapModule.findPath(sx, sy, tx, ty, 1);
            if (!pathList || pathList.count == 0)
                return false;
            //检查冲撞路径内是否有阻挡
            var isBlock = false;
            pathList.forEach(function (mapCell) { if (!mapCell.isOpen)
                isBlock = true; });
            if (isBlock)
                return false;
            return true;
        }
        return false;
    };
    //进入技能
    HitSkill.prototype.OnEnter = function (target) {
        var _this = this;
        if (!this.isCastSkill)
            return;
        var selfComp = this.owner.getComponent(ComponentType.Blackboard);
        var selfPos = selfComp.getPosition();
        var targetComp = target.getComponent(ComponentType.Blackboard);
        var targetPos = targetComp.getPosition();
        var pathList = MapModule.findPath(selfPos.x, selfPos.y, targetPos.x, targetPos.y, 1);
        if (!!pathList || pathList.count == 0)
            return;
        var effectArgList = this.skillEffectArgumentsDic.getValue(SkillEffect.HitMove);
        if (!effectArgList || effectArgList.count == 0) {
            console.error("HitSkill castSkill effectArgList.count == 0");
            return;
        }
        _super.prototype.OnEnter.call(this, target);
        this.moveCellCount = effectArgList.getItem(0) - pathList.count;
        this.skillTime = this.skillTp.skillTime / effectArgList.getItem(0) * pathList.count;
        if (pathList.count > 0) {
            //先冲撞到目标面前
            var cell = pathList.deQueueLast();
            this.owner.trigger(RoleEventDefine.ChangeState, FSMState.Move, cell.toPoint(), this.skillTime, ShowClipDefine.Idle, function () { _this.owner.trigger(RoleEventDefine.ChangeToPreState); }, this);
        }
    };
    //执行技能
    HitSkill.prototype.OnExcuter = function (deltaTime) {
        this.skillTime -= deltaTime;
        if (this.skillTime > 0)
            return false;
        var selfComp = this.owner.getComponent(ComponentType.Blackboard);
        var damageInfoList = this.useSkill(selfComp);
        if (!damageInfoList || damageInfoList.count == 0)
            return true;
        var selfPos = selfComp.getPosition();
        var damageInfoEvent = damageInfoList.getItem(0);
        var targetComp = damageInfoEvent.who.getComponent(ComponentType.Blackboard);
        var targetPos = targetComp.getPosition();
        var effectArgList = this.skillEffectArgumentsDic.getValue(SkillEffect.HitMove);
        if (!effectArgList || effectArgList.count == 0) {
            console.error("HitSkill castSkill effectArgList.count == 0");
            return true;
        }
        //冲撞距离和攻击距离相同，将只播放特效无位移
        var targetPt = this.getHitMovePt(selfPos.x, selfPos.y, targetPos.x, targetPos.y, this.moveCellCount);
        var moveTime = this.skillTp.skillTime / effectArgList.getItem(0) * Utility.distanceCellByPt(selfPos, targetPt);
        this.owner.trigger(RoleEventDefine.ChangeState, FSMState.Move, targetPt, moveTime, ShowClipDefine.Idle, function () {
            ModuleEventMgr.instance.triger(damageInfoEvent);
            //if (damageInfoEvent.isDead)
            //    damageInfoEvent.who.trigger(RoleEventDefine.ChangeState, FSMState.Dead);
        }, this);
        return true;
    };
    //返回撞击目标点
    HitSkill.prototype.getHitMovePt = function (sx, sy, tx, ty, distance) {
        var vecX = tx - sx;
        var vecY = ty - sy;
        var distanceX = vecX < 0 ? -vecX : vecX;
        var distanceY = vecY < 0 ? -vecY : vecY;
        var targetPt = new egret.Point(sx, sy);
        //在斜线方向 以当前方向击退X格
        if (distanceX == distanceY) {
            for (var i = 1; i <= distance; i++) {
                var x = tx + (vecX < 0 ? -i : i);
                var y = ty + (vecY < 0 ? -i : i);
                if (MapModule.isBlock(x, y))
                    break;
                targetPt.x = x;
                targetPt.y = y;
            }
        }
        else if (distanceY == 0) {
            for (var i = 1; i <= distance; i++) {
                var x = tx + (vecX < 0 ? -i : i);
                if (MapModule.isBlock(x, sy))
                    break;
                targetPt.x = x;
            }
        }
        else {
            for (var i = 1; i <= distance; i++) {
                var y = ty + (vecY < 0 ? -i : i);
                if (MapModule.isBlock(sx, y))
                    break;
                targetPt.y = y;
            }
        }
        return targetPt;
    };
    return HitSkill;
}(SkillBase));
__reflect(HitSkill.prototype, "HitSkill");
//# sourceMappingURL=HitSkill.js.map