class RoleView extends View{
	private _map: Map;
	private _luobo: LuoBo;
	public constructor() {
		super();
	}
	protected createChildren() {
		super.createChildren();
		this.skinName = RoleSkin;
	}
	protected childrenCreated() {
		super.childrenCreated();
		this.init();
	}
	private init() {
		let gModel = this.GetModel(GameModel);
		let level = gModel.getPlayLevel();
		this._map = new Map(level);
		this.addChild(this._map);

		
		this.spawnLuobo();
	}
	public registEvent() : void{
	}
	public handleEvent(eventName: string, data: any): void {
		switch(eventName) {
		}
	}
	/**
	 * 创建萝卜
	 */
	private spawnLuobo() {
		let paths = this._map.path;
		let pos = paths[paths.length - 1];
		let luobo: LuoBo = Game.getInstance().objectPool.spawn(LuoBo);
		luobo.position = pos;
		this._luobo = luobo;
		this.addChild(luobo);
	}
	/**
	 * 创建怪物
	 */
	private spawnMonster(monsterId: number) {

	}
	/**
	 * 创建塔
	 */
	private spawnTower(pos: Point, towerID: number) {

	}
	public onDispose(){

	}
	
}