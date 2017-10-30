var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//扇形范围技能
var SectorSkill = (function (_super) {
    __extends(SectorSkill, _super);
    function SectorSkill() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //获取技能目标列表
    SectorSkill.prototype.getSkillTargetList = function (target, sx, sy, tx, ty) {
        var ptList = new List();
        ptList.add(new egret.Point(sx, sy));
        var lookAt = Utility.lookAt(sx, sy, tx, ty);
        switch (lookAt) {
            case MapModule.Around.UP:
            case MapModule.Around.LEFTUP:
                ptList.add(new egret.Point(sx - 1, sy - 1));
                ptList.add(new egret.Point(sx, sy - 1));
                ptList.add(new egret.Point(sx + 1, sy - 1));
                ptList.add(new egret.Point(sx + 1, sy));
                break;
            case MapModule.Around.RIGHT:
            case MapModule.Around.RIGHTUP:
                ptList.add(new egret.Point(sx + 1, sy - 1));
                ptList.add(new egret.Point(sx + 1, sy));
                ptList.add(new egret.Point(sx + 1, sy + 1));
                ptList.add(new egret.Point(sx, sy + 1));
                break;
            case MapModule.Around.DOWN:
            case MapModule.Around.RIGHTDOWN:
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
    };
    return SectorSkill;
}(SkillBase));
__reflect(SectorSkill.prototype, "SectorSkill");
//# sourceMappingURL=SectorSkill.js.map