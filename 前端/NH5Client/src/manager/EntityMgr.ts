class EntityMgr
{
	public static readonly Instance:EntityMgr = new EntityMgr();

	//所有实体 对应实例ID
	private readonly entityInstIdDic:Dictionary<string, Entity>;

	//所有实体 对应哪个组
	private readonly entityGroupDic:Dictionary<string, Dictionary<string, List<Entity>>>;

	public constructor()
	{
		this.entityInstIdDic = new Dictionary<string, Entity>();
		this.entityGroupDic = new Dictionary<string, Dictionary<string, List<Entity>>>();
	}

	//添加实体到相应组
	public addEntity(entity:Entity):void
	{
		var entityDic:Dictionary<string, List<Entity>> = this.entityGroupDic.getValue(entity.camp);
		if (!entityDic)
		{
			entityDic = new Dictionary<string, List<Entity>>();
			this.entityGroupDic.add(entity.camp, entityDic);
		}

		var entityList:List<Entity> = entityDic.getValue(entity.ownerId);
		if (!entityList)
		{
			entityList = new List<Entity>();
			entityDic.add(entity.ownerId, entityList);
		}

		entityList.add(entity);
		this.entityInstIdDic.add(entity.instanceId, entity);
	}

	//移除实体
	public removeEntity(entity:Entity):void
	{
		this.entityInstIdDic.remove(entity.instanceId);

		var entityDic:Dictionary<string, List<Entity>> = this.entityGroupDic.getValue(entity.camp);
		if (!entityDic)
			return;

		var entityList:List<Entity> = entityDic.getValue(entity.ownerId);
		if (!!entityList)
			entityList.removeItem(entity);		

		if (!entityList || entityList.count == 0)
		{
			entityDic.remove(entity.ownerId);
			this.entityGroupDic.remove(entity.camp);
		}
	}

	//获取相应组下相应玩家的所有实体
	public getEntityList(group:string, owner:string):List<Entity>
	{
		 var entityDic:Dictionary<string, List<Entity>> = this.entityGroupDic.getValue(group);
		 if (!!entityDic)
		 	return entityDic.getValue(owner);

		return null;
	}

	//获取相应组下的所有实体
	public getGroupEnityList(group:string):List<Entity>
	{
		var entityList = new List<Entity>();

		var entityDic:Dictionary<string, List<Entity>> = this.entityGroupDic.getValue(group);
		if (!!entityDic && entityDic.count > 0)
		{
			entityDic.foreach(list => { entityList.addListRange(list); });
		}

		return entityList;
	}

	//获取除本阵营之外的所有实体
	public getOtherCampEnityList(selfGroup:string):List<Entity>
	{
		var entityList = new List<Entity>();
		
		var groupList = this.getGroupList();
		groupList.removeItem(selfGroup);

		if (!!groupList && groupList.count > 0)
		{
			groupList.forEach(groupId => { entityList.addListRange(this.getGroupEnityList(groupId)); });
		}

		return entityList;
	}

	//获取相应组下所有玩家ID
	public getOwnerList(group:string):List<string>
	{
		var entityDic:Dictionary<string, List<Entity>> = this.entityGroupDic.getValue(group);
		if (!!entityDic)
			return entityDic.keys;

		return null;
	}

	//获取所有阵营Id列表
	public getGroupList():List<string>
	{
		return this.entityGroupDic.keys;
	}

	//通过实例ID获取实体
	public getEntity(entityInstId:string):Entity
	{
		return this.entityInstIdDic.getValue(entityInstId);
	}

	//获得所有实体 当callback返回为true时，实体将被移除
	public foreach(callback:(entity:Entity)=>void, argThis?:any):void
	{
		if (!this.entityInstIdDic || this.entityInstIdDic.count == 0)
			return;

		this.entityInstIdDic.foreach(callback, argThis);
	}

	//清除所有实体
	public clear():void
	{
		this.entityGroupDic.foreach(groupValue =>
		{
			groupValue.foreach(entityList =>
			{
				entityList.forEach(entity =>
				{
					entity.removeAllComponent();
				});

				entityList.clear();
			});
		});

		this.entityGroupDic.clear();
		this.entityInstIdDic.clear();
	}
}