class LevelScene extends SceneBase{
	public constructor(sceneManager) {
		super(sceneManager);
	}
	public stateBegin() {
		super.stateBegin();
		this.init();
	}
	private init() {
		this.addChild(new LevelView());
	}
}