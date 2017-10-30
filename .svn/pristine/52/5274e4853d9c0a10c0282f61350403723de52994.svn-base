class MovieClip extends egret.MovieClip
{
	//是否循环播放
	public isLoop:boolean = false;

	//定时标记
	private timeoutIndex:number = -1;

	public constructor(isLoop:boolean = false, movieClipData?:egret.MovieClipData)
	{
		super(movieClipData);

		this.isLoop = isLoop;
	}

	//设置movieClipData
	public initMovieClipData(data:egret.MovieClipData):void
	{
		this.movieClipData = data;

		if (!!this.movieClipData)
			this.startPlay();
	}

	//从第一帧开始播放动画 delay：延时多久开始播放动画
	public startPlay<T>(finishCB?:(objThis:T, ...arg:any[]) => void, argThis?:T, delay:number = 0, ...args:any[]):void
	{
		if (this.timeoutIndex >= 0)
			egret.clearTimeout(this.timeoutIndex);

		if (!finishCB)
		{
			this.playClip();
			return;
		}

		this.timeoutIndex = egret.setTimeout(() =>
		{
			this.playClip();
			egret.setTimeout(finishCB, argThis, this.playTime, args);

		}, this, delay);
	}

	//播放动画
	private playClip(): void
	{
		if (this.isLoop)
		{
			super.play(-1);
			return;
			
		}
		
		this.gotoAndPlay(0, 1);
	}

	//播放时间
	public get playTime():number
	{
		return !!this.movieClipData ? 1 / this.frameRate * this.totalFrames * 1e3 : 0
	}
}