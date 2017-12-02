class GameModel extends Model{
	public name = "GameModel";
	private levelCount = 5;
	private mLevels : Level[] = [];

	public initialize() {
		// Level
		let levels: Level[] = [];
		for(let i = 0; i < this.levelCount; i++) {
			let level = Tools.getLevel(i);
			levels.push(level);
		}
		this.mLevels = levels;
	}
	public get allLevels(): Level[] {
		return this.mLevels;
	}
	public get gameProgress(): number{
		return 2;
	}
}