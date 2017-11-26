abstract class Model {
	public abstract name: string;
	public constructor() {
	}
	protected sendEvent(eventName: string, data: any = null){
		MVC.sendEvent(eventName, data);
	} 
}