abstract class EventBase
{
	public abstract get id();

	public constructor() {}
}

enum ModuleEvent
{
	RoleMove, //角色移动
	HpTips, //掉血Tips
	DamageInfo, //伤害信息
	CreateEntity, //创建实体
	RemoveEntity, //移除实体
	PlayState, //播放通用状态
	PlayAtkState, //播放攻击状态
}

//在事件定义中，字段必须使用readonly，避免外面可修改
class RoleMoveEvent extends EventBase
{
	public get id() { return ModuleEvent.RoleMove; }

	public readonly who:Entity; //谁
	public readonly ptFrom:egret.Point; //从哪
	public readonly ptTo:egret.Point; //去哪
	public readonly moveTime:number; //移动时间

	public constructor(who:Entity, from:egret.Point, to:egret.Point, moveTime:number)
	{
		super();

		this.who = who;
		this.ptFrom = from;
		this.ptTo = to;
		this.moveTime = moveTime;
	}
}

//Buff +/-血时调用
class HpTipsEvent extends EventBase
{
	public get id() { return ModuleEvent.HpTips; }

	//血量改变的数值
	public readonly who:Entity;
	public readonly value:number;

	public constructor(who:Entity, value:number)
	{
		super();

		this.who = who;
		this.value = value;
	}
}

//技能伤害时调用
class DamageInfoEvent extends EventBase
{
	public get id() { return ModuleEvent.DamageInfo; }

	public readonly who:Entity; //谁受到伤害
	public readonly damageValue:number; //伤害多少
	public readonly addBuffIdList:List<number>; //附加了什么Buff
	public readonly removeBuffIdList:List<number>; //移除了什么Buff
	public readonly isDead:boolean; //是否死亡 前端死亡通过RemoveEntityEvent，不需要处理此字段
	public readonly rockClip:MovieClip; //受击动画

	public constructor(who:Entity, damageValue:number, addBuffIdList:List<number>, removeBuffIdList:List<number>, isDead:boolean)
	{
		super();

		this.who = who;
		this.damageValue = damageValue;
		this.addBuffIdList = addBuffIdList;
		this.removeBuffIdList = removeBuffIdList;
		this.isDead = isDead;
	}
}

//创建角色实体
class CreateEntityEvent extends EventBase
{
	public get id() { return ModuleEvent.CreateEntity; }

	public readonly who:Entity; //创建的实体
	public readonly pos:egret.Point; //创建位置

	public constructor(who:Entity, pos:egret.Point)
	{
		super();

		this.who = who;
		this.pos = pos;
	}
}

//移除角色实体
class RemoveEntityEvent extends EventBase
{
	public get id() { return ModuleEvent.RemoveEntity; }

	public readonly who:Entity; //移除的实体

	public constructor(who:Entity)
	{
		super();

		this.who = who;
	}
}

//播放通用状态
class PlayStateEvent extends EventBase
{
	public get id() { return ModuleEvent.PlayState; }

	public readonly who:Entity; //谁播放动画
	public readonly roleClipList:List<MovieClip>; //角色动画

	public constructor(who:Entity, roleClipList:List<MovieClip>)
	{
		super();

		this.who = who;
		this.roleClipList = roleClipList;
	}
}

//播放攻击状态
class PlayAtkStateEvent extends EventBase
{
	public get id() { return ModuleEvent.PlayAtkState; }

	public readonly who:Entity;//谁放了技能
	public readonly target:Entity; //目标是谁
	public readonly skillTp:data.SkillTemple; //技能模版
	public readonly direction:number; //朝向
	public readonly skillClip:MovieClip; //技能动画
	public readonly flyClip:MovieClip; //飞行动画
	public readonly roleClipList:List<MovieClip>; //角色技能动画
	public readonly roleIdleClipList:List<MovieClip>;//角色待机动画

	public constructor(who:Entity, target:Entity, skillTp:data.SkillTemple, direction:number, skillClip:MovieClip, flyClip:MovieClip, 
		roleClipList:List<MovieClip>, roleIdleClipList:List<MovieClip>)
	{
		 super();

		 this.who = who;
		 this.target = target;
		 this.skillTp = skillTp;
		 this.direction = direction;
		 this.skillClip = skillClip;
		 this.flyClip = flyClip;
		 this.roleClipList = roleClipList;
		 this.roleIdleClipList = roleIdleClipList;
	}
}
