class RoundModel extends Model{
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