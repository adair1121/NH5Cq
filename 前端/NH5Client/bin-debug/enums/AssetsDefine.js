var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AssetsDefine = (function () {
    function AssetsDefine() {
    }
    return AssetsDefine;
}());
//资源系统路径
AssetsDefine.MoviePath = "resource/assets/movie/";
//地图文本路径
AssetsDefine.MapPath = "resource/assets/map/";
//资源规则
AssetsDefine.clothes = "role/"; //衣服
AssetsDefine.weapon = "weapon/"; //武器
AssetsDefine.wing = "wing/"; //翅膀
AssetsDefine.effect = "effect/"; //技能特效
AssetsDefine.monster = "monster/"; //怪物
AssetsDefine.AtkRule = "{0}_a_{1}"; //攻击
AssetsDefine.IdleRule = "{0}_s_{1}"; //待机
AssetsDefine.MoveRule = "{0}_r_{1}"; //移动
AssetsDefine.CastRule = "{0}_c_{1}"; //释放技能
AssetsDefine.Dir_1 = [5]; //1方向
AssetsDefine.Dir_8 = [1, 2, 3, 4, 5, 6, 7, 8]; //8方向
//资源后缀
AssetsDefine.PngSuffix = ".png";
AssetsDefine.JpgSuffix = ".jpg";
AssetsDefine.JsonSuffix = ".json";
AssetsDefine.TxtSuffix = ".txt";
AssetsDefine.MptSuffix = ".mpt";
__reflect(AssetsDefine.prototype, "AssetsDefine");
//# sourceMappingURL=AssetsDefine.js.map