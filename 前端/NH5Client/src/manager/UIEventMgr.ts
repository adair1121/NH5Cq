/**
 * UI事件管理器
 */
class UIEventMgr {
	//UI事件管理器单例
	public static readonly instance:UIEventMgr = new UIEventMgr();
	//页面组件
	private readonly compDic:Dictionary<string,Dictionary<string,eui.Component>> = new Dictionary<string,Dictionary<string,eui.Component>>();
	//页面组件事件
	private readonly uiDic:Dictionary<eui.Component,List<(comp:eui.Component,e: egret.TouchEvent) => void>> = new Dictionary<eui.Component,List<(comp:eui.Component,e: egret.TouchEvent)=>void>>();
	public constructor() {
		
	}
	/**
	 * 按钮点击事件绑定
	 * @param {button} 绑定按钮
	 * @param {func} 回调函数
	 * @param {arg} 回调作用域
	 */
	public addButtonClick(comp:eui.Component,func?:(comp:eui.Component,e: egret.TouchEvent)=>void,thisArg?:any):void{
		var name:string = egret.getQualifiedClassName(thisArg)
		var pageComp:Dictionary<string,eui.Component> = this.compDic.getValue(name);
		if(!pageComp){
			pageComp = new Dictionary<string,eui.Component>();
		}
		pageComp.add(comp.name,comp);
		this.compDic.add(name,pageComp);
		var list:List<(comp:eui.Component,e: egret.TouchEvent) => void> = this.uiDic.getValue(comp);
		if(!list){
			list = new List<(comp:eui.Component,e: egret.TouchEvent) => void>();
		}
		list.add(func);
		this.uiDic.add(comp,list);
	}	
	/**
	 * 触发按钮侦听事件
	 */
	public triger(component:eui.Component,e:egret.TouchEvent,thisArg?:any):void{
		var list:List<(comp:eui.Component,e:egret.TouchEvent) => void> = this.uiDic.getValue(component);
		list.forEach((elem:(comp:eui.Component,e: egret.TouchEvent) => void)=>{
			elem.call(thisArg,component,e);
		},this)
	}
	/**
	 * 移除对应按钮侦听事件
	 */
	public removeButtonClick(comp:eui.Component,func?:(comp:eui.Component,e: egret.TouchEvent)=>void,thisArg?:any):void{
		var list:List<(comp:eui.Component,e:egret.TouchEvent) => void> = this.uiDic.getValue(comp);
		list.forEach((elem:(comp:eui.Component,e: egret.TouchEvent) => void,index:number)=>{
			if(func === elem){
				list.removeAt(index);
				return;
			}
		},this)
	}
}