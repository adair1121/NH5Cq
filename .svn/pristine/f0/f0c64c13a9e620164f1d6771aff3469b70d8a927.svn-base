var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//角色动画组件
var RoleAnimationComponent = (function (_super) {
    __extends(RoleAnimationComponent, _super);
    //构造 [0]:技能ID数组 [1]:装备数组
    function RoleAnimationComponent(owner, args) {
        return _super.call(this, owner, args[0]) || this;
        //装备动画待处理
    }
    //初始化组件
    RoleAnimationComponent.prototype.init = function () {
        var blackboardComp = this.owner.getComponent(ComponentType.Blackboard);
        var sex = blackboardComp.getAttrValue(data.RoleAttr.sex);
        //没有装备时，使用默认装备动画
        this.loadRoleClip(this.owner.job, sex);
        _super.prototype.init.call(this);
    };
    //释放组件
    RoleAnimationComponent.prototype.release = function () {
        _super.prototype.release.call(this);
    };
    //加载角色动画
    RoleAnimationComponent.prototype.loadRoleClip = function (job, sex) {
        var jobTp = TempleMgr.select("JobInitTemple", job);
        if (!jobTp)
            return;
        var weapon = sex == 1 ? jobTp.maleWeaponID : jobTp.femaleWeaponID;
        var clothes = sex == 1 ? jobTp.maleResID : jobTp.femaleResID;
        this.loadRoleMovieClip(ShowClipDefine.Attack, AssetsDefine.MoviePath, weapon, AssetsDefine.weapon + AssetsDefine.AtkRule);
        this.loadRoleMovieClip(ShowClipDefine.Attack, AssetsDefine.MoviePath, clothes, AssetsDefine.clothes + AssetsDefine.AtkRule);
        this.loadRoleMovieClip(ShowClipDefine.Idle, AssetsDefine.MoviePath, weapon, AssetsDefine.weapon + AssetsDefine.IdleRule, true);
        this.loadRoleMovieClip(ShowClipDefine.Idle, AssetsDefine.MoviePath, clothes, AssetsDefine.clothes + AssetsDefine.IdleRule, true);
        this.loadRoleMovieClip(ShowClipDefine.Move, AssetsDefine.MoviePath, weapon, AssetsDefine.weapon + AssetsDefine.MoveRule, true);
        this.loadRoleMovieClip(ShowClipDefine.Move, AssetsDefine.MoviePath, clothes, AssetsDefine.clothes + AssetsDefine.MoveRule, true);
        this.loadRoleMovieClip(ShowClipDefine.Cast, AssetsDefine.MoviePath, weapon, AssetsDefine.weapon + AssetsDefine.CastRule);
        this.loadRoleMovieClip(ShowClipDefine.Cast, AssetsDefine.MoviePath, clothes, AssetsDefine.clothes + AssetsDefine.CastRule);
    };
    return RoleAnimationComponent;
}(AnimationComponent));
__reflect(RoleAnimationComponent.prototype, "RoleAnimationComponent");
//# sourceMappingURL=RoleAnimationComponent.js.map