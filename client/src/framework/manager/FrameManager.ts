class FrameManager extends egret.HashObject {

    private maxID:number = 0;
    private _callList:{[key:number]:(timeStamp: number) => boolean} = {};

    public constructor() {
        super();
    }

    //注册并启动一个计时器，通常会以60FPS的速率触发回调方法，并传入当前时间戳。注意：注册后将会持续触发回调方法，若要停止回调，需要手动调用stopTick()方法。
    public startTick(callBack: (timeStamp: number) => boolean, thisObject: any):void{
        let _callBack = callBack;
        let _thisObject = thisObject;
        egret.startTick(_callBack,_thisObject);
    }

    //停止之前用 startTick() 方法启动的计时器。
    public stopTick(callBack: (timeStamp: number) => boolean, thisObject: any):void{
        let _callBack = callBack;
        let _thisObject = thisObject;
        egret.stopTick(_callBack,_thisObject);
    }

    /*
    *延迟X帧执行
    *
    */
    public delayCall(handler: Function,thisObject: any,delayframe?: any, ...args):number
    {
        let _delayframe = delayframe ? delayframe : 1;
        let _handler = handler;
        let _args = args;
        let _thisObj = thisObject;
        let id = this.maxID++;
        let callList = this._callList;
        egret.startTick(onTick,null);
        function onTick(timeStamp: number):any{
            if(_delayframe>0)
            {
                _delayframe--;
                return true;
            }
            _handler.call(_thisObj,..._args);
            egret.stopTick(onTick,null);
            delete callList[id];
            return true;
        }
        callList[id] = onTick;
        return id;
    }

    /**	设定间隔时间发生的函数 */
    public setInterval(handler: Function,thisObject: any,delayframe?: any, ...args): number {
        let _delayframe = delayframe ? delayframe : 1;
        let _handler = handler;
        let _args = args;
        let _thisObj = thisObject;
        let _tempframe = _delayframe;
        let id = this.maxID++;
        let callList = this._callList;
        egret.startTick(onTick,null);
        function onTick(timeStamp: number):any{
            if(_tempframe>0)
            {
                _tempframe--;
            }else{
                _tempframe = _delayframe;
                _handler.call(_thisObj, ..._args);
            }
            return true;
        }
        callList[id] = onTick;
        return id;
    }

    /**清除已经没有用的回调*/
    public clearForId(handle: number): void {
        let callList = this._callList;
        let id = handle;
        if(callList[id])
        {
            let func = callList[id];
            egret.stopTick(func,null);
            delete callList[id];
        }
    }
}