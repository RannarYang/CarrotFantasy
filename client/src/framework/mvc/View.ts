abstract class View extends eui.Component implements IDispose{
	public constructor() {
		super();
	}
	protected childrenCreated() {
		super.childrenCreated();
		MVC.registView(this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);
	}

	public attentionEvents: string[] = [];
	public registEvent() : void{

	}
	public handleEvent(eventName: string, data: any): void {

	}
	private dispose() {
		MVC.unRegistView(this);
		this.onDispose();
	}
	public abstract onDispose();
	protected GetModel<T extends Model>(c: {new(): T}): T {
	   return <T>(MVC.GetModel<T>(c));
    }
	protected sendEvent(eventName: string, data: any = null) {
		MVC.sendEvent(eventName, data);
	}
}