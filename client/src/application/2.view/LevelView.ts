class LevelView extends View {
	public name = "LevelView";
	private btnMenu: eui.Button;
	private btnPause: eui.Button;
	public constructor() {
		super();
	}
	protected createChildren() {
		super.createChildren();
		this.skinName = LevelSkin;
	}
	protected childrenCreated() {
		super.childrenCreated();
		this.btnMenu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMenu, this);
		this.btnPause.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPause, this);
	}
	private onMenu() {
		Game.getInstance().popUpManager.addPopUp(MenuView, PopUpShowMode.Normal);
	}
	private onPause() {
		// todo 暂时跳转到 Complete 界面
		Game.getInstance().loadScene(CompleteScene);
	}
	public dispose() {
		this.btnMenu.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMenu, this);
		this.btnPause.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPause, this);
	}
}