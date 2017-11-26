class SceneBase extends eui.UILayer implements IState{
	private _stateName: string = "SceneBase";
    private _controller: StateManager ;
	public constructor(sceneManager) {
		super();
		this._controller = sceneManager;
	}
	public getStateName() {
        return this._stateName;
    }
	public stateBegin() {
		// 进入新场景
		let e: SceneArgs = new SceneArgs();
		e.sceneClass = SceneBase;
		MVC.sendEvent(Consts.E_EnterScene, e);
	}
    public stateEnd(){
		// 退出旧场景
		let e: SceneArgs = new SceneArgs();
		e.sceneClass = SceneBase;
		MVC.sendEvent(Consts.E_ExitScene, e);

		// 删除自身
		this.parent.removeChild(this);
	}
    public stateUpdate() {}
}