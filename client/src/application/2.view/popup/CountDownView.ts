class CountDownView extends View{
	public name = "CountDownView";
	private aniImgSrc = ["countdown_01","countdown_02","countdown_03","countdown_13"]
	private circleTween: egret.tween.TweenGroup;
	private cdNumImg: eui.Image;
	public constructor() {
		super();
	}
	private playAnim() {
		EgretTools.playAnimation(this.circleTween, true);
		this.countDown();
	}
	private async countDown() {
		for(let i = 0, len = this.aniImgSrc.length - 1; i < len; i++) {
			this.cdNumImg.source = this.aniImgSrc[i];
			await Utils.timeout(1000);
		}
		this.cdNumImg.source = this.aniImgSrc[this.aniImgSrc.length - 1];
		let imgW = this.cdNumImg.width;
		let imgH = this.cdNumImg.height;
		egret.Tween.get(this.cdNumImg)
			.set({width: 0, height: 0})
			.to({width: imgW, height: imgH}, 300 )
			.to({}, 500)
			.call(()=>{
				egret.Tween.get(this)
					.to({alpha: 0}, 300)
					.call(()=>{
						//倒计时结束
						PopUpManager.getInstance().removePopUp(CountDownView);
						this.sendEvent(Consts.E_CountDownComplete);
					})
			})
	}

	protected createChildren() {
		super.createChildren();
		this.skinName = CountDownSkin;
	}

	protected childrenCreated() {
		super.childrenCreated();
		this.playAnim();

	}
	public dispose() {
	}
}