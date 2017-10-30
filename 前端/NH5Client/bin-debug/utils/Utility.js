var Utility;
(function (Utility) {
    //获取随机机
    function random(from, to) {
        return Math.floor(Math.random() * (to + 1));
    }
    Utility.random = random;
    //获取起点到终点的距离
    function distance(sx, sy, ex, ey) {
        var x = ex - sx;
        var y = ey - sy;
        return Math.sqrt(x * x + y * y);
    }
    Utility.distance = distance;
    //获取起点到终点的格子数 斜线也算为1
    function distanceCellByPt(fromPt, toPt) {
        return distanceCell(fromPt.x, fromPt.y, toPt.x, toPt.y);
    }
    Utility.distanceCellByPt = distanceCellByPt;
    //获取起点到终点的格子数 斜线也算为1
    function distanceCell(sx, sy, ex, ey) {
        var x = ex > sx ? ex - sx : sx - ex;
        var y = ey > sy ? ey - sy : sy - ey;
        return y > x ? y : x;
    }
    Utility.distanceCell = distanceCell;
    //两个数值比较
    function compareNumber(lh, rh) {
        if (lh == rh)
            return 0;
        return lh > rh ? 1 : -1;
    }
    Utility.compareNumber = compareNumber;
    //通过起点和半径获取圆形区域
    function getCircleRangeByRadius(sx, sy, radius) {
        return this.getRange(sx - radius, sy - radius, sx + radius, sy + radius);
    }
    Utility.getCircleRangeByRadius = getCircleRangeByRadius;
    //通过起点和终点获取区域
    function getRange(sx, sy, tx, ty) {
        var pointList = new List();
        for (var i = sx; i <= tx; i++) {
            for (var j = sy; j <= ty; j++) {
                pointList.add(new egret.Point(i, j));
            }
        }
        return pointList;
    }
    Utility.getRange = getRange;
    //判断朝向
    function lookAt(sx, sy, tx, ty) {
        if (sx > tx && sy > ty) {
            return MapModule.Around.LEFTUP;
        }
        else if (sx == tx && sy > ty) {
            return MapModule.Around.UP;
        }
        else if (sx < tx && sy > ty) {
            return MapModule.Around.RIGHTUP;
        }
        else if (sx < tx && sy == ty) {
            return MapModule.Around.RIGHT;
        }
        else if (sx > tx && sy == ty) {
            return MapModule.Around.LEFT;
        }
        else if (sx > tx && sy < ty) {
            return MapModule.Around.LEFTDOWN;
        }
        else if (sx == tx && sy < ty) {
            return MapModule.Around.DOWN;
        }
        else if (sx < tx && sy < ty) {
            return MapModule.Around.RIGHTDOWN;
        }
        return MapModule.Around.RIGHTDOWN;
    }
    Utility.lookAt = lookAt;
    //格式化字符串 {0}_{1}
    function format(str) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        args = args || [];
        var pattern = /\{[0-9]\}+/g;
        var _match = str.match(pattern);
        try {
            if (!!_match && _match.length > 0) {
                for (var i = 0; i < _match.length; i++)
                    str = str.replace(_match[i], args[i]);
            }
        }
        catch (ex) {
            throw new Error("format 格式错误");
        }
        return str;
    }
    Utility.format = format;
    //将格子坐标转换成像素坐标
    function gridToPixel(pt) {
        return new egret.Point(pt.x * 60 + 30, pt.y * 40 + 20);
    }
    Utility.gridToPixel = gridToPixel;
    //将像素坐标转换成格子坐标
    function pixelToGrid(px, py) {
        return new egret.Point(Math.floor((px - 30) / 60), Math.floor((py - 20) / 40));
    }
    Utility.pixelToGrid = pixelToGrid;
})(Utility || (Utility = {}));
//# sourceMappingURL=Utility.js.map