var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FSMState;
(function (FSMState) {
    FSMState[FSMState["Idle"] = 0] = "Idle";
    FSMState[FSMState["Move"] = 1] = "Move";
    FSMState[FSMState["Attack"] = 2] = "Attack";
    FSMState[FSMState["Dead"] = 3] = "Dead";
    FSMState[FSMState["Faint"] = 4] = "Faint";
    FSMState[FSMState["Hit"] = 5] = "Hit";
})(FSMState || (FSMState = {}));
var ComponentType;
(function (ComponentType) {
    ComponentType[ComponentType["Blackboard"] = 0] = "Blackboard";
    ComponentType[ComponentType["Animator"] = 1] = "Animator";
    ComponentType[ComponentType["CharacterController"] = 2] = "CharacterController";
    ComponentType[ComponentType["FindPath"] = 3] = "FindPath";
    ComponentType[ComponentType["Battle"] = 4] = "Battle";
})(ComponentType || (ComponentType = {}));
var SkillType;
(function (SkillType) {
    SkillType[SkillType["Single"] = 1] = "Single";
    SkillType[SkillType["Range"] = 2] = "Range";
    SkillType[SkillType["Summon"] = 3] = "Summon";
    SkillType[SkillType["Hit"] = 4] = "Hit";
    SkillType[SkillType["CircleHit"] = 5] = "CircleHit";
})(SkillType || (SkillType = {}));
var SkillTarget;
(function (SkillTarget) {
    SkillTarget[SkillTarget["Self"] = 0] = "Self";
    SkillTarget[SkillTarget["Enemy"] = 1] = "Enemy";
})(SkillTarget || (SkillTarget = {}));
var SkillEffect;
(function (SkillEffect) {
    SkillEffect[SkillEffect["AdditionalBuff"] = 1] = "AdditionalBuff";
    SkillEffect[SkillEffect["HitMove"] = 2] = "HitMove";
    SkillEffect[SkillEffect["Summon"] = 3] = "Summon";
    SkillEffect[SkillEffect["AdditionalBuffToSkill"] = 4] = "AdditionalBuffToSkill";
})(SkillEffect || (SkillEffect = {}));
var SkillShape;
(function (SkillShape) {
    SkillShape[SkillShape["Line"] = 0] = "Line";
    SkillShape[SkillShape["Circle"] = 1] = "Circle";
    SkillShape[SkillShape["Sector"] = 2] = "Sector";
})(SkillShape || (SkillShape = {}));
var BuffType;
(function (BuffType) {
    BuffType[BuffType["BaseProperty"] = 1] = "BaseProperty";
    BuffType[BuffType["Protect"] = 2] = "Protect";
    BuffType[BuffType["DamageTreat"] = 3] = "DamageTreat";
    BuffType[BuffType["HitBack"] = 4] = "HitBack";
    BuffType[BuffType["Faint"] = 5] = "Faint";
    BuffType[BuffType["AdditionalSkillDamage"] = 6] = "AdditionalSkillDamage";
    BuffType[BuffType["IgnoreDefPercent"] = 7] = "IgnoreDefPercent";
    BuffType[BuffType["BaseBattleProperty"] = 8] = "BaseBattleProperty";
})(BuffType || (BuffType = {}));
var BuffDelType;
(function (BuffDelType) {
    BuffDelType[BuffDelType["TimeEnd"] = 0] = "TimeEnd";
    BuffDelType[BuffDelType["Dead"] = 1] = "Dead";
    BuffDelType[BuffDelType["BattleEnd"] = 2] = "BattleEnd";
    BuffDelType[BuffDelType["NeverDestroy"] = 3] = "NeverDestroy";
})(BuffDelType || (BuffDelType = {}));
var BuffTarget;
(function (BuffTarget) {
    BuffTarget[BuffTarget["Self"] = 0] = "Self";
    BuffTarget[BuffTarget["Enemy"] = 1] = "Enemy";
})(BuffTarget || (BuffTarget = {}));
var BufferRemoveRule;
(function (BufferRemoveRule) {
    BufferRemoveRule[BufferRemoveRule["All"] = 0] = "All";
    BufferRemoveRule[BufferRemoveRule["Increase"] = 1] = "Increase";
    BufferRemoveRule[BufferRemoveRule["Reduce"] = 2] = "Reduce";
})(BufferRemoveRule || (BufferRemoveRule = {}));
var SkillArgDefine;
(function (SkillArgDefine) {
    SkillArgDefine[SkillArgDefine["Atk"] = 0] = "Atk";
    SkillArgDefine[SkillArgDefine["Def"] = 1] = "Def";
    SkillArgDefine[SkillArgDefine["AtkRate"] = 2] = "AtkRate";
    SkillArgDefine[SkillArgDefine["AtkValue"] = 3] = "AtkValue";
    SkillArgDefine[SkillArgDefine["DamageRate"] = 4] = "DamageRate";
    SkillArgDefine[SkillArgDefine["Max"] = 5] = "Max";
})(SkillArgDefine || (SkillArgDefine = {}));
var AtkType;
(function (AtkType) {
    AtkType[AtkType["Atk"] = 1] = "Atk";
    AtkType[AtkType["MAtk"] = 2] = "MAtk";
})(AtkType || (AtkType = {}));
var RoleEventDefine;
(function (RoleEventDefine) {
    RoleEventDefine[RoleEventDefine["ChangeState"] = 0] = "ChangeState";
    RoleEventDefine[RoleEventDefine["ChangeToPreState"] = 1] = "ChangeToPreState";
    RoleEventDefine[RoleEventDefine["TriggerFight"] = 2] = "TriggerFight";
    RoleEventDefine[RoleEventDefine["SkillUpgrade"] = 3] = "SkillUpgrade";
    RoleEventDefine[RoleEventDefine["PlayAnimation"] = 4] = "PlayAnimation";
    RoleEventDefine[RoleEventDefine["PlayAtkAnimation"] = 5] = "PlayAtkAnimation";
    RoleEventDefine[RoleEventDefine["DamageInfo"] = 6] = "DamageInfo";
})(RoleEventDefine || (RoleEventDefine = {}));
var RoleState;
(function (RoleState) {
    RoleState[RoleState["Normal"] = 0] = "Normal";
    RoleState[RoleState["Faint"] = 1] = "Faint";
})(RoleState || (RoleState = {}));
var JobDefine;
(function (JobDefine) {
    JobDefine[JobDefine["Player"] = 0] = "Player";
    JobDefine[JobDefine["ZS"] = 1] = "ZS";
    JobDefine[JobDefine["FS"] = 2] = "FS";
    JobDefine[JobDefine["DS"] = 3] = "DS";
    JobDefine[JobDefine["Monster"] = 4] = "Monster";
})(JobDefine || (JobDefine = {}));
var ConstDefine;
(function (ConstDefine) {
    ConstDefine[ConstDefine["IntMaxValue"] = 2147483647] = "IntMaxValue";
})(ConstDefine || (ConstDefine = {}));
var SkillClipDefine;
(function (SkillClipDefine) {
    SkillClipDefine[SkillClipDefine["SkillRes"] = 0] = "SkillRes";
    SkillClipDefine[SkillClipDefine["FlyRes"] = 1] = "FlyRes";
    SkillClipDefine[SkillClipDefine["RockRes"] = 2] = "RockRes";
    SkillClipDefine[SkillClipDefine["Max"] = 3] = "Max";
})(SkillClipDefine || (SkillClipDefine = {}));
var GlobalDefine;
(function (GlobalDefine) {
    GlobalDefine[GlobalDefine["RefreshX"] = 10901008] = "RefreshX";
    GlobalDefine[GlobalDefine["RefreshY"] = 10901009] = "RefreshY";
})(GlobalDefine || (GlobalDefine = {}));
var FightResult;
(function (FightResult) {
    FightResult[FightResult["Err"] = 0] = "Err";
    FightResult[FightResult["Win"] = 1] = "Win";
    FightResult[FightResult["Lose"] = 2] = "Lose";
})(FightResult || (FightResult = {}));
var CampDefine = (function () {
    function CampDefine() {
    }
    return CampDefine;
}());
CampDefine.Player = "player"; //玩家阵营
CampDefine.Monster = "monster"; //怪物阵营
__reflect(CampDefine.prototype, "CampDefine");
var ShowClipDefine;
(function (ShowClipDefine) {
    ShowClipDefine[ShowClipDefine["Idle"] = 0] = "Idle";
    ShowClipDefine[ShowClipDefine["Move"] = 1] = "Move";
    ShowClipDefine[ShowClipDefine["Attack"] = 2] = "Attack";
    ShowClipDefine[ShowClipDefine["Cast"] = 3] = "Cast";
})(ShowClipDefine || (ShowClipDefine = {}));
//# sourceMappingURL=FightDefine.js.map