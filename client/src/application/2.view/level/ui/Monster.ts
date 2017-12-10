class Monster extends Role{
	private _moveSpeed: number;
	private _path: Point[];
	// 当前拐点索引
	private _pointIndex: number = -1;
	private _isReached: boolean;
	public constructor() {
		super();
	}
	public onDead() {
	}
	public load(path: Point[]) {
		this._path = path;
		this.moveNext();
	}
	private hasNext() {
		return (this._pointIndex + 1) < this._path.length;
	}
	private moveNext() {
		if(!this.hasNext()) return;
		if(this._pointIndex == -1) {
			// 刚刚出来，放在起点的位置
			this._pointIndex = 0;
			this.moveTo(this._path[this._pointIndex]);
		} else {
			let nowPoint = this._path[this._pointIndex];
			this._pointIndex++;
			let nextPoint = this._path[this._pointIndex];
			let des = nowPoint.x == nextPoint.x ? Math.abs(nextPoint.y - nowPoint.y) : Math.abs(nextPoint.x - nowPoint.x);
			let sec = des / this._moveSpeed * 1000;
			egret.Tween.get(this)
			.to({x: nextPoint.x, y: nextPoint.y}, sec)
			.call(()=>{
				if(this.hasNext()) {
					this.moveNext();
				} else {
					this._isReached = true;
					// 删除自己
					this.onUnSpawn();
				}
			})
		}
	}
	private moveTo(pos: Point) {
		this.position = pos;
		this.moveNext();
	}
	public onSpawn(monsterId ?: number) {
		super.onSpawn();
		// 播放idle动画
		let mv = Utils.DisplayUtil.showMovie('monster0' + monsterId, this, 0, 0, -1);
		mv.onLoadComplete = function() {
			this.anchorOffsetX = this.width / 2;
			this.anchorOffsetY = this.height / 2;
		}
		let info = ConfigurationTable.find(MonsterInfo, 'ID', monsterId);
		this.maxHp = info.HP;
		this.hp = info.HP;
		this._moveSpeed = info.MoveSpeed;
	}
	public onUnSpawn() {
		super.onUnSpawn();
		Utils.DisplayUtil.removeFromParent(this);
	}
}