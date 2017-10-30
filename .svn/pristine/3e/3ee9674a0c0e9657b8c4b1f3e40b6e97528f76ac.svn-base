var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EntityMgr = (function () {
    function EntityMgr() {
        this.entityInstIdDic = new Dictionary();
        this.entityGroupDic = new Dictionary();
    }
    //添加实体到相应组
    EntityMgr.prototype.addEntity = function (entity) {
        var entityDic = this.entityGroupDic.getValue(entity.camp);
        if (!entityDic) {
            entityDic = new Dictionary();
            this.entityGroupDic.add(entity.camp, entityDic);
        }
        var entityList = entityDic.getValue(entity.ownerId);
        if (!entityList) {
            entityList = new List();
            entityDic.add(entity.ownerId, entityList);
        }
        entityList.add(entity);
        this.entityInstIdDic.add(entity.instanceId, entity);
    };
    //移除实体
    EntityMgr.prototype.removeEntity = function (entity) {
        this.entityInstIdDic.remove(entity.instanceId);
        var entityDic = this.entityGroupDic.getValue(entity.camp);
        if (!entityDic)
            return;
        var entityList = entityDic.getValue(entity.ownerId);
        if (!!entityList)
            entityList.removeItem(entity);
        if (!entityList || entityList.count == 0) {
            entityDic.remove(entity.ownerId);
            this.entityGroupDic.remove(entity.camp);
        }
    };
    //获取相应组下相应玩家的所有实体
    EntityMgr.prototype.getEntityList = function (group, owner) {
        var entityDic = this.entityGroupDic.getValue(group);
        if (!!entityDic)
            return entityDic.getValue(owner);
        return null;
    };
    //获取相应组下的所有实体
    EntityMgr.prototype.getGroupEnityList = function (group) {
        var entityList = new List();
        var entityDic = this.entityGroupDic.getValue(group);
        if (!!entityDic && entityDic.count > 0) {
            entityDic.foreach(function (list) { entityList.addListRange(list); });
        }
        return entityList;
    };
    //获取除本阵营之外的所有实体
    EntityMgr.prototype.getOtherCampEnityList = function (selfGroup) {
        var _this = this;
        var entityList = new List();
        var groupList = this.getGroupList();
        groupList.removeItem(selfGroup);
        if (!!groupList && groupList.count > 0) {
            groupList.forEach(function (groupId) { entityList.addListRange(_this.getGroupEnityList(groupId)); });
        }
        return entityList;
    };
    //获取相应组下所有玩家ID
    EntityMgr.prototype.getOwnerList = function (group) {
        var entityDic = this.entityGroupDic.getValue(group);
        if (!!entityDic)
            return entityDic.keys;
        return null;
    };
    //获取所有阵营Id列表
    EntityMgr.prototype.getGroupList = function () {
        return this.entityGroupDic.keys;
    };
    //通过实例ID获取实体
    EntityMgr.prototype.getEntity = function (entityInstId) {
        return this.entityInstIdDic.getValue(entityInstId);
    };
    //获得所有实体 当callback返回为true时，实体将被移除
    EntityMgr.prototype.foreach = function (callback, argThis) {
        if (!this.entityInstIdDic || this.entityInstIdDic.count == 0)
            return;
        this.entityInstIdDic.foreach(callback, argThis);
    };
    //清除所有实体
    EntityMgr.prototype.clear = function () {
        this.entityGroupDic.foreach(function (groupValue) {
            groupValue.foreach(function (entityList) {
                entityList.forEach(function (entity) {
                    entity.removeAllComponent();
                });
                entityList.clear();
            });
        });
        this.entityGroupDic.clear();
        this.entityInstIdDic.clear();
    };
    return EntityMgr;
}());
EntityMgr.Instance = new EntityMgr();
__reflect(EntityMgr.prototype, "EntityMgr");
//# sourceMappingURL=EntityMgr.js.map