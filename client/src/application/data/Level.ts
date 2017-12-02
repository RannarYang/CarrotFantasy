class Level {
	public name: string;
	public cardImage: string;
	public background: string;
	public road: string;
	public initScore: number;
	/**
	 * 炮塔可以放置的位置
	 */
	public holder: Point[] = [];
	/**
	 * 怪物行走的路径
	 */
	public path: Point[] = [];
	/**
	 * 出怪回合信息
	 */
	public rounds: Round[] = [];
}