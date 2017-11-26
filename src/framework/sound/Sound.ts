class Sound {
	private static _instance : Sound = null;
	public static getInstance(): Sound {
		if(!this._instance) {
			this._instance = new Sound();
		}
		return this._instance;
	}
	public constructor() {
	}
	public set bgVolume(value) {

	}
	public set effectVolume(value) {

	}
	public playBg(audioName: string) {

	}
	public stopBg() {

	}
	public playEffect(audioName: string) {

	}
	
}