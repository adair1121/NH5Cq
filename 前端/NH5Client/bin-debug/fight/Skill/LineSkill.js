var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//矩形范围技能
var LineSkill = (function (_super) {
    __extends(LineSkill, _super);
    function LineSkill() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //获取技能目标列表
    LineSkill.prototype.getSkillTargetList = function (target, sx, sy, tx, ty) {
        var vecX = sx - tx;
        var vecY = sy - ty;
        var ptList = new List();
        for (var i = 1; i <= this.skillTp.range; i++)
            ptList.add(new egret.Point(sx + vecX * i, sy + vecY * i));
        return this.getTargetList(ptList);
    };
    return LineSkill;
}(SkillBase));
__reflect(LineSkill.prototype, "LineSkill");
//# sourceMappingURL=LineSkill.js.map