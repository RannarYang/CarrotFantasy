class StartView extends View {
	public name = "StartView";

	private btnAdventure: eui.Button;
	private btnBoss: eui.Button;
	private btnNest: eui.Button;

	public constructor() {
		super();
	}
	protected createChildren() {
		super.createChildren();
		this.skinName = StartSkin;
	}
	protected childrenCreated() {
		super.childrenCreated();
		this.btnAdventure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoSelect, this);
		this.btnBoss.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoSelect, this);
		this.btnNest.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoSelect, this);
	}
	private gotoSelect() {
		Game.getInstance().loadScene(SelectScene);
	}
	public dispose() {
		this.btnAdventure.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoSelect, this);
		this.btnBoss.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoSelect, this);
		this.btnNest.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoSelect, this);
	}
}