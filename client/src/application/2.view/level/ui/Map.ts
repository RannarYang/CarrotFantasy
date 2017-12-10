class Map extends eui.Component{
	private _level: Level;
	private bgImg: eui.Image;
	private roadImg: eui.Image;

	public mapWidth: number;
	public mapHeight: number;
	public tileWidth: number;
	public tileHeight: number;

	public rowCount: number = 8;
	public columnCount: number = 12;
	/**
	 * 格子集合
	 */
	private _grid: Tile[] = [];
	/**
	 * 路径集合
	 */
	private _road: Tile[] = [];
	/**
	 * 怪物的寻路路径
	 */
	private _path: Point[];
	public get path() : Point[] {
		if(!this._path) {
			let movepath: Point[] = [];
			for(let i = 0, len = this._road.length; i < len; i++) {
				let t: Tile = this._road[i];
				let point: Point = Tools.MapTool.getGridCenterPointByGrid(t);
				movepath.push(point);
			}
			this._path = movepath;
		}
		return this._path;
	}
	protected createChildren() {
		super.createChildren();
		this.skinName = MapSkin;
	}
	protected childrenCreated() {
		super.childrenCreated();
		this.init();
	}
	public constructor(level: Level) {
		super();
		this._level = level;
	}
	private init() {
		this.calculateSize();
		for(let i = 0; i < this.rowCount; i++) {
			for(let j = 0; j < this.columnCount; j++) {
				this._grid.push(new Tile(j, i));
			}
		}
		this.loadLevel(this._level);

		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTileClick, this);
	}
	private calculateSize() {
		this.mapWidth = 960;
		this.mapHeight = 640;
		this.tileWidth = this.mapWidth / this.columnCount;
		this.tileHeight = this.mapHeight / this.rowCount;
	}
	private loadLevel(level: Level) {
		// 设置背景图片
		this.bgImg.source = level.background;
		this.roadImg.source = level.road;

		// 寻路点
		for(let i = 0, len = level.path.length; i < len; i++ ) {
			let p: Point = level.path[i];
			let t: Tile = this.getTile(p.x, p.y);
			this._road.push(t);
		}
		// 炮塔点
		for(let i = 0, len = level.holder.length; i < len; i++) {
			let p: Point = level.holder[i];
			let t: Tile = this.getTile(p.x, p.y);
			t.canHold = true;
		}
	}

	private onTileClick(evt: egret.TouchEvent) {
		
	}
	// 辅助方法 =====================================================
	public getTile(tileX, tileY): Tile {
		let index = tileX + tileY * this.columnCount;
		if(index < 0 || index >= this._grid.length) {
			Log.error("格子索引越界");
		}
		return this._grid[index];
	}
}