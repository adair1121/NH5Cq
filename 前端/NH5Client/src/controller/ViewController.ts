class ViewController
{
	private layer_unit:egret.DisplayObjectContainer;  //单位层
	private layer_map:egret.DisplayObjectContainer;   //地图层
	private layer_effect:egret.DisplayObjectContainer;//特效层
	private layer_ui:egret.DisplayObjectContainer; 	  //UI层
	private layer_tips:egret.DisplayObjectContainer;  //弹窗提示层

	private readonly viewGroupDic:Dictionary<string, List<egret.DisplayObject>>; //视图组
	private readonly displayQueue:Queue<egret.DisplayObject>; //UI显示队例

	public get mapLayer() { return this.layer_map; }
	public get unitLayer() { return this.layer_unit; }
	public get effectLayer() { return this.layer_effect; }
	public get uiLayer() { return this.layer_ui; }
	public get tipsLayer() { return this.layer_tips; }

	private static m_Instance:ViewController;
	public static get instance():ViewController
	{
		if (!this.m_Instance)
			this.m_Instance = new ViewController();

		return this.m_Instance;
	}

	public constructor()
	{
		this.viewGroupDic = new Dictionary<string, List<egret.DisplayObject>>();
		this.displayQueue = new Queue<egret.DisplayObject>();

		let stage = egret.MainContext.instance.stage;

		this.layer_map = new egret.DisplayObjectContainer();
		stage.addChild(this.layer_map);

		this.layer_ui = new egret.DisplayObjectContainer();
		stage.addChild(this.layer_ui);

		this.layer_tips = new egret.DisplayObjectContainer();
		stage.addChild(this.layer_tips);

		this.layer_unit = new egret.DisplayObjectContainer();
		stage.addChild(this.layer_unit);

		this.layer_effect = new egret.DisplayObjectContainer();
		stage.addChild(this.layer_effect);
	}
	/**
	 * 添加UI界面
	 * @param:{view} 界面实例
	 * @param:{xx}   界面x坐标
	 * @param:{yy}   界面y坐标
	 * @param:{group} 界面组
	 */
	public addUIView(view:egret.DisplayObject, x?:number, y?:number, group?:string):void
	{
		this.addView(this.layer_ui, view, x, y, group);
	}
	/**
	 * 添加地图界面
	 * @param:{view} 界面实例
	 * @param:{xx}   界面x坐标
	 * @param:{yy}   界面y坐标
	 * @param:{group} 界面组
	 */
	public addMapView(view:egret.DisplayObject, x?:number, y?:number, group?:string):void
	{
		this.addView(this.layer_map, view, x, y, group);
	}
	/**
	 * 添加到单位层
	 */
	public addUnitView(view:egret.DisplayObject, x?:number, y?:number, group?:string):void
	{
		this.addView(this.layer_unit, view, x, y, group);
	}
		/**
	 * 添加到特效层
	 */
	public addEffectView(view:egret.DisplayObject, x?:number, y?:number, group?:string):void
	{
		this.addView(this.layer_effect, view, x, y, group);
	}
	/**
	 * 添加提示
	 * @param:{view} 界面实例
	 * @param:{xx}   界面x坐标
	 * @param:{yy}   界面y坐标
	 * @param:{group} 界面组
	 */
	public addTipsView(view:egret.DisplayObject, x?:number, y?:number, group?:string):void
	{
		this.addView(this.layer_tips, view, x, y, group);
	}

	private addView(layer:egret.DisplayObjectContainer, view:egret.DisplayObject, x?:number, y?:number, group?:string):void
	{
		group = group || "default";
		var groupList = this.viewGroupDic.getValue(group);
		if (!groupList)
		{
			groupList = new List<egret.DisplayObject>();
			this.viewGroupDic.add(group, groupList);
		}

		if(groupList.contains(view))
		{
			//如果当前组包含界面实例---说明存在组中未存在显示列表中 需要添加到显示列表;
			if(!this.isInDisplayList(view))
			{
				view.visible = true;
				this.addToDisplayList(view);
			}

			return;
		}

		//当前界面组未包含界面实例
		view.x = x || 0;
		view.y = y || 0;

		layer.addChild(view);
		this.addToDisplayList(view);
		groupList.add(view);
	}
	/**
	 * 移除相关界面
	 * @param:{view} 界面实例
	 * @param：{ifClearCache} 是否清除缓存
	 * @param:{group} 界面组
	 */
	public removeView(view:egret.DisplayObject,ifClearCache:boolean = true,group:string = "default"):void
	{
		egret.Tween.removeTweens(view);
		
		var groupList = this.viewGroupDic.getValue(group);
		if(!!groupList && groupList.contains(view))
		{
			if(ifClearCache)
			{
				groupList.removeItem(view);
				view.parent.removeChild(view);
			}
			else
			{
				view.visible = false;
			}

			this.delFromDisplayList(view);
		}
	}

	//移除动画组
	public removeViewGroup(groupName:string = "default"):void
	{
		var groupList = this.viewGroupDic.getValue(groupName);
		if (!!groupList)
		{
			for(let i = groupList.count - 1; i >= 0; i--)
				this.removeView(groupList.getItem(i), true, groupName);

			groupList.clear();
			this.viewGroupDic.remove(groupName);
		}
	}

	/**
	 * 获取当前界面组中元素
	 */
	public getViewGroup(groupKey:string):List<egret.DisplayObject>{
		return this.viewGroupDic.getValue(groupKey);
	}
	/**
	 * 获取当前显示列表元素
	 */
	public getDisplayList():Queue<egret.DisplayObject>{
		return this.displayQueue;
	}
	/**
	 * 查看当前元素是否存在于显示列表
	 * @param:{view} 界面实例
	 */
	public isInDisplayList(view:egret.DisplayObject):boolean{
		return this.displayQueue.contains(view);
	}
	/**
	 * 获取当前显示列表长度
	 */
	public get displayListCount():number{
		return this.displayQueue.count;
	}
	/**
	 * 从显示列表删除元素
	 */
	private delFromDisplayList(view:egret.DisplayObject):void{
		if(this.isInDisplayList(view)){
			this.displayQueue.removeItem(view);
		}
	}
	private addToDisplayList(view:egret.DisplayObject):void{
		this.displayQueue.removeItem(view);
		this.displayQueue.enQueueStart(view);
	}
}