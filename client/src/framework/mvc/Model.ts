abstract class Model {
	public constructor() {
	}
	protected sendEvent(eventName: string, data: any = null){
		MVC.sendEvent(eventName, data);
	} 
}