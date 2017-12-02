class StartLevelCommand extends Controller {
	public execute(data: StartLevelArgs) {

		let gModel = this.GetModel(GameModel);
		gModel.startLevel(data.levelIndex);

		let rModel = this.GetModel(RoundModel);
		rModel.loadLevel(gModel.getPlayLevel());

		Game.getInstance().loadScene(LevelScene);

	}
}