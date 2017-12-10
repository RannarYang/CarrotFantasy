class GameModel extends Model{
	private levelCount = 5;
	private mLevels : Level[] = [];

	public initialize() {
		// Level
		let levels: Level[] = [];
		for(let i = 0; i < this.levelCount; i++) {
			let level = Tools.LevelTool.getLevelFromJSON(i);
			levels.push(level);
		}
		this.mLevels = levels;
	}
	public get allLevels(): Level[] {
		return this.mLevels;
	}
	public get gameProgress(): number{
		return 3;
	}

	private mPlayLevelIndex: number = -1;
	public startLevel(lv: number) {
		this.mPlayLevelIndex = lv;
	}
	public getPlayLevel(): Level {
		if(this.mPlayLevelIndex < 0 || this.mPlayLevelIndex > this.levelCount - 1) {
			throw new Error("关卡不存在");
		}
		return this.mLevels[this.mPlayLevelIndex];
	}
}