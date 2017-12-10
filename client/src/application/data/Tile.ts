class Tile {
	public x: number;
	public y: number;
	/**
	 * 是否可以放置塔
	 */
	public canHold: boolean;
	/**
	 * 格子所保存的数据
	 */
	public data: any;
	public constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
	public toString() {
		return Utils.StringUtil.format("[X:$,Y:$,CanHold:$]", this.x, this.y, this.canHold)
	}
}