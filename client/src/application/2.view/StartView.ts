class StartView extends View {

	private btnAdventure: eui.Button;
	private btnBoss: eui.Button;
	private btnNest: eui.Button;
	private btnEditor: eui.Button;

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
		this.btnEditor.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoEditor, this);
	}
	private gotoSelect() {
		Game.getInstance().loadScene(SelectScene);
	}
	private gotoEditor() {
		Game.getInstance().loadScene(EditorScene);
	}
	public onDispose() {
		this.btnAdventure.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoSelect, this);
		this.btnBoss.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoSelect, this);
		this.btnNest.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoEditor, this);
		this.btnEditor.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoEditor, this);
	}
}