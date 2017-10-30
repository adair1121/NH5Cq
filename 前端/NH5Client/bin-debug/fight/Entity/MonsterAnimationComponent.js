var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//怪物动画组件
var MonsterAnimationComponent = (function (_super) {
    __extends(MonsterAnimationComponent, _super);
    //构造  [0]:技能ID数组 [1]:怪物ID
    function MonsterAnimationComponent(owner, args) {
        var _this = _super.call(this, owner, args[0]) || this;
        var monsterId = args[1] || 0;
        if (monsterId == 0)
            return _this;
        _this.loadModelClip(monsterId);
        return _this;
    }
    //加载怪物动画
    MonsterAnimationComponent.prototype.loadModelClip = function (monsterId) {
        var unitTp = TempleMgr.select("UnitTemple", monsterId);
        if (!unitTp)
            return;
        this.loadRoleMovieClip(ShowClipDefine.Attack, AssetsDefine.MoviePath, unitTp.model, AssetsDefine.monster + AssetsDefine.AtkRule);
        this.loadRoleMovieClip(ShowClipDefine.Idle, AssetsDefine.MoviePath, unitTp.model, AssetsDefine.monster + AssetsDefine.IdleRule, true);
        this.loadRoleMovieClip(ShowClipDefine.Move, AssetsDefine.MoviePath, unitTp.model, AssetsDefine.monster + AssetsDefine.MoveRule, true);
    };
    return MonsterAnimationComponent;
}(AnimationComponent));
__reflect(MonsterAnimationComponent.prototype, "MonsterAnimationComponent");
//# sourceMappingURL=MonsterAnimationComponent.js.map