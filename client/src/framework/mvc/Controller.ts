abstract class Controller {
	public constructor() {
	}
	protected GetModel<T extends Model>(t: {new(): T}): T {
	   return <T>(MVC.GetModel<T>(t));
    }
	protected GetView<T extends View>(t: {new(): T}): T {
	   return <T>(MVC.GetView<T>(t));
    }
	protected registModel(model: Model) {
		MVC.registModel(model);
	}
	protected registView(view: View) {
		MVC.registView(view);
	}
	protected registController<T extends Controller>(eventName: string, type: { new(): T })  {
		MVC.registController(eventName, type);
	}
	protected static registController<T extends Controller>(eventName: string, type: { new(): T }) {
		MVC.registController<T>(eventName, type);
	}
	public abstract execute(data);
}