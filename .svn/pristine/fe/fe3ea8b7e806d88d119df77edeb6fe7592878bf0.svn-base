/**
 * 队列操作
 */
class Queue<T>{
	private operArr:Array<T>;
	public constructor() {
		this.operArr = new Array<T>();
	}
	/**
	 * 进队列
	 * @param {element} 元素
	 */
	public enQueue(element:T):Array<T>{
		this.operArr.push(element);
		return this.operArr;
	}
	/**
	 * 从头部进入队列
	 */
	public enQueueStart(element:T):Array<T>{
		this.operArr.unshift(element);
		return this.operArr;
	}
	/**
	 * 从头部出队列
	 * 此方法会删除源数组数据
	 */
	public deQueue():T{
		if(!!this.count){
			return this.operArr.shift();
		}
		return null;
	}
	/**
	 * 从尾部出队列
	 * 此方法会删除原数组数据
	 */
	public deQueueLast():T{
		if(!!this.count){
			return this.operArr.pop();
		}
		return null;
	}
	/**
	 * 获取队列长度
	 */
	public get count():number{
		return this.operArr.length;
	}
	/**
	 * 获取队列首元素
	 * 不影响源数组
	 */
	public getPeek():T{
		if(!!this.count){
			return this.operArr[0];
		}
		return null;
	}
	/**队列反转 */
	public queueReverse():Array<T>{
		if(!!this.count){
			return this.operArr.reverse();
		}
		return null;
	}
	/**队列遍历 */
	public forEach(callBackFunc:(value: T, index?: number)=>void,thisArg?:any):void{
		if(!!this.count){
			this.operArr.forEach((value:T,index:number)=>{
				callBackFunc.call(thisArg,value,index);
			})
		}
	}
	//移除多个元素
	public removeRange(startIndex:number, count:number = 1):void
	{
		if(!!this.count){
			this.operArr.splice(startIndex, count);
		}
	}

	/**
	 * 清除队列
	 */
	public clear():void{
		this.operArr = [];
	}
	/**
	 * 查询Queue中是否包含元素
	 */
	public contains(element:T):boolean{
		if(!!this.count){
			var index:number = this.operArr.indexOf(element);
			if(index === -1){
				return false;
			}else{
				return true;
			}
		}
		return false;
	}
	/**
	 * 清除某个item
	 */
	public removeItem(element:T):void{
		var index:number = this.operArr.indexOf(element);
		if(index != -1){
			this.operArr.splice(index,1);
		}
	}
}