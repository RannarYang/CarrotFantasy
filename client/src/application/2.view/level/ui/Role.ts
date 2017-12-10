abstract class Role extends eui.Component implements IReusable {
	// hp ==============================
	private _hp: number;
	public set hp(value: number) {
		value = Utils.NumberUtil.clamp(value, 0, this._maxHp);
		if(value == this._hp) return;
		this._hp = value;
		//发送血量变化的消息

		// 发送死亡的消息
	}
	public get hp(): number {
		return this._hp
	}
	// maxHp ==============================
	private _maxHp: number;
	public set maxHp(value: number) {
		value = Utils.NumberUtil.clamp(value, 0);
		this._maxHp = value;
	}
	public get maxHp(): number{
		return this._maxHp;
	}

	// isDead =============================
	public isDead(): boolean {
		return this._hp == 0;
	}

	// onDead =============================
	public abstract onDead();

	// position ==================================
	private _position: Point;
	public set position(value: Point) {
		this._position = value;
		this.x = value.x;
		this.y = value.y;
	}
	public get position(): Point {
		return this._position;
	}
	// damage ====================================
	public damage(hit: number) {
		if(this.isDead()) return;
		this.hp -= hit;
	}

	public onSpawn(): void{
        // this.Dead += OnDead;
    }

    public onUnSpawn(): void{
        this._hp = 0;
		this._maxHp = 0;
    }
}