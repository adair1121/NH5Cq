var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 模块间事件管理器
 */
var ModuleEventMgr = (function () {
    function ModuleEventMgr() {
        this.eventDic = new Dictionary();
    }
    //侦听事件
    ModuleEventMgr.prototype.addModuleEventListener = function (eventType, func, eventThis) {
        var funcList = this.eventDic.getValue(eventType);
        if (!funcList) {
            funcList = new List();
            this.eventDic.add(eventType, funcList);
        }
        if (!funcList.find(function (obj) { return obj["_func"] == func && obj["_this"] == eventThis; })) {
            funcList.add({ _func: func.bind(eventThis), _this: eventThis });
        }
    };
    //触发事件
    ModuleEventMgr.prototype.triger = function (eventBase) {
        var funcList = this.eventDic.getValue(eventBase.id);
        if (!!funcList && funcList.count > 0)
            funcList.forEach(function (obj) { obj["_func"](eventBase); }, this);
    };
    //移除事件
    ModuleEventMgr.prototype.removeModuleEventListener = function (eventType, func, argThis) {
        var funcList = this.eventDic.getValue(eventType);
        if (!!funcList && funcList.count > 0)
            funcList.removeAll(function (obj) { return obj["_func"] == func && obj["_this"] == argThis; });
    };
    return ModuleEventMgr;
}());
//模块事件管理器单例
ModuleEventMgr.instance = new ModuleEventMgr();
__reflect(ModuleEventMgr.prototype, "ModuleEventMgr");
//# sourceMappingURL=ModuleEventMgr.js.map