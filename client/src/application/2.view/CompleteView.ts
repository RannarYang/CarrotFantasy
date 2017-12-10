class CompleteView extends View {

	private btnRestart: eui.Button;
	private btnClear: eui.Button;

	public constructor() {
		super();
	}
	protected createChildren() {
		super.createChildren();
		this.skinName = CompleteSkin;
	}
	protected childrenCreated() {
		super.childrenCreated();
		this.btnRestart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestart, this);
		this.btnClear.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClear, this);
	}
	private onRestart() {
		Game.getInstance().loadScene(StartScene)
	}
	private onClear() {
		console.log('clear......');
	}
	public onDispose() {
		this.btnRestart.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestart, this);
		this.btnClear.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClear, this);
	}
}