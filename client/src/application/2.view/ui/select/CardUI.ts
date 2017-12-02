class CardUI extends eui.Component{
	private cardImg: eui.Image
	private lockImg: eui.Image;
	private 
	// 卡片属性
	public card: Card;
	public constructor() {
		super();
	}
	protected createChildren() {
		super.createChildren();
		this.skinName = CardUISkin;
	}
	protected childrenCreated() {
		super.childrenCreated();
	}

	/**
	 * 设置是否为透明
	 */
    private mIsTransparent: boolean = false;
    public set IsTransparent(value: boolean) {
		this.mIsTransparent = value;
        this.alpha = value ? 0.5 : 1;
    }

	/**
	 * 绑定数据
	 */
	public dataBind(card: Card) {
		this.card = card;
		this.cardImg.source = card.cardImage;
		this.lockImg.visible = card.isLock;
	}
}