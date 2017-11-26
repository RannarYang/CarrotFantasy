/**
 * 状态模式接口
 */
interface IState {
	getStateName();
    // state begin
    stateBegin();
    // state end
    stateEnd();
    // state update
    stateUpdate();
}