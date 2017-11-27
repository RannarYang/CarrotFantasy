abstract class ResuableObject implements IReusable {
	public abstract onSpawn(): void;
	public abstract onUnSpawn(): void;
}
