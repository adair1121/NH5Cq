var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//定时信息
var TimerInfo = (function () {
    function TimerInfo(target, interval) {
        this.isDelete = false; //是否删除
        this.currTime = 0; //当前时间
        this.callTimes = 0; //调用次数
        this.intervalTime = 0; //调用周期
        this.target = null; //目标
        this.target = target;
        this.intervalTime = interval || 0;
    }
    return TimerInfo;
}());
__reflect(TimerInfo.prototype, "TimerInfo");
var TimerMgr = (function () {
    function TimerMgr() {
        this.timerList = new List();
    }
    //添加定时器
    TimerMgr.prototype.addTimerEvent = function (timerInfo) {
        if (!!timerInfo && !this.timerList.contains(timerInfo))
            this.timerList.add(timerInfo);
    };
    //移除定时器
    TimerMgr.prototype.removeTimerEvent = function (timerInfo) {
        if (!!timerInfo && !this.timerList.contains(timerInfo))
            timerInfo.isDelete = true;
    };
    //定时器更新
    TimerMgr.prototype.update = function (deltaTime) {
        if (this.timerList.count == 0)
            return;
        this.timerList.removeAll(function (timerInfo) {
            if (timerInfo.isDelete || !timerInfo.target)
                return true;
            if (timerInfo.intervalTime > 0)
                timerInfo.currTime += deltaTime;
            if (timerInfo.intervalTime == 0 || timerInfo.currTime >= timerInfo.intervalTime) {
                if (timerInfo.intervalTime > 0)
                    timerInfo.currTime %= timerInfo.intervalTime;
                timerInfo.target.TimerUpdate(timerInfo, deltaTime);
            }
            return false;
        });
    };
    return TimerMgr;
}());
TimerMgr.Instance = new TimerMgr();
__reflect(TimerMgr.prototype, "TimerMgr");
//# sourceMappingURL=TimerMgr.js.map