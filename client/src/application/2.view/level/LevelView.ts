class LevelView extends View {
	private scoreLabel: eui.Label;
	

	private btnMenu: eui.Button;
	private btnPause: eui.Button;

	private gModel: GameModel;
	public constructor() {
		super();
	}
	protected createChildren() {
		super.createChildren();
		this.skinName = LevelSkin;
	}
	private init() {
		this.gModel = this.GetModel(GameModel);
		let level = this.gModel.getPlayLevel();
		this.scoreLabel.text = level.initScore + '';
	}
	protected childrenCreated() {
		super.childrenCreated();
		this.init();
		PopUpManager.getInstance().addPopUp(CountDownView, PopUpShowMode.Normal, PopUpLucencyType.Lucency, true);
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
	public onDispose() {
		this.btnMenu.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMenu, this);
		this.btnPause.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPause, this);
	}
}