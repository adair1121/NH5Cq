class PosUtils {
	public constructor() {
	}

	/**
	 * 网格坐标转像素坐标
	 * @param gx x坐标
	 * @param gy y坐标
	 * @return egret.point 实际像素点
	 */
	public static gridToPixel(gx:number,gy:number):egret.Point{
		return new egret.Point(gx*60+30,gy*40+20);
	}
	/**
	 * 像素坐标转网格坐标
	 * @param px x坐标
	 * @param py y坐标
	 * @return egret.point 网格坐标点
	 */
	public static pixelToGrid(px:number,py:number):egret.Point{
		return new egret.Point(Math.ceil((px-30)/60),Math.ceil((py-20)/40));
	}

	/**
	 * 网格坐标转地图格子
	 * @param gx x坐标
	 * @param gy y坐标
	 * @return egret.point 地图格子点
	 */
	public static gridToMapGrid(gx:number,gy:number):egret.Point{
		var p:egret.Point=PosUtils.gridToPixel(gx,gy);
		var mx:number=Math.ceil(p.y/256);
		var my:number=Math.ceil(p.x/256);
		return new egret.Point(mx,my);
	}
}