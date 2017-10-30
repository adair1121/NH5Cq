var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TempleMgr = (function () {
    function TempleMgr() {
    }
    TempleMgr.init = function (callBack, thisArg) {
        var _this = this;
        var pathList = new List();
        pathList.add("resource/config/temple/MapTemple.txt");
        pathList.add("resource/config/temple/LevelStageTemple.txt");
        pathList.add("resource/config/temple/GlobalDefineTemple.txt");
        pathList.add("resource/config/temple/ItemTemple.txt");
        pathList.add("resource/config/temple/SkillTemple.txt");
        pathList.add("resource/config/temple/UnitTemple.txt");
        pathList.add("resource/config/temple/WingsTemple.txt");
        pathList.add("resource/config/temple/HumenTemple.txt");
        pathList.add("resource/config/temple/RebornTemple.txt");
        pathList.add("resource/config/temple/DropTemple.txt");
        pathList.add("resource/config/temple/BuffTemple.txt");
        pathList.add("resource/config/temple/DropItemTemple.txt");
        pathList.add("resource/config/temple/JingMaiTemple.txt");
        pathList.add("resource/config/temple/DragonSoulTemple.txt");
        pathList.add("resource/config/temple/ShieldTemple.txt");
        pathList.add("resource/config/temple/RoleInitTemple.txt");
        pathList.add("resource/config/temple/JobInitTemple.txt");
        pathList.add("resource/config/temple/MonsterAITemple.txt");
        AssetsMgr.instance.loadTextGroup(pathList.toArray(), function (dic) {
            dic.foreach(function (data, name) { _this.temples.add(name, data); }, _this);
            if (!!callBack)
                callBack.call(thisArg);
        });
    };
    //通过技能技能类型和技能等级获取技能模版
    TempleMgr.getSkillTp = function (skillCategory, skillLv) {
        var objTemple = this.temples.getValue("SkillTemple");
        for (var key in objTemple) {
            var skillTp = objTemple[key];
            if (skillTp.skill_category == skillCategory && skillTp.skilllev == skillLv)
                return skillTp;
        }
        return null;
    };
    // public static getStrengthenFunc(da:any):void{
    //     for(var o in da){
    //         TempleManager.temples[o]=da[o];
    //         if(da[o].systemType === data.StrengthenType.ST_ZH){
    //             if(!DataCenter.strengThenZHGather[da[o].pos]){
    //                 DataCenter.strengThenZHGather[da[o].pos] = [];
    //             }
    //             DataCenter.strengThenZHGather[da[o].pos].push(da[o]);
    //         }
    //     }
    // }
    // public static getWordFunc(da:any){
    //     for(var o in da){
    //         TempleManager.temples[o]=da[o];
    //         DataCenter.wordGather[da[o].enumValue] = da[o].word;
    //     }            
    // }
    // public static getTitleFunc(da:any){
    //     for(var o in da){
    //         TempleManager.temples[o]=da[o];
    //         DataCenter.titleGather.push(da[o]);
    //     }
    // }
    // public static getBagRelationFunc(da:any){
    //     for(var o in da){
    //         TempleManager.temples[o]=da[o];
    //         DataCenter.bagGridRelation[da[o].addNumber] = da[o].yuanbaoNumber;
    //     }
    // }
    // public static getShopFunc(da:any){
    //     for(var o in da){
    //         TempleManager.temples[o]=da[o];
    //         if(!DataCenter.storeData[da[o].shopType]){
    //             DataCenter.storeData[da[o].shopType] = [];
    //         }
    //         DataCenter.storeData[da[o].shopType].push(da[o].ID);
    //         if(da[o].shopType === 2){
    //             DataCenter.storeGoods[da[o].ItemID] = (da[o].ID);
    //         }
    //     }
    // }
    // public static getRankDataFunc(da:any){
    //     if(!DataCenter.rankData){
    //         DataCenter.rankData = {};
    //     }
    //     for(var o in da){
    //         TempleManager.temples[o]=da[o];
    //         if(!DataCenter.rankData[da[o].order]){
    //             DataCenter.rankData[da[o].order] = [];
    //         }
    //         DataCenter.rankData[da[o].order].push(da[o]);
    //     }
    // }
    // public static getLevelDataFunc(da:any){
    //     if(!DataCenter.levelData){
    //         DataCenter.levelData = {};
    //     }
    //     for(var o in da){
    //         TempleManager.temples[o]=da[o];
    //         DataCenter.levelData[da[o].Level] = da[o];
    //     }
    // }
    // public static getJobInitFunc(da:any){
    //     if(!DataCenter.jobInitData){
    //         DataCenter.jobInitData = {};
    //     }
    //      for(var o in da){
    //         TempleManager.temples[o]=da[o];
    //         DataCenter.jobInitData[da[o].job] = da[o];
    //      }
    // }
    // public static getEquipData(da:any){
    //     if(!DataCenter.CJData){
    //         DataCenter.CJData = {};
    //     }
    //     if(!DataCenter.CJTempleData){
    //         DataCenter.CJTempleData = {};
    //     }
    //     for(var o in da){
    //         TempleManager.temples[o]=da[o];
    //         var str:string = da[o].equipPart.join("-");
    //         if(!DataCenter.CJData[str]){
    //             DataCenter.CJData[str] = [];
    //         }
    //         DataCenter.CJData[str].push(da[o]);
    //         DataCenter.CJTempleData[da[o].itemId] = da[o];
    //     }
    // }
    // public static getFashionData(da:any){
    //     if(!DataCenter.fashionData){
    //         DataCenter.fashionData = {};
    //     }
    //      for(var o in da){
    //         TempleManager.temples[o]=da[o];
    //         if(!DataCenter.fashionData[da[o].clothesPart]){
    //             DataCenter.fashionData[da[o].clothesPart] = [];
    //         }
    //         DataCenter.fashionData[da[o].clothesPart].push(da[o]);
    //      }
    // }
    // public static getMeetFunc(da:any){
    //     for(var o in da){
    //         TempleManager.temples[o]=da[o];
    //         DataCenter.meetData[da[o].aimReborn] = da[o];
    //     }
    // }
    //查询
    TempleMgr.select = function (templeName, id) {
        var template = this.temples.getValue(templeName);
        if (!template) {
            return null;
        }
        return template[id];
    };
    //查询模板全部数据
    TempleMgr.selectAll = function (templeName) {
        var template = this.temples.getValue(templeName);
        if (!template) {
            return null;
        }
        var arr = [];
        for (var key in template) {
            arr.push(template[key]);
        }
        return arr;
    };
    return TempleMgr;
}());
//所有模版
TempleMgr.temples = new Dictionary();
__reflect(TempleMgr.prototype, "TempleMgr");
//# sourceMappingURL=TempleMgr.js.map