var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PosUtils = (function () {
    function PosUtils() {
    }
    /**
     * 网格坐标转像素坐标
     * @param gx x坐标
     * @param gy y坐标
     * @return egret.point 实际像素点
     */
    PosUtils.gridToPixel = function (gx, gy) {
        return new egret.Point(gx * 60 + 30, gy * 40 + 20);
    };
    /**
     * 像素坐标转网格坐标
     * @param px x坐标
     * @param py y坐标
     * @return egret.point 网格坐标点
     */
    PosUtils.pixelToGrid = function (px, py) {
        return new egret.Point(Math.ceil((px - 30) / 60), Math.ceil((py - 20) / 40));
    };
    /**
     * 网格坐标转地图格子
     * @param gx x坐标
     * @param gy y坐标
     * @return egret.point 地图格子点
     */
    PosUtils.gridToMapGrid = function (gx, gy) {
        var p = PosUtils.gridToPixel(gx, gy);
        var mx = Math.ceil(p.y / 256);
        var my = Math.ceil(p.x / 256);
        return new egret.Point(mx, my);
    };
    return PosUtils;
}());
__reflect(PosUtils.prototype, "PosUtils");
//# sourceMappingURL=PosUtils.js.map