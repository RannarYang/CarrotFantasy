class StaticData {
	private static _instance : StaticData = null;
    public static getInstance() {
        if(!this._instance) {
            this._instance = new StaticData();
        }
        return this._instance;
    }
}