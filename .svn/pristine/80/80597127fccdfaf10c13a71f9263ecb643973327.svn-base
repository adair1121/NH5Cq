var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//圆形范围技能
var CircleSkill = (function (_super) {
    __extends(CircleSkill, _super);
    function CircleSkill() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //获取技能目标列表
    CircleSkill.prototype.getSkillTargetList = function (target, sx, sy, tx, ty) {
        return this.getTargetList(Utility.getCircleRangeByRadius(sx, sy, this.skillTp.range));
    };
    return CircleSkill;
}(SkillBase));
__reflect(CircleSkill.prototype, "CircleSkill");
//# sourceMappingURL=CircleSkill.js.map