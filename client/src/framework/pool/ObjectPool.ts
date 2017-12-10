class ObjectPool {
	/**
	 * 单例
	 */
	private static _instance: ObjectPool = null;
	public static getInstance(): ObjectPool {
		if(!this._instance) {
			this._instance = new ObjectPool();
		}
		return this._instance;
	}
	private _pools: { [key: string]: SubPool<any>; } = {};
	public constructor() {
	}
	public spawn<T extends IReusable>(t: {new(): T}){
		if(!this._pools[Utils.CommonUtil.getClassName(t)]) {
			this.registNew<T>(t);
		}
		let pool : SubPool<T> = this._pools[Utils.CommonUtil.getClassName(t)];
		return pool.spawn();
	}
	public unSpawn(obj) {
		for(var poolName in this._pools) {
			let pool = this._pools[poolName];
			if(pool.contains(obj)) {
				pool.unSpawn(obj);
				return;
			}
		}
	}
	public unSpawnAll() {
		for(var poolName in this._pools) {
			let pool = this._pools[poolName];
			pool.unSpawnAll();
		}
	}
	private registNew<T extends IReusable>(t: {new(): T}) {
		let pool: SubPool<T> = new SubPool<T>(t);
		this._pools[Utils.CommonUtil.getClassName(t)] = pool;
	}
}