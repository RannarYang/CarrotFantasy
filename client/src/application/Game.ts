/**
 * 游戏的入口类，初始化框架,单例
 */
class Game extends ApplicationBase {
	// 单例类
	private static _instance: Game = null;
	public static getInstance(): Game {
		if(!this._instance) {
			this._instance = new Game();
		}
		return this._instance;
	}
	// stage 
	private stage: egret.Stage;
	private fixContainer: eui.Component;
	// 全局访问的功能(全局单例)
	public objectPool : ObjectPool = null;
	public soundManager: SoundManager = null;
	public staticData: StaticData = null;
	public popUpManager : PopUpManager = null;
	public noticeManager: NoticeManager = null;
	/**
	 *  场景控制
	 */
	private _sceneManage = new StateManager();

	// 全局方法
	public loadScene<T extends SceneBase>(t: {new(a): T}) {
		// 加载新场景
		let scene = new t(this._sceneManage);
		this._sceneManage.setState(scene);
		// todo 可能需要删除所有的popup 

		// 加入下一场景
		this.fixContainer.addChild(scene);
	}

	// 游戏入口
	private constructor() {
		super();
	}
	public start(stage) {
		this.stage = stage;
		// 初始化层级
		let fixContainer: eui.Component = this.fixContainer = new eui.Component();
		this.stage.addChild(fixContainer);

		let popUpContainer: eui.Component = new eui.Component();
		this.stage.addChild(popUpContainer);

		let noticeManager: NoticeManager = new NoticeManager();
		this.stage.addChild(noticeManager);
		// 初始化
		this.objectPool = ObjectPool.getInstance();
		this.soundManager = SoundManager.getInstance();
		this.staticData = StaticData.getInstance();
		this.popUpManager = PopUpManager.getInstance();
		this.popUpManager.start(popUpContainer, this.stage.stageWidth, this.stage.stageHeight);
		this.noticeManager = noticeManager;

		// 注册启动命令
		this.registController(Consts.E_StartUp, StartUpCommand);
		
		// 启动游戏
		this.sendEvent(Consts.E_StartUp);

	}
}