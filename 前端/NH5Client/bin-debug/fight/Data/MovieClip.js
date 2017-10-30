var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MovieClip = (function (_super) {
    __extends(MovieClip, _super);
    function MovieClip(isLoop, movieClipData) {
        if (isLoop === void 0) { isLoop = false; }
        var _this = _super.call(this, movieClipData) || this;
        //是否循环播放
        _this.isLoop = false;
        //定时标记
        _this.timeoutIndex = -1;
        _this.isLoop = isLoop;
        return _this;
    }
    //设置movieClipData
    MovieClip.prototype.initMovieClipData = function (data) {
        this.movieClipData = data;
        if (!!this.movieClipData)
            this.startPlay();
    };
    //从第一帧开始播放动画 delay：延时多久开始播放动画
    MovieClip.prototype.startPlay = function (finishCB, argThis, delay) {
        var _this = this;
        if (delay === void 0) { delay = 0; }
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        if (this.timeoutIndex >= 0)
            egret.clearTimeout(this.timeoutIndex);
        if (!finishCB) {
            this.playClip();
            return;
        }
        this.timeoutIndex = egret.setTimeout(function () {
            _this.playClip();
            egret.setTimeout(finishCB, argThis, _this.playTime, args);
        }, this, delay);
    };
    //播放动画
    MovieClip.prototype.playClip = function () {
        if (this.isLoop) {
            _super.prototype.play.call(this, -1);
            return;
        }
        this.gotoAndPlay(0, 1);
    };
    Object.defineProperty(MovieClip.prototype, "playTime", {
        //播放时间
        get: function () {
            return !!this.movieClipData ? 1 / this.frameRate * this.totalFrames * 1e3 : 0;
        },
        enumerable: true,
        configurable: true
    });
    return MovieClip;
}(egret.MovieClip));
__reflect(MovieClip.prototype, "MovieClip");
//# sourceMappingURL=MovieClip.js.map