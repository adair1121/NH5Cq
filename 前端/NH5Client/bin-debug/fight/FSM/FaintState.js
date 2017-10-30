var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//眩晕状态
var FaintState = (function (_super) {
    __extends(FaintState, _super);
    function FaintState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(FaintState.prototype, "state", {
        //状态
        get: function () { return FSMState.Faint; },
        enumerable: true,
        configurable: true
    });
    //进入状态
    FaintState.prototype.OnEnter = function (args) { };
    //执行状态
    //public OnExcuter(deltaTime:number):void {}
    //离开状态
    FaintState.prototype.OnLeave = function () { };
    return FaintState;
}(StateBase));
__reflect(FaintState.prototype, "FaintState");
//# sourceMappingURL=FaintState.js.map