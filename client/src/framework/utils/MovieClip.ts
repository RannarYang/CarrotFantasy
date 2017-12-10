class MovieClip extends egret.MovieClip implements IReusable {
	private effectId:number=0;
	private _playTimes:number = -1;
	protected completeFuncThisObj:any=null;
	protected actionCompleteFunc:Function=null;
	public constructor(movieClipData?: egret.MovieClipData) {
		super(movieClipData);
        this.touchEnabled = false;
        this.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        this.addEventListener(egret.MovieClipEvent.FRAME_LABEL,this.onFrameLabel,this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemoved,this);
	}
	public setEffectId(effectId:number):void {
        this.effectId = effectId;
    }
	public loadFile(fileName: string, playTimes: number = -1, onComplete=()=>{}, thisObj: any = null,events:Array<{name:string,frame:number}>=null): void {
		this.actionCompleteFunc = onComplete;
		this.completeFuncThisObj = thisObj;
		this.visible = false;
		if(fileName=="") {
			Log.warning('---特效文件名为空');
			this.onComplete();
			return;
		}
		let url = SysConfig.effectPath + fileName + '.json';
		RES.getResByUrl(url, (data)=>{
			if(!data) {
				Log.warning('---加载特效JSON配置出错，', url);
				this.onComplete();
				return;
			}
			url = "resource/effect/" + fileName + ".png";
			RES.getResByUrl(url, (texture)=>{
				if(!texture) {
					Log.warning('---加载特效PNG文件出错,', url);
					this.onComplete();
					return;
				}
				if(events) {
					while(events.length > 0) {
						let event = events.shift();
						if(this.equalFrameEvent(fileName, data, event) == false) {
							data.mc[fileName].events.push(event);
						}
					}
				}
				let factory = new egret.MovieClipDataFactory(data, texture);
				this.movieClipData = factory.generateMovieClipData(fileName);
				if(!this.movieClipData.frames || this.movieClipData.frames.length == 0) {
					// 无帧数据
					Log.warning('---解析特效动画帧数据错误：', fileName);
					this.onComplete();
					return;
				}
				this._onLoadComplete()
				this.gotoAndPlay(0, playTimes);
				this._playTimes = playTimes;
				this.visible = true;
			}, this);
		}, this);
	}
	private _onLoadComplete: Function = ()=>{};
	public set onLoadComplete (value:Function) {
		this._onLoadComplete = value;
	}
	/**是否存在相同的帧事件 */
    private equalFrameEvent(mcName:string,mcDataSet:any,event:{name:string,frame:number}):boolean
    {
        for (var key in mcDataSet.mc[mcName].events) {
            if (mcDataSet.mc[mcName].events[key].name == event.name
                && mcDataSet.mc[mcName].events[key].frame == event.frame) {
                return true;
            }
        }
        return false;
    }
	private onAddToStage(): void {
		if(this.movieClipData) {
			this.gotoAndPlay(0, this._playTimes);
		}
	}
	private onRemoved(): void {
		this.stop();
		this.onUnSpawn();
	}
	private onComplete(): void {
		if(this.actionCompleteFunc) {
			this.actionCompleteFunc.call(this.completeFuncThisObj);
			this.actionCompleteFunc = null;
		}
	}
	public onSpawn() {
		this.rotation = 0;
        this.scaleX = this.scaleY = 1;
        this.alpha = 1;
        this.x=this.y=0;
        this.effectId = 0;
        this.visible = false;
        this.movieClipData = null;
        this._playTimes = -1;
        this.completeFuncThisObj = null;
        this.actionCompleteFunc = null;
	}
	public onUnSpawn() {
		this.actionCompleteFunc = null;
		this.completeFuncThisObj = null
	}
	private onFrameLabel(evt:egret.MovieClipEvent):void
    {
        Log.warning('onFrameLabel',this.currentFrame,evt.frameLabel);
        // AppCommon.event.dispatchEvent(new EffectEvent(EffectEvent.EFFECT_KEYFRAME,this.effectId,this.pvpFightData,false,false,evt.frameLabel));
    }
}