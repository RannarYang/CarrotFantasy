// 静态类
class MVC {
	private static views: { [key: string]: View; } = {};
	private static models: { [key: string]: Model;} = {};
	private static commandMaps: { [key: string]: {new(): Controller};} = {};

	// register =======================================
	public static registView(view: View) {
		let viewName = Utils.CommonUtil.getClassNameByObj(view);
		if(this.views[viewName]) return;
		this.views[viewName] = view;
		view.registEvent();
	}
	public static unRegistView(view: View) {
		let viewName = Utils.CommonUtil.getClassNameByObj(view);
		if(this.views[viewName]) {
			delete this.views[viewName];
		}
	}
	public static registModel(model: Model) {
		let modelName = Utils.CommonUtil.getClassNameByObj(model);
		if(this.models[modelName]) return;
		this.models[modelName] = model;
	}
	public static registController<T extends Controller>(eventName: string, type: { new(): T }) {
		this.commandMaps[eventName] = type;
	}

	// get =======================================
	public static GetModel<T extends Model>(c: {new(): T}): T {
        for (var key in this.models) {	
			let model = this.models[key];
			if (model instanceof c)
                return <T>model;
        }
		throw new Error("找不到对应的model，可能原因：1、传入的模型类" + c.toString() + "不正确，2、模型未注册")
    }
	
	public static GetView<T extends View>(c: {new(): T}) : T {
        for (var key in this.views) {
            let view = this.views[key];
			if (view instanceof c)
                return <T>view;
        }
		throw new Error("找不到对应的view，可能原因：1、传入的视图类" + c.toString() + "不正确，2、视图未注册")
    }

	// 发送事件 =======================================
	public static sendEvent(eventName: string, data: any = null) {
		// 控制器处理事件
		if (this.commandMaps[eventName]) {
			let controller: Controller = new this.commandMaps[eventName];
			controller.execute(data);
		}
		// 视图响应事件 === 此处遍历所有的view中的所有的关心的事件，待优化(使用消息机制)
		for ( var key in this.views) {
			let view = this.views[key];
			if (view.attentionEvents.indexOf(eventName) != -1) {
				view.handleEvent(eventName, data);
			}
		}
		

	}
}