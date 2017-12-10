abstract class ResuableObject implements IReusable {
	public abstract onSpawn(data?:any): void;
	public abstract onUnSpawn(): void;
}
