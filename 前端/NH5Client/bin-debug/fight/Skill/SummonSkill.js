var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//召唤技能
var SummonSkill = (function (_super) {
    __extends(SummonSkill, _super);
    function SummonSkill() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SummonSkill.prototype, "getSummonEntityInstId", {
        //技能召唤实体ID
        get: function () { return this.owner.instanceId + "_summon"; },
        enumerable: true,
        configurable: true
    });
    //是否可以释放此技能
    SummonSkill.prototype.isCastSkill = function () {
        return _super.prototype.isCastSkill.call(this) && !EntityMgr.Instance.getEntity(this.getSummonEntityInstId);
    };
    //执行技能
    SummonSkill.prototype.OnExcuter = function (deltaTime) {
        this.skillTime -= deltaTime;
        if (this.skillTime > 0)
            return false;
        var selfComp = this.owner.getComponent(ComponentType.Blackboard);
        var x = selfComp.getAttrValue(data.RoleAttr.x);
        var y = selfComp.getAttrValue(data.RoleAttr.y);
        var cellList = MapModule.getRandomCell(x, y, 1);
        if (!cellList || cellList.count == 0) {
            console.error("SummonSkill cellList == null");
            return true;
        }
        var effectArgList = this.skillEffectArgumentsDic.getValue(SkillEffect.Summon);
        if (effectArgList == null || effectArgList.count == 0) {
            console.log("SummonSkill effectArgList == null");
            return true;
        }
        var summonEntity = Entity.createMonsterEntity(effectArgList[0], this.owner.camp, this.owner.ownerId, null, this.getSummonEntityInstId);
        ModuleEventMgr.instance.triger(new CreateEntityEvent(summonEntity, cellList.getItem(0).toPoint()));
        return true;
    };
    //获取技能目标列表
    SummonSkill.prototype.getSkillTargetList = function (target, sx, sy, tx, ty) {
        return null;
    };
    return SummonSkill;
}(SkillBase));
__reflect(SummonSkill.prototype, "SummonSkill");
//# sourceMappingURL=SummonSkill.js.map