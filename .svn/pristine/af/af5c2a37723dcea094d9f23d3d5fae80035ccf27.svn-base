var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventBase = (function () {
    function EventBase() {
    }
    return EventBase;
}());
__reflect(EventBase.prototype, "EventBase");
var ModuleEvent;
(function (ModuleEvent) {
    ModuleEvent[ModuleEvent["RoleMove"] = 0] = "RoleMove";
    ModuleEvent[ModuleEvent["HpTips"] = 1] = "HpTips";
    ModuleEvent[ModuleEvent["DamageInfo"] = 2] = "DamageInfo";
    ModuleEvent[ModuleEvent["CreateEntity"] = 3] = "CreateEntity";
    ModuleEvent[ModuleEvent["RemoveEntity"] = 4] = "RemoveEntity";
    ModuleEvent[ModuleEvent["PlayState"] = 5] = "PlayState";
    ModuleEvent[ModuleEvent["PlayAtkState"] = 6] = "PlayAtkState";
})(ModuleEvent || (ModuleEvent = {}));
//在事件定义中，字段必须使用readonly，避免外面可修改
var RoleMoveEvent = (function (_super) {
    __extends(RoleMoveEvent, _super);
    function RoleMoveEvent(who, from, to, moveTime) {
        var _this = _super.call(this) || this;
        _this.who = who;
        _this.ptFrom = from;
        _this.ptTo = to;
        _this.moveTime = moveTime;
        return _this;
    }
    Object.defineProperty(RoleMoveEvent.prototype, "id", {
        get: function () { return ModuleEvent.RoleMove; },
        enumerable: true,
        configurable: true
    });
    return RoleMoveEvent;
}(EventBase));
__reflect(RoleMoveEvent.prototype, "RoleMoveEvent");
//Buff +/-血时调用
var HpTipsEvent = (function (_super) {
    __extends(HpTipsEvent, _super);
    function HpTipsEvent(who, value) {
        var _this = _super.call(this) || this;
        _this.who = who;
        _this.value = value;
        return _this;
    }
    Object.defineProperty(HpTipsEvent.prototype, "id", {
        get: function () { return ModuleEvent.HpTips; },
        enumerable: true,
        configurable: true
    });
    return HpTipsEvent;
}(EventBase));
__reflect(HpTipsEvent.prototype, "HpTipsEvent");
//技能伤害时调用
var DamageInfoEvent = (function (_super) {
    __extends(DamageInfoEvent, _super);
    function DamageInfoEvent(who, damageValue, addBuffIdList, removeBuffIdList, isDead) {
        var _this = _super.call(this) || this;
        _this.who = who;
        _this.damageValue = damageValue;
        _this.addBuffIdList = addBuffIdList;
        _this.removeBuffIdList = removeBuffIdList;
        _this.isDead = isDead;
        return _this;
    }
    Object.defineProperty(DamageInfoEvent.prototype, "id", {
        get: function () { return ModuleEvent.DamageInfo; },
        enumerable: true,
        configurable: true
    });
    return DamageInfoEvent;
}(EventBase));
__reflect(DamageInfoEvent.prototype, "DamageInfoEvent");
//创建角色实体
var CreateEntityEvent = (function (_super) {
    __extends(CreateEntityEvent, _super);
    function CreateEntityEvent(who, pos) {
        var _this = _super.call(this) || this;
        _this.who = who;
        _this.pos = pos;
        return _this;
    }
    Object.defineProperty(CreateEntityEvent.prototype, "id", {
        get: function () { return ModuleEvent.CreateEntity; },
        enumerable: true,
        configurable: true
    });
    return CreateEntityEvent;
}(EventBase));
__reflect(CreateEntityEvent.prototype, "CreateEntityEvent");
//移除角色实体
var RemoveEntityEvent = (function (_super) {
    __extends(RemoveEntityEvent, _super);
    function RemoveEntityEvent(who) {
        var _this = _super.call(this) || this;
        _this.who = who;
        return _this;
    }
    Object.defineProperty(RemoveEntityEvent.prototype, "id", {
        get: function () { return ModuleEvent.RemoveEntity; },
        enumerable: true,
        configurable: true
    });
    return RemoveEntityEvent;
}(EventBase));
__reflect(RemoveEntityEvent.prototype, "RemoveEntityEvent");
//播放通用状态
var PlayStateEvent = (function (_super) {
    __extends(PlayStateEvent, _super);
    function PlayStateEvent(who, roleClipList) {
        var _this = _super.call(this) || this;
        _this.who = who;
        _this.roleClipList = roleClipList;
        return _this;
    }
    Object.defineProperty(PlayStateEvent.prototype, "id", {
        get: function () { return ModuleEvent.PlayState; },
        enumerable: true,
        configurable: true
    });
    return PlayStateEvent;
}(EventBase));
__reflect(PlayStateEvent.prototype, "PlayStateEvent");
//播放攻击状态
var PlayAtkStateEvent = (function (_super) {
    __extends(PlayAtkStateEvent, _super);
    function PlayAtkStateEvent(who, target, skillTp, direction, skillClip, flyClip, roleClipList, roleIdleClipList) {
        var _this = _super.call(this) || this;
        _this.who = who;
        _this.target = target;
        _this.skillTp = skillTp;
        _this.direction = direction;
        _this.skillClip = skillClip;
        _this.flyClip = flyClip;
        _this.roleClipList = roleClipList;
        _this.roleIdleClipList = roleIdleClipList;
        return _this;
    }
    Object.defineProperty(PlayAtkStateEvent.prototype, "id", {
        get: function () { return ModuleEvent.PlayAtkState; },
        enumerable: true,
        configurable: true
    });
    return PlayAtkStateEvent;
}(EventBase));
__reflect(PlayAtkStateEvent.prototype, "PlayAtkStateEvent");
//# sourceMappingURL=ModuleEventDefine.js.map