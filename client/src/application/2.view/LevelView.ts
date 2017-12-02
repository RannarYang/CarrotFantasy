class LevelView extends View {
	public name = "LevelView";
	private scoreLabel: eui.Label;
	private bgImg: eui.Image;
	private roadImg: eui.Image;

	private btnMenu: eui.Button;
	private btnPause: eui.Button;

	private gModel: GameModel;
	public constructor() {
		super();
	}
	protected createChildren() {
		super.createChildren();
		this.skinName = LevelSkin;
		this.init();
		PopUpManager.getInstance().addPopUp(CountDownView, PopUpShowMode.Normal, PopUpLucencyType.Lucency, true);
	}
	private init() {
		this.gModel = this.GetModel(GameModel);
		let level = this.gModel.getPlayLevel();
		this.scoreLabel.text = level.initScore + '';
		this.bgImg.source = level.background;
		this.roadImg.source = level.road;
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