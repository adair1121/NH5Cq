var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MapModule;
(function (MapModule) {
    //地图ID对应地图信息
    var mapInfoDic = new Dictionary();
    //地图ID对应所有地图格子
    var mapCellDic = new Dictionary();
    //获取地图
    function getMapInfo(mapId) {
        return mapInfoDic.getValue(mapId);
    }
    MapModule.getMapInfo = getMapInfo;
    //创建地图信息
    function createMapInfo(callback, thisArg) {
        var templeArr = TempleMgr.selectAll("MapTemple");
        if (!!templeArr && templeArr.length > 0) {
            var mapPathList = new List();
            templeArr.forEach(function (mapTp) { mapPathList.add("resource/config/map/" + mapTp.mapRes + ".mpt"); });
            AssetsMgr.instance.loadTextGroup(mapPathList.toArray(), function (dic) {
                dic.foreach(function (value, key) { createMapCell(value, parseInt(key)); });
                if (!!callback)
                    callback.call(thisArg);
            });
        }
    }
    MapModule.createMapInfo = createMapInfo;
    //创建地图格子
    function createMapCell(mapInfo, mapId) {
        if (!mapInfo)
            return;
        mapInfoDic.add(mapId, mapInfo);
        var cellDic = new Dictionary();
        for (var y = 0; y < mapInfo.rowCount; y++) {
            for (var x = 0; x < mapInfo.colCount; x++) {
                if (mapInfo.blocks[y][x] == 1)
                    continue;
                var mapCell = new MapCell(x, y, x * mapInfo.rowCount + y);
                cellDic.add(mapCell.Index, mapCell);
            }
        }
        cellDic.foreach(function (mapCell) {
            mapCell.updateAroundCell(cellDic, mapInfo);
        });
        mapCellDic.add(mapId, cellDic);
    }
    //获取指定地图格子信息
    function getMapCell(x, y, mapId) {
        mapId = mapId || SceneModule.BattleScene.currMapId;
        var mapInfo = mapInfoDic.getValue(mapId);
        var cellDic = mapCellDic.getValue(mapId);
        if (!!MapInfo && !!cellDic)
            return cellDic.getValue(x * mapInfo.rowCount + y);
        return null;
    }
    MapModule.getMapCell = getMapCell;
    //通过点坐标 获取指定格子信息
    function getMapCellByPoint(point, mapId) {
        if (!!point)
            return getMapCell(point.x, point.y, mapId);
        return null;
    }
    MapModule.getMapCellByPoint = getMapCellByPoint;
    //获取指定数量的随机格子
    function getRandomCellByPoint(pt, count, mapId) {
        return getRandomCell(pt.x, pt.y, count, mapId);
    }
    MapModule.getRandomCellByPoint = getRandomCellByPoint;
    //获取指定数量的随机格子
    function getRandomCell(x, y, count, mapId) {
        var currCell = getMapCell(x, y, mapId);
        if (!currCell)
            return null;
        var cellList = new List();
        currCell.getRandomCell(cellList, count);
        if (cellList.count < count)
            addRandomOpenCell(cellList, 0, count);
        return cellList;
    }
    MapModule.getRandomCell = getRandomCell;
    //添加随机开放格子
    function addRandomOpenCell(cellList, index, count) {
        if (cellList.count >= count)
            return;
        console.error("currCount: " + cellList.count + " needCount: " + count);
        var addList = cellList.getRange(index);
        addList.forEach(function (cell) { cell.getRandomCell(cellList, count); });
        addRandomOpenCell(cellList, cellList.count, count);
    }
    //以目标为中心在屏幕边界范围中随机取一个点
    function randomBorder(ptFrom, rangeX, rangeY, mapId) {
        mapId = mapId || SceneModule.BattleScene.currMapId;
        var borderList = new List();
        //上下边
        var upY = ptFrom.y - rangeY;
        var downY = ptFrom.y + rangeY;
        for (var ix = ptFrom.x - rangeX; ix < (ptFrom.x + rangeX); ix++) {
            if (!isBlock(ix, upY, mapId))
                borderList.add(new egret.Point(ix, upY));
            if (!isBlock(ix, downY, mapId))
                borderList.add(new egret.Point(ix, downY));
        }
        var leftX = ptFrom.x - rangeX;
        var rightX = ptFrom.x + rangeY;
        for (var iy = ptFrom.y - rangeY; iy < (ptFrom.y + rangeY); iy++) {
            if (!isBlock(leftX, iy, mapId))
                borderList.add(new egret.Point(leftX, iy));
            if (!isBlock(rightX, iy, mapId))
                borderList.add(new egret.Point(rightX, iy));
        }
        return borderList.getItem(Utility.random(0, borderList.count - 1));
    }
    MapModule.randomBorder = randomBorder;
    //寻路 sx,sy:起点 tx,ty:终点 distance:距离终点多长停止
    function findPath(sx, sy, tx, ty, distance) {
        var cellQueue = new Queue();
        var start = getMapCell(sx, sy);
        var target = getMapCell(tx, ty);
        if (!start || !target)
            return cellQueue;
        if (start.Index == target.Index || Utility.distance(sx, sy, tx, ty) <= distance)
            return cellQueue;
        var openList = new Array();
        var closeList = new Array();
        var isFindTarget = false;
        var currMapCell = null;
        start.parent = null;
        start.H = 0;
        start.isOpen = false;
        openList.push(start);
        while (openList.length > 0 && !isFindTarget) {
            if (openList.length > 1)
                openList.sort(function (lh, rh) { return Utility.compareNumber(lh.F, rh.F); });
            currMapCell = openList[0];
            openList.splice(0, 1);
            closeList.push(currMapCell);
            currMapCell.aroundCellList.forEach(function (mapCell) {
                if (!mapCell.isOpen && mapCell.Index != target.Index)
                    return;
                if (mapCell.Index == target.Index) {
                    isFindTarget = true;
                    mapCell.parent = currMapCell;
                    return;
                }
                mapCell.H = currMapCell.H + Utility.distance(currMapCell.X, currMapCell.Y, mapCell.X, mapCell.Y);
                mapCell.G = Utility.distance(mapCell.X, mapCell.Y, target.X, target.Y);
                mapCell.F = mapCell.G + mapCell.H;
                mapCell.parent = currMapCell;
                openList.push(mapCell);
                mapCell.isOpen = false;
            });
        }
        openList.forEach(function (cell) { cell.isOpen = true; });
        closeList.forEach(function (cell) { cell.isOpen = true; });
        if (isFindTarget) {
            currMapCell = target;
            while (!!currMapCell.parent) {
                cellQueue.enQueue(currMapCell);
                currMapCell = currMapCell.parent;
            }
            if (distance > 0)
                cellQueue.removeRange(0, distance);
            cellQueue.queueReverse();
        }
        return cellQueue;
    }
    MapModule.findPath = findPath;
    //是否是障碍
    function isBlock(x, y, mapId) {
        var mapCell = getMapCell(x, y, mapId);
        if (!mapCell || !mapCell.isOpen)
            return true;
        return false;
    }
    MapModule.isBlock = isBlock;
    //周围朝向
    var Around;
    (function (Around) {
        Around[Around["MIDDLE"] = 0] = "MIDDLE";
        Around[Around["UP"] = 1] = "UP";
        Around[Around["RIGHTUP"] = 2] = "RIGHTUP";
        Around[Around["RIGHT"] = 3] = "RIGHT";
        Around[Around["RIGHTDOWN"] = 4] = "RIGHTDOWN";
        Around[Around["DOWN"] = 5] = "DOWN";
        Around[Around["LEFTDOWN"] = 6] = "LEFTDOWN";
        Around[Around["LEFT"] = 7] = "LEFT";
        Around[Around["LEFTUP"] = 8] = "LEFTUP";
    })(Around = MapModule.Around || (MapModule.Around = {}));
    //单位信息类
    var UnitInfo = (function () {
        function UnitInfo() {
        }
        return UnitInfo;
    }());
    __reflect(UnitInfo.prototype, "UnitInfo");
    //装饰信息类
    var OrnaInfo = (function () {
        function OrnaInfo() {
        }
        return OrnaInfo;
    }());
    __reflect(OrnaInfo.prototype, "OrnaInfo");
    //区域信息类
    var AreaInfo = (function () {
        function AreaInfo() {
        }
        return AreaInfo;
    }());
    __reflect(AreaInfo.prototype, "AreaInfo");
    //地图数据信息
    var MapInfo = (function () {
        function MapInfo() {
        }
        return MapInfo;
    }());
    MapModule.MapInfo = MapInfo;
    __reflect(MapInfo.prototype, "MapModule.MapInfo");
    //地图格子
    var MapCell = (function () {
        //构造
        function MapCell(x, y, index) {
            this.X = x;
            this.Y = y;
            this.Index = index;
            this.isOpen = true;
            this.aroundCellList = new List();
        }
        //更新周围格子
        MapCell.prototype.updateAroundCell = function (mapCellDic, mapInfo) {
            this.AddAroundCell(mapCellDic, mapInfo, MapModule.Around.LEFT, this.X - 1, this.Y);
            this.AddAroundCell(mapCellDic, mapInfo, MapModule.Around.RIGHT, this.X + 1, this.Y);
            this.AddAroundCell(mapCellDic, mapInfo, MapModule.Around.DOWN, this.X, this.Y + 1);
            this.AddAroundCell(mapCellDic, mapInfo, MapModule.Around.UP, this.X, this.Y - 1);
            this.AddAroundCell(mapCellDic, mapInfo, MapModule.Around.LEFTDOWN, this.X - 1, this.Y + 1);
            this.AddAroundCell(mapCellDic, mapInfo, MapModule.Around.RIGHTDOWN, this.X + 1, this.Y + 1);
            this.AddAroundCell(mapCellDic, mapInfo, MapModule.Around.LEFTUP, this.X - 1, this.Y - 1);
            this.AddAroundCell(mapCellDic, mapInfo, MapModule.Around.RIGHTUP, this.X + 1, this.Y - 1);
        };
        //添加地图格子
        MapCell.prototype.AddAroundCell = function (mapCellDic, mapInfo, around, x, y) {
            if (x < 0 || x >= mapInfo.colCount || y < 0 || y >= mapInfo.rowCount)
                return;
            if (mapInfo.blocks[y][x] == 1)
                return;
            var mapCell = mapCellDic.getValue(x * mapInfo.rowCount + y);
            if (!!mapCell)
                this.aroundCellList.add(mapCell);
        };
        //从周边格子查找指定个数的开放格子，并返回添加个数
        MapCell.prototype.getRandomCell = function (cellList, count) {
            if (cellList.count >= count)
                return;
            var newList = this.aroundCellList.toNewList();
            while (cellList.count < count && newList.count > 0) {
                var index = 0;
                var item = newList.getItem(index);
                if (item.isOpen && !cellList.contains(item))
                    cellList.add(item);
                newList.removeAt(index);
            }
        };
        //转换成坐标
        MapCell.prototype.toPoint = function () {
            return new egret.Point(this.X, this.Y);
        };
        return MapCell;
    }());
    MapModule.MapCell = MapCell;
    __reflect(MapCell.prototype, "MapModule.MapCell");
})(MapModule || (MapModule = {}));
//# sourceMappingURL=MapModule.js.map