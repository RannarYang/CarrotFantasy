class SubPool<T extends ResuableObject> {
	private _type: {new(): T};
	private _objects: T[] = [];
	private _canUseIndexStack: number[] = [];
	public constructor(type: {new(): T}) {
		this._type = type;
	}
	/**
	 * 取对象
	 */
	public spawn(data?:any):T {
		let retObj: T;
		if (this._canUseIndexStack.length) {
			let index = this._canUseIndexStack.pop();
			retObj = this._objects[index];
		} else {
			retObj = new this._type();
			this._objects.push(retObj);
		}
		retObj.onSpawn(data);
		return retObj;
	}
	/**
	 * 回收对象
	 */
	public unSpawn(obj: T) {
		if (this.contains(obj)) {
			obj.onUnSpawn();
			let index = this._objects.indexOf(obj);
			this._canUseIndexStack.push(index);
		}
	}
	/**
	 * 回收所有对象
	 */
	public unSpawnAll() {
		let onUseIndexArr = Utils.ArrayUtil.getDeletionNums(this._canUseIndexStack, 0, this._objects.length-1);
		for(let i = 0, len = onUseIndexArr.length; i < len; i++) {
			let onUseIndex = onUseIndexArr[i];
			this._objects[onUseIndex].onUnSpawn();
			this._canUseIndexStack.push(onUseIndex);
		}
	}
	/**
	 * 是否包含某个对象
	 */
	public contains(obj) {
		return this._objects.indexOf(obj) != -1;
	}
}