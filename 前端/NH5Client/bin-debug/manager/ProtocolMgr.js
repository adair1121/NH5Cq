var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 协议管理器
 */
var ProtocolMgr = (function () {
    function ProtocolMgr() {
        this.proDic = new Dictionary();
    }
    /**
     * 协议触发
     * @:param {type} 协议字段
     * @:param {mess} 返回数据
     */
    ProtocolMgr.prototype.trigger = function (type, mess) {
        var arr = this.proDic.getValue(type);
        if (!!arr && arr.length > 0) {
            for (var i = 0; i < arr.length; i++) {
                arr[i]["_func"].call(arr[i]["_this"], mess);
            }
        }
    };
    /**
     * 注册协议
     * @:param {type} 协议字段
     * @:param {func} 回调函数
     * @:param {arg}  回调作用域
     */
    ProtocolMgr.prototype.addProListener = function (type, func, FuncThis) {
        var self = this;
        var funArr = self.proDic.getValue(type);
        if (!!funArr) {
            funArr.push({ _this: FuncThis, _func: func });
            return;
        }
        self.proDic.add(type, [{ _this: FuncThis, _func: func }]);
    };
    /**
     * 移除协议侦听
     */
    ProtocolMgr.prototype.removeProListener = function (type) {
        var self = this;
        self.proDic.remove(type);
    };
    return ProtocolMgr;
}());
//协议管理器单例
ProtocolMgr.instance = new ProtocolMgr();
__reflect(ProtocolMgr.prototype, "ProtocolMgr");
//# sourceMappingURL=ProtocolMgr.js.map