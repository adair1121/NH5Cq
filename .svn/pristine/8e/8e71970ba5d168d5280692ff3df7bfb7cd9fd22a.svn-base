var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * UI事件管理器
 */
var UIEventMgr = (function () {
    function UIEventMgr() {
        //页面组件
        this.compDic = new Dictionary();
        //页面组件事件
        this.uiDic = new Dictionary();
    }
    /**
     * 按钮点击事件绑定
     * @param {button} 绑定按钮
     * @param {func} 回调函数
     * @param {arg} 回调作用域
     */
    UIEventMgr.prototype.addButtonClick = function (comp, func, thisArg) {
        var name = egret.getQualifiedClassName(thisArg);
        var pageComp = this.compDic.getValue(name);
        if (!pageComp) {
            pageComp = new Dictionary();
        }
        pageComp.add(comp.name, comp);
        this.compDic.add(name, pageComp);
        var list = this.uiDic.getValue(comp);
        if (!list) {
            list = new List();
        }
        list.add(func);
        this.uiDic.add(comp, list);
    };
    /**
     * 触发按钮侦听事件
     */
    UIEventMgr.prototype.triger = function (component, e, thisArg) {
        var list = this.uiDic.getValue(component);
        list.forEach(function (elem) {
            elem.call(thisArg, component, e);
        }, this);
    };
    /**
     * 移除对应按钮侦听事件
     */
    UIEventMgr.prototype.removeButtonClick = function (comp, func, thisArg) {
        var list = this.uiDic.getValue(comp);
        list.forEach(function (elem, index) {
            if (func === elem) {
                list.removeAt(index);
                return;
            }
        }, this);
    };
    return UIEventMgr;
}());
//UI事件管理器单例
UIEventMgr.instance = new UIEventMgr();
__reflect(UIEventMgr.prototype, "UIEventMgr");
//# sourceMappingURL=UIEventMgr.js.map