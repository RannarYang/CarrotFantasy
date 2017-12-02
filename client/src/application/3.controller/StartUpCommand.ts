class StartUpCommand extends Controller{
	public execute(data: any) {
		console.log('开始游戏啦啦啦 =================');
		// 注册模型
		this.registModel(new GameModel());
		this.registModel(new RoundModel());
		// 注册命令
		this.registController(Consts.E_EnterScene, EnterSceneCommand);
		this.registController(Consts.E_ExitScene, ExitSceneCommand);
		this.registController(Consts.E_StartLevel, StartLevelCommand);
		// 初始化
		let gModel: GameModel = this.GetModel(GameModel);
		gModel.initialize();

		// 进入开始界面
		Game.getInstance().loadScene(StartScene);
	}
}