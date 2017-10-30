var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ViewController = (function () {
    function ViewController() {
        this.viewGroupDic = new Dictionary();
        this.displayQueue = new Queue();
        var stage = egret.MainContext.instance.stage;
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
    Object.defineProperty(ViewController.prototype, "mapLayer", {
        get: function () { return this.layer_map; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewController.prototype, "unitLayer", {
        get: function () { return this.layer_unit; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewController.prototype, "effectLayer", {
        get: function () { return this.layer_effect; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewController.prototype, "uiLayer", {
        get: function () { return this.layer_ui; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewController.prototype, "tipsLayer", {
        get: function () { return this.layer_tips; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewController, "instance", {
        get: function () {
            if (!this.m_Instance)
                this.m_Instance = new ViewController();
            return this.m_Instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 添加UI界面
     * @param:{view} 界面实例
     * @param:{xx}   界面x坐标
     * @param:{yy}   界面y坐标
     * @param:{group} 界面组
     */
    ViewController.prototype.addUIView = function (view, x, y, group) {
        this.addView(this.layer_ui, view, x, y, group);
    };
    /**
     * 添加地图界面
     * @param:{view} 界面实例
     * @param:{xx}   界面x坐标
     * @param:{yy}   界面y坐标
     * @param:{group} 界面组
     */
    ViewController.prototype.addMapView = function (view, x, y, group) {
        this.addView(this.layer_map, view, x, y, group);
    };
    /**
     * 添加到单位层
     */
    ViewController.prototype.addUnitView = function (view, x, y, group) {
        this.addView(this.layer_unit, view, x, y, group);
    };
    /**
 * 添加到特效层
 */
    ViewController.prototype.addEffectView = function (view, x, y, group) {
        this.addView(this.layer_effect, view, x, y, group);
    };
    /**
     * 添加提示
     * @param:{view} 界面实例
     * @param:{xx}   界面x坐标
     * @param:{yy}   界面y坐标
     * @param:{group} 界面组
     */
    ViewController.prototype.addTipsView = function (view, x, y, group) {
        this.addView(this.layer_tips, view, x, y, group);
    };
    ViewController.prototype.addView = function (layer, view, x, y, group) {
        group = group || "default";
        var groupList = this.viewGroupDic.getValue(group);
        if (!groupList) {
            groupList = new List();
            this.viewGroupDic.add(group, groupList);
        }
        if (groupList.contains(view)) {
            //如果当前组包含界面实例---说明存在组中未存在显示列表中 需要添加到显示列表;
            if (!this.isInDisplayList(view)) {
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
    };
    /**
     * 移除相关界面
     * @param:{view} 界面实例
     * @param：{ifClearCache} 是否清除缓存
     * @param:{group} 界面组
     */
    ViewController.prototype.removeView = function (view, ifClearCache, group) {
        if (ifClearCache === void 0) { ifClearCache = true; }
        if (group === void 0) { group = "default"; }
        egret.Tween.removeTweens(view);
        var groupList = this.viewGroupDic.getValue(group);
        if (!!groupList && groupList.contains(view)) {
            if (ifClearCache) {
                groupList.removeItem(view);
                view.parent.removeChild(view);
            }
            else {
                view.visible = false;
            }
            this.delFromDisplayList(view);
        }
    };
    //移除动画组
    ViewController.prototype.removeViewGroup = function (groupName) {
        if (groupName === void 0) { groupName = "default"; }
        var groupList = this.viewGroupDic.getValue(groupName);
        if (!!groupList) {
            for (var i = groupList.count - 1; i >= 0; i--)
                this.removeView(groupList.getItem(i), true, groupName);
            groupList.clear();
            this.viewGroupDic.remove(groupName);
        }
    };
    /**
     * 获取当前界面组中元素
     */
    ViewController.prototype.getViewGroup = function (groupKey) {
        return this.viewGroupDic.getValue(groupKey);
    };
    /**
     * 获取当前显示列表元素
     */
    ViewController.prototype.getDisplayList = function () {
        return this.displayQueue;
    };
    /**
     * 查看当前元素是否存在于显示列表
     * @param:{view} 界面实例
     */
    ViewController.prototype.isInDisplayList = function (view) {
        return this.displayQueue.contains(view);
    };
    Object.defineProperty(ViewController.prototype, "displayListCount", {
        /**
         * 获取当前显示列表长度
         */
        get: function () {
            return this.displayQueue.count;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 从显示列表删除元素
     */
    ViewController.prototype.delFromDisplayList = function (view) {
        if (this.isInDisplayList(view)) {
            this.displayQueue.removeItem(view);
        }
    };
    ViewController.prototype.addToDisplayList = function (view) {
        this.displayQueue.removeItem(view);
        this.displayQueue.enQueueStart(view);
    };
    return ViewController;
}());
__reflect(ViewController.prototype, "ViewController");
//# sourceMappingURL=ViewController.js.map