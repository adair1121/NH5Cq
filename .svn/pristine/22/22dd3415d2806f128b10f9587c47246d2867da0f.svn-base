var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//黑板组件
var BlackboardComponent = (function (_super) {
    __extends(BlackboardComponent, _super);
    //构造 [0]:属性数组
    function BlackboardComponent(owner, args) {
        var _this = _super.call(this, owner) || this;
        _this.attributeArr = args[0];
        return _this;
    }
    Object.defineProperty(BlackboardComponent.prototype, "type", {
        //组件类型
        get: function () { return ComponentType.Blackboard; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlackboardComponent.prototype, "attrArr", {
        //获取属性数组
        get: function () { return this.attributeArr; },
        enumerable: true,
        configurable: true
    });
    //初始化组件
    BlackboardComponent.prototype.init = function () { };
    //释放组件
    BlackboardComponent.prototype.release = function () { };
    //修改属性值 应传入变化量 返回改变后的结果
    BlackboardComponent.prototype.modifyAttrValue = function (attrId, changeValue) {
        if (attrId < 0 || attrId >= this.attributeArr.length) {
            console.log("BlackboardComponent modifyAttrValue attrId: " + attrId);
            return;
        }
        var value = this.attributeArr[attrId] + changeValue;
        this.attributeArr[attrId] = value;
        return value;
    };
    //获取属性值
    BlackboardComponent.prototype.getAttrValue = function (attrId) {
        if (attrId < 0 || attrId >= this.attributeArr.length)
            return 0;
        return this.attributeArr[attrId];
    };
    //设置属性值
    BlackboardComponent.prototype.setAttrValue = function (attrId, value) {
        if (attrId < 0 || attrId >= this.attributeArr.length)
            return;
        this.attributeArr[attrId] = value;
    };
    //设置角色位置
    BlackboardComponent.prototype.setPosition = function (pt) {
        this.setAttrValue(data.RoleAttr.x, pt.x);
        this.setAttrValue(data.RoleAttr.y, pt.y);
    };
    //获得位置
    BlackboardComponent.prototype.getPosition = function () {
        return new egret.Point(this.getAttrValue(data.RoleAttr.x), this.getAttrValue(data.RoleAttr.y));
    };
    return BlackboardComponent;
}(ComponentBase));
__reflect(BlackboardComponent.prototype, "BlackboardComponent");
//# sourceMappingURL=BlackboardComponent.js.map