class MenuView extends View {
	private btnSelect: eui.Button;
	private btnRestart: eui.Button;
	private btnContinue: eui.Button;
	private btnClose: eui.Button;
	public constructor() {
		super();
	}
	protected createChildren() {
		super.createChildren();
		this.skinName = MenuSkin;
	}
	protected childrenCreated() {
		super.childrenCreated();
		this.btnSelect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelect, this);
		this.btnRestart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestart, this);
		this.btnContinue.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onContinue, this);
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
	}
	private onSelect() {
		Game.getInstance().loadScene(SelectScene);
		this.close();
	}
	private onRestart() {
		Game.getInstance().loadScene(StartScene);
		this.close();
	}
	private onContinue() {
		this.close();
	}
	private close() {
		Game.getInstance().popUpManager.removePopUp(MenuView);
	}
	public onDispose() {
		this.btnSelect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelect, this);
		this.btnRestart.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestart, this);
		this.btnContinue.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onContinue, this);
		this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
	}
}