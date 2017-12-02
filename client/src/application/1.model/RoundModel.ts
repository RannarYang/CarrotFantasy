class RoundModel extends Model{
	public name = "RoundModel";
	private mRounds: Round[] = [];
	public constructor() {
		super();
	}
	public loadLevel(level: Level) {
		this.mRounds = level.rounds;
	}
	public startRound() {
		
	}
}