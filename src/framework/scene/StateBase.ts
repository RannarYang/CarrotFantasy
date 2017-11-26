class StateBase implements IState {
	private _stateName: string = "StartState";
    private _controller: StateManager ;
    constructor(controller: StateManager){
        this._controller = controller;
    }
    public getStateName() {
        return this._stateName;
    }
    public stateBegin() {}
    public stateEnd(){}
    public stateUpdate() {}
}