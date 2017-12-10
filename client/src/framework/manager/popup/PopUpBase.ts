/**
 * 弹出窗口基类
 */
abstract class PopUpBase extends View{
	public abstract name: string;
	public constructor() {
		super();
	}
	public abstract onDispose();

	public close() {
		let parent = this.parent;
		parent && parent.removeChild(this);
	}
}