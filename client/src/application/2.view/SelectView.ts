class SelectView extends View {

	private cards: Card[] = [];
	private cardUIGroup: eui.Group;
	private leftCardUI: CardUI;
	private centerCardUI: CardUI;
	private rightCardUI: CardUI;

	private curSelectedIndex: number = -1;
	private btnReturn: eui.Button;
	private btnStart: eui.Button;

	private gameModel: GameModel;
	public constructor() {
		super();
	}
	protected createChildren() {
		super.createChildren();
		this.skinName = SelectSkin;
	}
	protected childrenCreated() {
		super.childrenCreated();
		this.cardUIGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapCardUIGroup, this);
		this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this);
		this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStart, this);

		this.init();
	}
	private init() {
		this.gameModel = this.GetModel(GameModel);
		this.loadCards();
		this.selectCard(0);
	}
	private loadCards() {
		let levels = this.gameModel.allLevels;
		let cards: Card[] = [];
		for(let i = 0, len = levels.length; i < len; i++) {
			let card = new Card();
			card.levelId = i;
			card.cardImage = levels[i].cardImage;
			card.isLock = !(i <= this.gameModel.gameProgress + 1);
			cards.push(card);
		}
		this.cards = cards;
	}
	private tapCardUIGroup(evt: TouchEvent) {
		let touchImg: any = evt.target;
		let selectedCard: CardUI = touchImg.parent;
		this.selectCard(selectedCard.card.levelId);
	}
	private selectCard(index: number) {
		if(this.curSelectedIndex == index) return;
		this.curSelectedIndex = index;
		let leftIndex = this.curSelectedIndex - 1;
		let currentIndex = this.curSelectedIndex;
		let rightIndex = this.curSelectedIndex + 1;

		if(leftIndex < 0) {
			this.leftCardUI.visible = false;
		} else {
			this.leftCardUI.visible = true;
			this.leftCardUI.dataBind(this.cards[leftIndex]);
		}

		this.centerCardUI.dataBind(this.cards[currentIndex]);
		this.btnStart.visible = !this.cards[currentIndex].isLock;

		if(rightIndex > this.cards.length - 1) {
			this.rightCardUI.visible = false;
		} else {
			this.rightCardUI.visible = true;
			this.rightCardUI.dataBind(this.cards[rightIndex]);
		}
	}
	private onReturn() {
		Game.getInstance().loadScene(StartScene)
	}
	private onStart() {
		let e: StartLevelArgs = new StartLevelArgs();
		e.levelIndex = this.curSelectedIndex;
		this.sendEvent(Consts.E_StartLevel, e);
	}
	public onDispose() {
		this.btnReturn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this);
		this.btnStart.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStart, this);
	}
}