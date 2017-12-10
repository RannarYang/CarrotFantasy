class RoundModel extends Model{
	private roundInterval: number = 6000;
	private spawnInterval: number = 4000;
	private mRounds: Round[] = [];
	public constructor() {
		super();
	}
	public loadLevel(level: Level) {
		this.mRounds = level.rounds;
	}
	public get roundTotal(): number {
		return this.mRounds.length;
	}
	public startRound() {
		this.runRound();
	}
	private async runRound() {
		for(let i = 0, len = this.mRounds.length; i < len; i++) {
			let e: StartRoundArgs = new StartRoundArgs();
			e.roundIndex = i;
			e.roundTotal = this.roundTotal;
			this.sendEvent(Consts.E_StartRound, e);

			let round = this.mRounds[i];
			for(let j = 0, len = round.count; j < len; j++) {
				if(j != 0) {
					await Utils.TimeUtil.wait(this.spawnInterval);
				}
				let ee: SpawnMonsterArgs = new SpawnMonsterArgs();
				ee.monsterId = round.monster;
				this.sendEvent(Consts.E_SpawnMonster, ee);
				
			}

			await Utils.TimeUtil.wait(this.roundInterval);
		}
	}
}