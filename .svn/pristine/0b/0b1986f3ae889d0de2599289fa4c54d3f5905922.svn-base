var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//动画组件
var AnimationComponent = (function (_super) {
    __extends(AnimationComponent, _super);
    //构造
    function AnimationComponent(owner, skillIdList) {
        var _this = _super.call(this, owner) || this;
        _this.skillClipDic = new Dictionary();
        _this.roleClipDic = new Dictionary();
        if (!skillIdList)
            return _this;
        skillIdList.forEach(function (id) { _this.loadSkill(id); }, _this);
        return _this;
    }
    Object.defineProperty(AnimationComponent.prototype, "type", {
        //组件类型
        get: function () { return ComponentType.Animator; },
        enumerable: true,
        configurable: true
    });
    //初始化组件
    AnimationComponent.prototype.init = function () {
        this.owner.addEventListener(RoleEventDefine.PlayAnimation, this.playAnimation, this);
        this.owner.addEventListener(RoleEventDefine.PlayAtkAnimation, this.playAtkAnimation, this);
    };
    //释放组件
    AnimationComponent.prototype.release = function () {
        this.owner.removeEventListener(RoleEventDefine.PlayAnimation, this.playAnimation, this);
        this.owner.removeEventListener(RoleEventDefine.PlayAtkAnimation, this.playAtkAnimation, this);
        this.skillClipDic.foreach(function (directionDic) { directionDic.clear(); });
        this.skillClipDic.clear();
        this.skillClipDic = null;
        this.roleClipDic.foreach(function (directionDic) { directionDic.clear(); });
        this.roleClipDic.clear();
        this.roleClipDic = null;
    };
    //播放通用动画 [0]:展示状态ID [1]:朝向
    AnimationComponent.prototype.playAnimation = function (args) {
        var showId = args[0];
        var direction = args[1];
        var clipList = this.getRoleClipList(showId, direction);
        if (!!clipList)
            ModuleEventMgr.instance.triger(new PlayStateEvent(this.owner, clipList));
    };
    //播放攻击动画 [0]:技能模版 [1]:朝向 [2]:目标
    AnimationComponent.prototype.playAtkAnimation = function (args) {
        if (!args || args.length < 3) {
            console.error("AnimatorComponent playAnimation args.length < 3");
            return;
        }
        var skillTp = args[0];
        var direction = args[1];
        var target = args[2];
        var skillClipList = this.getSkillMovieClipList(skillTp.ID, direction);
        if (!skillClipList)
            skillClipList = this.getSkillMovieClipList(skillTp.ID, MapModule.Around.DOWN);
        var roleClipList = this.getRoleClipList(ShowClipDefine.Attack, direction);
        var roleIdleClpList = this.getRoleClipList(ShowClipDefine.Idle, direction);
        if (!!skillClipList) {
            var skillRes = !!skillClipList ? skillClipList.getItem(SkillClipDefine.SkillRes) : null;
            var FlyRes = !!skillClipList ? skillClipList.getItem(SkillClipDefine.FlyRes) : null;
            ModuleEventMgr.instance.triger(new PlayAtkStateEvent(this.owner, target, skillTp, direction, skillRes, FlyRes, roleClipList, roleIdleClpList));
        }
    };
    //加载技能动画
    AnimationComponent.prototype.loadSkill = function (skillId) {
        var skillTp = TempleMgr.select("SkillTemple", skillId);
        if (!skillTp)
            return;
        if (skillTp.skillResId > 0)
            this.loadSkillMovieClip(skillTp.ID, SkillClipDefine.SkillRes, AssetsDefine.MoviePath, skillTp.skillResId, skillTp.effectDirection);
        if (skillTp.skillResIdFly > 0)
            this.loadSkillMovieClip(skillTp.ID, SkillClipDefine.FlyRes, AssetsDefine.MoviePath, skillTp.skillResIdFly);
        if (skillTp.skillResIdRock > 0)
            this.loadSkillMovieClip(skillTp.ID, SkillClipDefine.RockRes, AssetsDefine.MoviePath, skillTp.skillResIdRock);
    };
    //加载技能动画
    AnimationComponent.prototype.loadSkillMovieClip = function (skillId, resIndex, filePath, id, dirArr) {
        dirArr = dirArr || AssetsDefine.Dir_1;
        var movieClipDic = AssetsMgr.instance.loadMovieGroup(filePath, AssetsDefine.effect + AssetsDefine.AtkRule, id, dirArr);
        var skillClipDic = this.skillClipDic.getValue(skillId);
        if (!skillClipDic) {
            skillClipDic = new Dictionary();
            this.skillClipDic.add(skillId, skillClipDic);
        }
        movieClipDic.foreach(function (clip, direction) {
            var clipList = skillClipDic.getValue(direction);
            if (!clipList) {
                clipList = new List(null, SkillClipDefine.Max);
                skillClipDic.add(direction, clipList);
            }
            clipList.setItem(resIndex, clip);
        });
    };
    //加载角色动画
    AnimationComponent.prototype.loadRoleMovieClip = function (showId, filePath, id, rule, isLoop) {
        if (isLoop === void 0) { isLoop = false; }
        var roleClipDic = AssetsMgr.instance.loadMovieGroup(filePath, rule, id, AssetsDefine.Dir_8, isLoop);
        var clipDic = this.roleClipDic.getValue(showId);
        if (!clipDic) {
            clipDic = new Dictionary();
            this.roleClipDic.add(showId, clipDic);
        }
        roleClipDic.foreach(function (clip, direction) {
            var clipList = clipDic.getValue(direction);
            if (!clipList) {
                clipList = new List();
                clipDic.add(direction, clipList);
            }
            clipList.add(clip);
        });
    };
    //通过技能ID和朝向获取技能动画
    AnimationComponent.prototype.getSkillMovieClipList = function (skillId, direction) {
        var skillClipDic = this.skillClipDic.getValue(skillId);
        if (!!skillClipDic)
            return skillClipDic.getValue(direction);
        return null;
    };
    //获取角色动画
    AnimationComponent.prototype.getRoleClipList = function (showId, direction) {
        var clipDic = this.roleClipDic.getValue(showId);
        if (!!clipDic)
            return clipDic.getValue(direction);
        return null;
    };
    return AnimationComponent;
}(ComponentBase));
__reflect(AnimationComponent.prototype, "AnimationComponent");
//# sourceMappingURL=AnimationComponent.js.map