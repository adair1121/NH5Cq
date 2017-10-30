enum FSMState
{
	Idle, //待机状态
	Move, //移动状态
	Attack, //攻击状态
	Dead, //死亡状态
	Faint, //眩晕状态
	Hit, //冲撞状态
}

enum ComponentType
{
	Blackboard,//黑板组件
	Animator,//动画组件
	CharacterController,//角色控制器组件
	FindPath,//寻路组件
	Battle,//战斗组件
}

enum SkillType
{
	Single = 1, //单体
	Range, //范围
	Summon, //召唤
	Hit, //野蛮冲撞
	CircleHit, //抗拒火环
}

enum SkillTarget
{
	Self, //自己阵营
	Enemy, //敌对阵营
}

enum SkillEffect
{
	AdditionalBuff = 1, //给目标附加Buffer
	HitMove, //碰撞后位移量
	Summon, //召唤宝宝
	AdditionalBuffToSkill, //给技能附加Buffer
}

enum SkillShape
{
	Line, //矩形
	Circle, //圆形
	Sector, //扇形
}

enum BuffType
{
	BaseProperty = 1, //基础属性
	Protect, //护盾
	DamageTreat, //伤害/治疗
	HitBack, //击退
	Faint, //眩晕
	AdditionalSkillDamage, //附加技能伤害
	IgnoreDefPercent, //无视防御百分比
	BaseBattleProperty, //战斗属性
}

enum BuffDelType
{
	TimeEnd, //持续时间结束
	Dead, //死亡
	BattleEnd, //战斗结束
	NeverDestroy, //永不销毁
}

enum BuffTarget
{
	Self, //自己阵营
	Enemy, //敌对阵营
}

enum BufferRemoveRule
{
	All, //移除所有
	Increase, //移除增益
	Reduce, //移除减益
}

enum SkillArgDefine
{
	Atk, //攻击力
	Def, //防御力
	AtkRate, //技能攻击系数
	AtkValue, //技能附加值
	DamageRate, //防御抵消伤害系数
	Max, //用于创建时使用
}

enum AtkType
{
	Atk = 1, //物攻
	MAtk, //魔攻
}

enum RoleEventDefine
{
	ChangeState, //切换状态
	ChangeToPreState, //切换到上一个状态
	TriggerFight,//触发战斗
	SkillUpgrade,//技能升级
	PlayAnimation,//播放通用动画
	PlayAtkAnimation,//播放攻击动画
	DamageInfo,//伤害信息
}

enum RoleState
{
	Normal, //正常
	Faint,  //眩晕
}

enum JobDefine
{
	Player, //玩家
	ZS, //战士
	FS, //法师
	DS, //道士
	Monster, //怪物
}

enum ConstDefine
{
	IntMaxValue = 2147483647, //整形最大值
}

enum SkillClipDefine
{
	SkillRes, //技能资源
	FlyRes, //飞行资源
	RockRes, //受击资源
	Max, //用于创建数组长度
}

enum GlobalDefine
{
	RefreshX = 10901008, //地图刷怪左右方向参数
	RefreshY = 10901009, //地图刷怪上下方向参数
}

enum FightResult
{
	Err, //错误
	Win, //胜利
	Lose, //失败
}

class CampDefine
{
	public static readonly Player = "player"; //玩家阵营
	public static readonly Monster = "monster"; //怪物阵营
}

enum ShowClipDefine
{
	Idle, //待机
	Move, //移动
	Attack, //攻击
	Cast, //释放
}