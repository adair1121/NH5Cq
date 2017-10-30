var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//抗拒火环
var CircleHitSkill = (function (_super) {
    __extends(CircleHitSkill, _super);
    function CircleHitSkill() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //获取技能目标列表
    CircleHitSkill.prototype.getSkillTargetList = function (target, sx, sy, tx, ty) {
        return this.getTargetList(Utility.getCircleRangeByRadius(sx, sy, this.skillTp.range));
    };
    //执行技能
    CircleHitSkill.prototype.OnExcuter = function (deltaTime) {
        var _this = this;
        this.skillTime -= deltaTime;
        if (this.skillTime > 0)
            return false;
        var selfComp = this.owner.getComponent(ComponentType.Blackboard);
        var damageInfoList = this.useSkill(selfComp);
        if (!damageInfoList || damageInfoList.count == 0)
            return true;
        var effectArgList = this.skillEffectArgumentsDic.getValue(SkillEffect.HitMove);
        if (!effectArgList || effectArgList.count == 0) {
            console.error("HitSkill castSkill effectArgList.count == 0");
            return true;
        }
        var selfPos = selfComp.getPosition();
        damageInfoList.forEach(function (damageInfoEvent) {
            var targetBlackboard = damageInfoEvent.who.getComponent(ComponentType.Blackboard);
            var targetPos = targetBlackboard.getPosition();
            var targetPt = _this.getHitMovePt(selfPos.x, selfPos.y, targetPos.x, targetPos.y, effectArgList.getItem(0));
            _this.owner.trigger(RoleEventDefine.ChangeState, FSMState.Move, targetPt, _this.skillTp.strikeTime, function () {
                ModuleEventMgr.instance.triger(damageInfoEvent);
                //if (damageInfoEvent.isDead)
                //    damageInfoEvent.who.trigger(RoleEventDefine.ChangeState, FSMState.Dead);
            }, _this, FSMState.Idle);
        });
        return true;
    };
    //返回撞击目标点
    CircleHitSkill.prototype.getHitMovePt = function (sx, sy, tx, ty, distance) {
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
    return CircleHitSkill;
}(SkillBase));
__reflect(CircleHitSkill.prototype, "CircleHitSkill");
//# sourceMappingURL=CircleHitSkill.js.map