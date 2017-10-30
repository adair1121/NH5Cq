var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FSM = (function () {
    function FSM(owner) {
        //所有状态
        this.stateDic = new Dictionary();
        this.stateDic.add(FSMState.Idle, new IdleState(owner, this));
        this.stateDic.add(FSMState.Move, new MoveState(owner, this));
        this.stateDic.add(FSMState.Attack, new AttackState(owner, this));
        this.stateDic.add(FSMState.Dead, new DeadState(owner, this));
        this.stateDic.add(FSMState.Faint, new FaintState(owner, this));
        this.owner = owner;
        this.currState = this.stateDic.getValue(FSMState.Idle);
    }
    Object.defineProperty(FSM.prototype, "preFSMState", {
        get: function () { return this.preState; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FSM.prototype, "state", {
        //获取当前状态
        get: function () { return this.currState.state; },
        enumerable: true,
        configurable: true
    });
    //更新状态机
    FSM.prototype.Update = function (deltaTime) {
        if (!!this.currState)
            this.currState.OnExcuter(deltaTime);
    };
    //切换状态
    FSM.prototype.switchTo = function (state, args) {
        var changeState = this.stateDic.getValue(state);
        if (!!changeState) {
            this.preState = this.currState;
            this.currState.OnLeave();
            this.currState = changeState;
            this.currState.OnEnter(args);
            return this.currState;
        }
        console.log("FSM switch state " + state.toString() + " do not existed!");
        return null;
    };
    //切换到上一个状态
    FSM.prototype.switchToPreState = function (args) {
        if (!!this.preState) {
            this.currState = this.preState;
            return this.currState;
        }
        return null;
    };
    return FSM;
}());
__reflect(FSM.prototype, "FSM");
//# sourceMappingURL=FSM.js.map