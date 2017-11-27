abstract class ApplicationBase{
	protected registController<T extends Controller>(eventName: string, type: { new(): T }) {
		MVC.registController<T>(eventName, type);
	}
	protected sendEvent(eventName: string, data: any = null){
		MVC.sendEvent(eventName, data);
	} 
}