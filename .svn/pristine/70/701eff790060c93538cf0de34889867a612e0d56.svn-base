module temple{
    export class TempleMgr{
        constructor(){
        }
        private static  callBack:Function;
        private static thisArg:any;
        public static init(callBack?:()=>void,thisArg?:any):void{
            var txts=[]
             this.callBack = callBack;
             this.thisArg = thisArg;
             RES.getResByUrl("resource/config/temple/MapTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
            //  RES.getResByUrl("resource/config/temple/ItemTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
            //  RES.getResByUrl("resource/config/temple/SkillTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
            //  RES.getResByUrl("resource/config/temple/UnitTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
            //  RES.getResByUrl("resource/config/temple/WingsTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
            //  RES.getResByUrl("resource/config/temple/HumenTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
            //  RES.getResByUrl("resource/config/temple/RebornTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
            //  RES.getResByUrl("resource/config/temple/DropTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
            // //  RES.getResByUrl("resource/cfg/StrengthenTemple.txt",this.getStrengthenFunc,this,RES.ResourceItem.TYPE_JSON);
            //  RES.getResByUrl("resource/config/temple/DropItemTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
            //  RES.getResByUrl("resource/config/temple/BuffTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
            //  RES.getResByUrl("resource/config/temple/MapTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
            //  RES.getResByUrl("resource/config/temple/JingMaiTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
            //  RES.getResByUrl("resource/config/temple/DragonSoulTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
            //  RES.getResByUrl("resource/config/temple/ShieldTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
            //  RES.getResByUrl("resource/config/temple/GemstoneTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
            //  RES.getResByUrl("resource/config/temple/ZhuLingTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
            // //  RES.getResByUrl("resource/cfg/ShopTemple.txt",this.getShopFunc,this,RES.ResourceItem.TYPE_JSON);
            //  RES.getResByUrl("resource/config/temple/LevelStageTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
            //  RES.getResByUrl("resource/config/temple/RoleInitTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
            // //  RES.getResByUrl("resource/cfg/JobInitTemple.txt",this.getJobInitFunc,this,RES.ResourceItem.TYPE_JSON);
            // //  RES.getResByUrl("resource/cfg/WordTemple.txt",this.getWordFunc,this,RES.ResourceItem.TYPE_JSON);
            //  RES.getResByUrl("resource/config/temple/GlobalDefineTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
            // //  RES.getResByUrl("resource/cfg/RankTemple.txt",this.getRankDataFunc,this,RES.ResourceItem.TYPE_JSON);
            // //  RES.getResByUrl("resource/cfg/AddBagTemple.txt",this.getBagRelationFunc,this,RES.ResourceItem.TYPE_JSON);
            // //  RES.getResByUrl("resource/cfg/LevelTemple.txt",this.getLevelDataFunc,this,RES.ResourceItem.TYPE_JSON);
            // //  RES.getResByUrl("resource/cfg/EquipTemple.txt",this.getEquipData,this,RES.ResourceItem.TYPE_JSON);
            // //  RES.getResByUrl("resource/cfg/FashionTemple.txt",this.getFashionData,this,RES.ResourceItem.TYPE_JSON);
            //  RES.getResByUrl("resource/config/temple/BossTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
            // //  RES.getResByUrl("resource/cfg/TitleTemple.txt",this.getTitleFunc,this,RES.ResourceItem.TYPE_JSON);
            //  RES.getResByUrl("resource/config/temple/WeekChargeTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
            // //  RES.getResByUrl("resource/cfg/MeetBattleTemple.txt",this.getMeetFunc,this,RES.ResourceItem.TYPE_JSON);
            //  RES.getResByUrl("resource/config/temple/MonthCardTemple.txt",this.getFunc,this,RES.ResourceItem.TYPE_JSON);
             
        }
        private static temples: Dictionary<string,Object> = new Dictionary<string,Object>();
        //
        public static getFunc(dataObj:Object,url:string){
            var regExp:RegExp = /temple\/(\S*)\.txt/;
            var templeName:string = url.match(regExp)[1];
            this.temples.add(templeName,dataObj);
            if(this.callBack && this.thisArg){
                this.callBack.call(this.thisArg);
            }
            // for(var o in dataObj){
            //     TempleManager.temples[o]=dataObj[o];
                
            // }
            // var obj=TempleManager.temples[1001015];
            // var C:data.UnitTemple=<data.UnitTemple>obj;
            
            // console.log(C.name);
        }
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
        public static select<T>(templeName:string,id:number):T{
            var template:Object = this.temples.getValue(templeName);
            if(!template){
                return null;
            }
            return <T>template[id];
        }
        //查询模板全部数据
        public static selectAll<T>(templeName:string):Array<T>{
            var template:Object = this.temples.getValue(templeName);
            if(!template){
                return null;
            }
            var arr:Array<T> = [];
            for(var key in template){
                arr.push(template[key]);
            }
            return arr;
        }
    }
}