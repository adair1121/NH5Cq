var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 队列操作
 */
var Queue = (function () {
    function Queue() {
        this.operArr = new Array();
    }
    /**
     * 进队列
     * @param {element} 元素
     */
    Queue.prototype.enQueue = function (element) {
        this.operArr.push(element);
        return this.operArr;
    };
    /**
     * 从头部进入队列
     */
    Queue.prototype.enQueueStart = function (element) {
        this.operArr.unshift(element);
        return this.operArr;
    };
    /**
     * 从头部出队列
     * 此方法会删除源数组数据
     */
    Queue.prototype.deQueue = function () {
        if (!!this.count) {
            return this.operArr.shift();
        }
        return null;
    };
    /**
     * 从尾部出队列
     * 此方法会删除原数组数据
     */
    Queue.prototype.deQueueLast = function () {
        if (!!this.count) {
            return this.operArr.pop();
        }
        return null;
    };
    Object.defineProperty(Queue.prototype, "count", {
        /**
         * 获取队列长度
         */
        get: function () {
            return this.operArr.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 获取队列首元素
     * 不影响源数组
     */
    Queue.prototype.getPeek = function () {
        if (!!this.count) {
            return this.operArr[0];
        }
        return null;
    };
    /**队列反转 */
    Queue.prototype.queueReverse = function () {
        if (!!this.count) {
            return this.operArr.reverse();
        }
        return null;
    };
    /**队列遍历 */
    Queue.prototype.forEach = function (callBackFunc, thisArg) {
        if (!!this.count) {
            this.operArr.forEach(function (value, index) {
                callBackFunc.call(thisArg, value, index);
            });
        }
    };
    //移除多个元素
    Queue.prototype.removeRange = function (startIndex, count) {
        if (count === void 0) { count = 1; }
        if (!!this.count) {
            this.operArr.splice(startIndex, count);
        }
    };
    /**
     * 清除队列
     */
    Queue.prototype.clear = function () {
        this.operArr = [];
    };
    /**
     * 查询Queue中是否包含元素
     */
    Queue.prototype.contains = function (element) {
        if (!!this.count) {
            var index = this.operArr.indexOf(element);
            if (index === -1) {
                return false;
            }
            else {
                return true;
            }
        }
        return false;
    };
    /**
     * 清除某个item
     */
    Queue.prototype.removeItem = function (element) {
        var index = this.operArr.indexOf(element);
        if (index != -1) {
            this.operArr.splice(index, 1);
        }
    };
    return Queue;
}());
__reflect(Queue.prototype, "Queue");
//# sourceMappingURL=Queue.js.map