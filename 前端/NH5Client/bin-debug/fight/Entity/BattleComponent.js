var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//战斗组件
var BattleComponent = (function (_super) {
    __extends(BattleComponent, _super);
    //构造
    function BattleComponent(owner) {
        var _this = _super.call(this, owner) || this;
        _this.fsm = new FSM(owner);
        return _this;
    }
    Object.defineProperty(BattleComponent.prototype, "type", {
        //组件类型
        get: function () { return ComponentType.Battle; },
        enumerable: true,
        configurable: true
    });
    //初始化组件
    BattleComponent.prototype.init = function () {
        this.owner.addEventListener(RoleEventDefine.ChangeState, this.RoleChangeState, this);
        this.owner.addEventListener(RoleEventDefine.ChangeToPreState, this.RoleChangeToPreState, this);
        this.buffList = new List();
        var argArr = new Array();
        argArr.push(FSMState.Idle);
        this.RoleChangeState(argArr);
    };
    //释放组件
    BattleComponent.prototype.release = function () {
        this.owner.removeEventListener(RoleEventDefine.ChangeState, this.RoleChangeState, this);
        this.owner.removeEventListener(RoleEventDefine.ChangeToPreState, this.RoleChangeToPreState, this);
        this.buffList.clear();
        this.buffList = null;
    };
    //更新
    BattleComponent.prototype.Update = function (deltaTime) {
        if (!this.isStartFight)
            return;
        if (!!this.fsm)
            this.fsm.Update(deltaTime);
    };
    //角色状态改变 [0]:改变成哪个状态 [1]:参数
    BattleComponent.prototype.RoleChangeState = function (args) {
        if (!args || args.length < 1)
            return;
        var state = args.shift();
        if (!!this.fsm.switchTo(state, args))
            this.owner.currState = state;
    };
    //角色切换到上一个状态 [0]:参数
    BattleComponent.prototype.RoleChangeToPreState = function (args) {
        if (!!this.fsm.switchToPreState(args))
            this.owner.currState = this.fsm.state;
    };
    //添加Buff 添加时必须做深拷贝
    BattleComponent.prototype.addBuff = function (buff) {
        var objRet = { isAddSuccess: false, removeBuffList: new List() };
        if (buff.buffTp.DeleteType == BuffDelType.NeverDestroy) {
            this.buffList.add(BuffBase.createBuffByTp(buff.caster, buff.buffTp, buff.ownerSkillId).addBuff(this.owner));
            objRet.isAddSuccess = true;
            return objRet;
        }
        //如果buffer存在, 并且新buffer等级>=原有buffer等级，将进行替换
        var findBuff = this.buffList.find(function (x) { return x.type == buff.type && x.buffTp.DeleteType != BuffDelType.NeverDestroy; });
        if (!!findBuff) {
            if (buff.buffTp.Lev >= findBuff.buffTp.Lev) {
                this.removeBuff(findBuff);
                objRet.removeBuffList.add(findBuff.buffTp.ID);
                objRet.isAddSuccess = true;
                this.buffList.add(BuffBase.createBuffByTp(buff.caster, buff.buffTp, buff.ownerSkillId).addBuff(this.owner));
            }
            return objRet;
        }
        //如果出现比添加Buffer更高优先级的，将不添加，0最大
        findBuff = this.buffList.find(function (x) { return x.buffTp.BuffPriority < buff.buffTp.BuffPriority && x.buffTp.DeleteType != BuffDelType.NeverDestroy; });
        if (!!findBuff)
            return objRet;
        //如果buff不存在，将判定buffer优先级，优先级大的替换小的, 移除准则等于所有或相应状态时，将被移除
        this.buffList.removeAll(function (buffBase) {
            if (buffBase.buffTp.DeleteType == BuffDelType.NeverDestroy)
                return false;
            if (buffBase.buffTp.BuffPriority > buff.buffTp.BuffPriority &&
                (buffBase.buffTp.BufferState == buff.buffTp.RemoveRule || buff.buffTp.RemoveRule == BufferRemoveRule.All)) {
                buffBase.removeBuff();
                objRet.removeBuffList.add(buffBase.buffTp.ID);
                return true;
            }
            return false;
        }, this);
        this.buffList.add(BuffBase.createBuffByTp(buff.caster, buff.buffTp, buff.ownerSkillId).addBuff(this.owner));
        objRet.isAddSuccess = true;
        return objRet;
    };
    //移除Buff
    BattleComponent.prototype.removeBuff = function (buff) {
        this.buffList.removeItem(buff.removeBuff());
    };
    return BattleComponent;
}(ComponentBase));
__reflect(BattleComponent.prototype, "BattleComponent");
//# sourceMappingURL=BattleComponent.js.map