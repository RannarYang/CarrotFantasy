abstract class View extends eui.Component implements IDispose{
	public abstract name: string;
	public constructor() {
		super();
	}
	protected childrenCreated() {
		super.childrenCreated();
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);
	}
	public attentionEvents: string[];
	public registEvent() : void{

	}
	public handleEvent(eventName: string, data: any): void {

	}
	public abstract dispose();
	protected GetModel<T extends Model>(c: {new(): T}): T {
	   return <T>(MVC.GetModel<T>(c));
    }
	protected sendEvent(eventName: string, data: any = null) {
		MVC.sendEvent(eventName, data);
	}
}