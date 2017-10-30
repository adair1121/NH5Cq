var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//单体技能
var SingleSkill = (function (_super) {
    __extends(SingleSkill, _super);
    function SingleSkill() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //获取技能目标列表
    SingleSkill.prototype.getSkillTargetList = function (target, sx, sy, tx, ty) {
        return new List(new Array(target));
    };
    return SingleSkill;
}(SkillBase));
__reflect(SingleSkill.prototype, "SingleSkill");
//# sourceMappingURL=SingleSkill.js.map