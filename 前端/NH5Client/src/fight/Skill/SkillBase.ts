//技能基类
abstract class SkillBase implements TimerBehaviour
{
	//归属于哪个实体
	public readonly owner:Entity;

	//技能模版
	protected skillTemple:data.SkillTemple;
	public get skillTp():data.SkillTemple { return this.skillTemple; }

	//技能CD剩余时间
	protected skillCD:number;

	//前摇时间
	protected skillTime:number;

	//伤害信息列表
	protected targetList:List<BlackboardComponent>;

	//技能所包含的Buff列表
	public readonly skillBuffList:List<BuffBase> = new List<BuffBase>();

	//技能参数列表
	public readonly skillEffectArgumentsDic:Dictionary<number, List<number>> = new Dictionary<number, List<number>>();

	//技能所属技能组
	public get skillGroupId() { return !!this.skillTp ? this.skillTp.skill_category : 0; }

	//是否可以释放此技能
	public isCastSkill():boolean
	{
		var blackboardComp = this.owner.getComponent<BlackboardComponent>(ComponentType.Blackboard);
		 return this.skillTp.skilllev > 0 && this.skillCD <= 0 && blackboardComp.getAttrValue(data.RoleAttr.MP) >= this.skillTp.mpConsume;
	}

	//构造
	public constructor(owner:Entity, skillTp:data.SkillTemple)
	{
		this.owner = owner;
		this.skillTemple = skillTp;
		this.skillCD = 0;
		this.skillTime = 0;
	}

	//定时器更新
	public TimerUpdate(timerInfo:TimerInfo, deltaTime:number):void
	{
		this.skillCD -= deltaTime;

		if (this.skillCD <= 0)
		{
			this.skillCD = 0;
			timerInfo.isDelete = true;
		}
	}

	//是否能使用技能
	public canUseSkill(tx:number, ty:number):boolean { return true; }

	//获取技能目标列表
	protected abstract getSkillTargetList(target:BlackboardComponent, sx:number, sy:number, tx:number, ty:number):List<BlackboardComponent>;

	//获得技能目标列表
	public getTargetList(targetRangeList:List<egret.Point>):List<BlackboardComponent>
	{
		var targetList = new List<BlackboardComponent>();

		var targetEntityList:List<Entity> = null;
		if (this.skillTp.target_relation == SkillTarget.Self)
			targetEntityList = EntityMgr.Instance.getGroupEnityList(this.owner.camp);
		else
			targetEntityList = EntityMgr.Instance.getOtherCampEnityList(this.owner.camp);

		 if (!!targetEntityList && targetEntityList.count > 0)
		 {
			 targetEntityList.forEach(entity =>
			 {
				 var blackboardComp = entity.getComponent<BlackboardComponent>(ComponentType.Blackboard);
				 if (blackboardComp.getAttrValue(data.RoleAttr.HP) <= 0)
				 	return;

				 var ex = blackboardComp.getAttrValue(data.RoleAttr.x);
				 var ey = blackboardComp.getAttrValue(data.RoleAttr.y);

				 var findPt = targetRangeList.find(pt => pt.x == ex && pt.y == ey);
				 if (!!findPt)
				 	targetList.add(blackboardComp);
			 });
		 }

		return targetList;
	}

	//进入技能
	public OnEnter(target:Entity):void
	{
		if (!this.isCastSkill)
			return;

		var selfComp = this.owner.getComponent<BlackboardComponent>(ComponentType.Blackboard);
		var selfPos = selfComp.getPosition();

		var targetComp = target.getComponent<BlackboardComponent>(ComponentType.Blackboard);
		var targetPos = targetComp.getPosition();

		this.skillConsume(selfComp);

		this.skillTime = this.skillTp.skillTime;

		this.owner.currDirection = Utility.lookAt(selfPos.x, selfPos.y, targetPos.x, targetPos.y);
		this.owner.trigger(RoleEventDefine.PlayAtkAnimation, this.skillTp, this.owner.currDirection, target);

		this.targetList = this.getSkillTargetList(targetComp, selfPos.x, selfPos.y, targetPos.x, targetPos.y);
	}

	//执行技能
	public OnExcuter(deltaTime:number):boolean
	{
		this.skillTime -= deltaTime;

		if (this.skillTime > 0)
			return false;

		var selfComp = this.owner.getComponent<BlackboardComponent>(ComponentType.Blackboard);
		var damageInfoList = this.useSkill(selfComp);
		if (!damageInfoList || damageInfoList.count == 0)
			return true;

		//this.owner.trigger(RoleEventDefine.TriggerFight);
		damageInfoList.forEach(damageInfoEvent =>
		{ 
			ModuleEventMgr.instance.triger(damageInfoEvent);

			if (damageInfoEvent.isDead)
               damageInfoEvent.who.trigger(RoleEventDefine.ChangeState, FSMState.Dead);
		
		}, this);

		return true;
	}

	//离开技能
	public OnLeave():void
	{
		this.skillTime = 0;

		if (!!this.targetList)
		{
			this.targetList.clear();
			this.targetList = null;
		}
	}

	//技能消耗
	protected skillConsume(self:BlackboardComponent):void
	{
		this.skillCD = this.skillTp.cdtime;
		self.modifyAttrValue(data.RoleAttr.MP, -this.skillTp.mpConsume);
		TimerMgr.Instance.addTimerEvent(new TimerInfo(this));
	}

	//使用技能
	public useSkill(self:BlackboardComponent):List<DamageInfoEvent>
	{
		if (!this.targetList || this.targetList.count == 0)
		{
			console.error("SkillBase useSkill targetList == null");
			return;
		}

		var add2SelfBuffList = new List<BuffBase>();
		var removeIdList = null;

		var damageInfoList = new List<DamageInfoEvent>();

		this.targetList.forEach(target =>
		{
			if (target.getAttrValue(data.RoleAttr.HP) <= 0)
				return;

			var targetBattleComp = target.owner.getComponent<BattleComponent>(ComponentType.Battle);
			let damageInfo = this.calcSkillDamage(self, target);

			let addBuffIdList = new List<number>();
			this.skillBuffList.forEach(buffBase =>
			{
				if (buffBase.buffTp.ifCalc == 1)
					return;

				if (Utility.random(0, 10000) > buffBase.buffTp.buffRate)
					return;

				switch(buffBase.buffTp.BuffTarget)
				{
					case BuffTarget.Self: add2SelfBuffList.add(buffBase); break;
					case BuffTarget.Enemy: 
					{
						let objRet = targetBattleComp.addBuff(buffBase);
						if (!!objRet["isAddSuccess"])
							addBuffIdList.add(buffBase.buffTp.ID);

						removeIdList = objRet["removeBuffList"];
						break;
					}
					default: console.error("SkillBase CastSkill BuffTarget: " + buffBase.buffTp.BuffTarget); break;
				}
			});

			damageInfoList.add(new DamageInfoEvent(target.owner, damageInfo["damage"], addBuffIdList, removeIdList, damageInfo["isDead"]));
		});

		return damageInfoList;
	}

	//计算技能伤害
	public calcSkillDamage(self:BlackboardComponent, target:BlackboardComponent):Object
	{
		var skillArgList = new List<number>(new Array<number>(SkillArgDefine.Max));

		//判定初始伤害值：基础伤害值=攻击方攻击*技能修正+技能附加值-被攻击者防御*技能抵抗修正
		skillArgList.setItem(SkillArgDefine.Atk, self.getAttrValue(data.RoleAttr.ATK));
		skillArgList.setItem(SkillArgDefine.AtkRate, this.skillTp.ATKRate);
		skillArgList.setItem(SkillArgDefine.AtkValue, this.skillTp.ATKVal);
		skillArgList.setItem(SkillArgDefine.DamageRate, this.skillTp.DamageRate);

		var damage:number = 0;

		if (this.skillTp.target_relation == SkillTarget.Enemy)
		{
			switch(this.skillTp.skill_type)
			{
				case AtkType.Atk: skillArgList.setItem(SkillArgDefine.Def, target.getAttrValue(data.RoleAttr.DEF)); break;
				case AtkType.MAtk: skillArgList.setItem(SkillArgDefine.Def, target.getAttrValue(data.RoleAttr.MDEF)); break;
				default: console.error("SkillBase calcSkillDamage AtkType default"); break;
			}

			this.CalcSkillArgByBuff(skillArgList);

			damage = Math.floor(skillArgList.getItem(SkillArgDefine.Atk) * skillArgList.getItem(SkillArgDefine.AtkRate) / 10000
				+ skillArgList.getItem(SkillArgDefine.AtkValue) - (skillArgList.getItem(SkillArgDefine.Def) * this.skillTp.DamageRate / 10000));

			damage = damage <= 0 ? -1 : -damage;

			//判定是否暴击【1】是否强制暴击或者不暴击。【2】按公式判定暴击概率。最终暴击率=攻击方暴击率-被攻击抗暴击率
			var critial = self.getAttrValue(data.RoleAttr.critial); //由于是int，需要用万分之填写 1.2%暴击应该填写120
			var critcoe = self.getAttrValue(data.RoleAttr.critcoe) / 10000; //因为只能填int 需要用万分之填写150%只能填入15000，所以需要除以10000
			var resicritial = target.getAttrValue(data.RoleAttr.resicritial); //抗爆系数

			var _critial = critial - resicritial;
			if (_critial > 0)
			{
				if (Utility.random(0, 10000) <= _critial)
					damage = Math.floor(damage * critcoe);
			}
		}
		else if (this.skillTp.target_relation == SkillTarget.Self)
		{
			this.CalcSkillArgByBuff(skillArgList);

			damage = Math.floor(skillArgList.getItem(SkillArgDefine.Atk) * skillArgList.getItem(SkillArgDefine.AtkRate) / 10000) + skillArgList.getItem(SkillArgDefine.AtkValue);
			damage = Math.floor(damage * self.getAttrValue(data.RoleAttr.treat_percent) / 10000);
		}

		var targetHp = target.getAttrValue(data.RoleAttr.HP);
		var targetMHp = target.getAttrValue(data.RoleAttr.MHP);

		targetHp += damage;
		targetHp = targetHp <= 0 ? 0 : targetHp;
		targetHp = targetHp >= targetMHp ? targetMHp : targetHp;
		target.setAttrValue(data.RoleAttr.HP, targetHp);

		return { damage: damage, isDead: targetHp == 0 };
	}

	//通过参与计算的Buff修正技能参数
	protected CalcSkillArgByBuff(skillArgList:List<number>):void
	{
		this.skillBuffList.forEach(buffBase =>
		{
			if (buffBase.buffTp.ifCalc == 1)
				buffBase.TriggerSkillBuff(skillArgList);
		});
	}

	//通过技能ID创建技能
	public static createSkillById(owner:Entity, skillId:number):SkillBase
	{
		var skillTp = TempleMgr.select<data.SkillTemple>("SkillTemple", skillId);
		if (!skillTp)
			return null;

		return SkillBase.createSkillByTp(owner, skillTp);
	}

	//通过技能模版创建技能
	public static createSkillByTp(owner:Entity, skillTp:data.SkillTemple):SkillBase
	{
		var skill:SkillBase = null;

		switch(skillTp.skillType)
		{
			case SkillType.Single: skill = new SingleSkill(owner, skillTp); break;
			case SkillType.Summon: skill = new SummonSkill(owner, skillTp); break;
			case SkillType.Range: skill = SkillBase.createSkillByShape(owner, skillTp); break;
			case SkillType.Hit: skill = new HitSkill(owner, skillTp); break;
			case SkillType.CircleHit: skill = new CircleSkill(owner, skillTp); break;
		}

		if (skill != null)
			skill.SetSkillBuffer(skillTp);

		return skill;
	}

	//通过范围形状创建技能
	private static createSkillByShape(owner:Entity, skillTp:data.SkillTemple):SkillBase
	{
		switch(skillTp.shape)
		{
			case SkillShape.Line: return new LineSkill(owner, skillTp);
			case SkillShape.Circle: return new CircleSkill(owner, skillTp);
			case SkillShape.Sector: return new SectorSkill(owner, skillTp);
		}

		return null;
	}

	//设置技能Buff
	private SetSkillBuffer(skillTp:data.SkillTemple):void
	{
		this.skillEffectArgumentsDic.clear();
		this.addSkillArgument(skillTp.Effect1, skillTp.EffectArg1);
		this.addSkillArgument(skillTp.Effect2, skillTp.EffectArg2);
		this.addSkillArgument(skillTp.Effect3, skillTp.EffectArg3);

		var buffList = this.skillEffectArgumentsDic.getValue(SkillEffect.AdditionalBuff);
		if (!buffList || buffList.count == 0)
			return;

		this.skillBuffList.clear();
		buffList.forEach(buffId =>
		{
			var buff = BuffBase.createBuffById(this.owner, buffId, skillTp.ID);
			if (!!buff)
				this.skillBuffList.add(buff);
		});

		this.skillEffectArgumentsDic.remove(SkillEffect.AdditionalBuff);
	}

	//添加技能参数
	private addSkillArgument(key:number, value:number):void
	{
		if (key <= 0)
			return;

		key = key == SkillEffect.AdditionalBuffToSkill ? SkillEffect.AdditionalBuff : key;

		var valueList = this.skillEffectArgumentsDic.getValue(key);
		if (!valueList)
		{
			valueList = new List<number>();
			this.skillEffectArgumentsDic.add(key, valueList);
		}

		valueList.add(value);
	}

	//重置技能 技能升级时调用
	public resetSkill(skillId:number):void
	{
		var skillTp = TempleMgr.select<data.SkillTemple>("SkillTemple", skillId);
		if (!!skillTp)
		{
			this.skillTemple = skillTp;
			this.SetSkillBuffer(skillTp);
		}
	}
}