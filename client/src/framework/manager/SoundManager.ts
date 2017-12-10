class SoundManager {
	// 单例 ================
	private static _instance : SoundManager = null;
	public static getInstance() {
		if(!this._instance) {
			this._instance = new SoundManager();
		}
		return this._instance;
	}
}