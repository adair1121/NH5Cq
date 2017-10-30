var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Entity = (function () {
    function Entity(job, ownerId, instanceId, name) {
        this.job = job;
        this.ownerId = ownerId;
        this.instanceId = instanceId || (++Entity.increaseId).toString();
        this.ownerName = name;
        this.componentDic = new Dictionary();
        this.eventDic = new Dictionary();
    }
    //添加事件监听
    Entity.prototype.addEventListener = function (roleEvent, func, thisArg) {
        var eventList = this.eventDic.getValue(roleEvent);
        if (!eventList) {
            eventList = new List();
            this.eventDic.add(roleEvent, eventList);
        }
        if (!eventList.contains(func))
            eventList.add(func.bind(thisArg));
    };
    //移除事件监听
    Entity.prototype.removeEventListener = function (roleEvent, func, thisArg) {
        var eventList = this.eventDic.getValue(roleEvent);
        if (!!eventList)
            eventList.removeItem(func);
    };
    //触发事件
    Entity.prototype.trigger = function (roleEvent) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var eventList = this.eventDic.getValue(roleEvent);
        if (!eventList || eventList.count == 0)
            return;
        eventList.forEach(function (func) { func(args); });
    };
    //添加组件
    Entity.prototype.addComponent = function (newT) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var comp = new newT(this, args);
        this.componentDic.add(comp.type, comp);
        return comp;
    };
    //获取组件
    Entity.prototype.getComponent = function (type) {
        return this.componentDic.getValue(type);
    };
    //初始化所有组件
    Entity.prototype.initAllComponent = function () {
        this.componentDic.foreach(function (value) { value.init(); });
    };
    //移除所有组件
    Entity.prototype.removeAllComponent = function () {
        this.componentDic.foreach(function (value) { value.release(); });
        this.componentDic.clear();
    };
    //创建角色实体
    Entity.createRoleEntity = function (roleInfo, camp, ownerId, createSeq, name, instanceId) {
        if (createSeq === void 0) { createSeq = 255; }
        var skillIdList = new List();
        for (var i = 0; i < roleInfo.skills.length; i++)
            skillIdList.add(roleInfo.skills[i].SkillID);
        var entity = new Entity(roleInfo.job, ownerId, instanceId, name);
        entity.addComponent(RoleAnimationComponent, skillIdList, roleInfo.equips);
        entity.addComponent(BlackboardComponent, roleInfo.roleAttr);
        entity.addComponent(CharacterControllerComponent);
        entity.addComponent(FindPathComponent);
        entity.addComponent(RoleBattleComponent, skillIdList);
        entity.camp = camp;
        entity.createSeq = createSeq;
        entity.initAllComponent();
        return entity;
    };
    //创建怪物实体
    Entity.createMonsterEntity = function (monsterId, camp, ownerId, name, instanceId) {
        var unitTp = TempleMgr.select("UnitTemple", monsterId);
        var attrArr = new Array(data.RoleAttr.MAX);
        for (var i = 0; i < data.RoleAttr.MAX; i++)
            attrArr[i] = 0;
        for (var i = 0; i < unitTp.num.length; i++)
            attrArr[unitTp.num[i]] = unitTp.Value[i];
        var skillTpList = TempleMgr.selectAll("SkillTemple");
        var skillIdList = new List();
        for (var j = 0; j < unitTp.skills.length; j++) {
            if (unitTp.skills[j] == 0)
                continue;
            var skillTp = TempleMgr.getSkillTp(unitTp.skills[j], unitTp.startSkilllevel[j]);
            if (!skillTp) {
                console.log("createMonsterEntity skillTp == null group: " + unitTp.skills[j] + " level: " + unitTp.startSkilllevel[j]);
                continue;
            }
            skillIdList.add(skillTp.ID);
        }
        var entity = new Entity(JobDefine.Monster, ownerId || CampDefine.Monster, instanceId, name || unitTp.name);
        entity.addComponent(MonsterAnimationComponent, skillIdList, monsterId);
        entity.addComponent(BlackboardComponent, attrArr, monsterId);
        entity.addComponent(CharacterControllerComponent);
        entity.addComponent(FindPathComponent);
        entity.addComponent(MonsterBattleComponent, skillIdList, monsterId);
        entity.camp = camp || CampDefine.Monster;
        entity.createSeq = 255;
        entity.initAllComponent();
        return entity;
    };
    return Entity;
}());
//用于唯一ID
Entity.increaseId = 0;
__reflect(Entity.prototype, "Entity");
//# sourceMappingURL=Entity.js.map