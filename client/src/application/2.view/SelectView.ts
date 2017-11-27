class SelectView extends View {
	public name = "SelectView";

	private btnReturn: eui.Button;
	private btnStart: eui.Button;

	public constructor() {
		super();
	}
	protected createChildren() {
		super.createChildren();
		this.skinName = SelectSkin;
	}
	protected childrenCreated() {
		super.childrenCreated();
		this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this);
		this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStart, this);
	}
	private onReturn() {
		Game.getInstance().loadScene(StartScene)
	}
	private onStart() {
		Game.getInstance().loadScene(LevelScene);
	}
	public dispose() {
		this.btnReturn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this);
		this.btnStart.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStart, this);
	}
}