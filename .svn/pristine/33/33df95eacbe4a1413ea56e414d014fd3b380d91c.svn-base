module Utility
{
	//获取随机机
	export function random(from:number, to:number):number
	{
		return Math.floor(Math.random()*(to+1));
	}

	//获取起点到终点的距离
	export function distance(sx:number, sy:number, ex:number, ey:number):number
	{
		var x:number = ex - sx;
		var y:number = ey - sy;

		return Math.sqrt(x * x + y * y);
	}

	//获取起点到终点的格子数 斜线也算为1
	export function distanceCellByPt(fromPt:egret.Point, toPt:egret.Point)
	{
		return distanceCell(fromPt.x, fromPt.y, toPt.x, toPt.y);
	}

	//获取起点到终点的格子数 斜线也算为1
	export function distanceCell(sx:number, sy:number, ex:number, ey:number):number
	{
		var x = ex > sx ? ex - sx : sx - ex;
		var y = ey > sy ? ey - sy : sy - ey;

		return y > x ? y : x;
	}

	//两个数值比较
	export function compareNumber(lh:number, rh:number):number
	{
		if (lh == rh) return 0;

		return lh > rh ? 1 : -1;
	}

	//通过起点和半径获取圆形区域
	export function getCircleRangeByRadius(sx:number, sy:number, radius:number):List<egret.Point>
	{
		return this.getRange(sx - radius, sy - radius, sx + radius, sy + radius);
	}

	//通过起点和终点获取区域
	export function getRange(sx:number, sy:number, tx:number, ty:number):List<egret.Point>
	{
		var pointList = new List<egret.Point>();

		for(var i = sx; i <= tx; i++)
		{
			for(var j = sy; j <= ty; j++)
			{
				pointList.add(new egret.Point(i, j));
			}
		}

		return pointList;
	}

	//判断朝向
	export function lookAt(sx:number, sy:number, tx:number, ty:number):number
	{
		if (sx > tx && sy > ty) { return MapModule.Around.LEFTUP; }
		else if (sx == tx && sy > ty) { return MapModule.Around.UP; }
		else if (sx < tx && sy > ty) { return MapModule.Around.RIGHTUP; }
		else if (sx < tx && sy == ty) { return MapModule.Around.RIGHT; }
		else if (sx > tx && sy == ty) { return MapModule.Around.LEFT; }
		else if (sx > tx && sy < ty) { return MapModule.Around.LEFTDOWN; }
		else if (sx == tx && sy < ty) { return MapModule.Around.DOWN; }
		else if (sx < tx && sy < ty) { return MapModule.Around.RIGHTDOWN; }
		return MapModule.Around.RIGHTDOWN;
	}

	//格式化字符串 {0}_{1}
	export function format(str:string, ...args:any[]):string
	{
		args = args || [];
		var pattern = /\{[0-9]\}+/g;
		var _match = str.match(pattern);

		try
		{
			if (!!_match && _match.length > 0)
			{
				for(let i = 0; i < _match.length; i++)
					str = str.replace(_match[i], args[i]);
			}
		}
		catch(ex)
		{
			throw new Error("format 格式错误");
		}

		return str;
	}

	//将格子坐标转换成像素坐标
	export function gridToPixel(pt:egret.Point):egret.Point
	{
		return new egret.Point(pt.x*60+30, pt.y*40+20);
	}

	//将像素坐标转换成格子坐标
	export function pixelToGrid(px:number,py:number):egret.Point
	{
		return new egret.Point(Math.floor((px-30)/60),Math.floor((py-20)/40));
	}
}