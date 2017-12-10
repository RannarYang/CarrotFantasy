class LuoBo extends Role{
	public damage(hit: number) {
		super.damage(hit);
		// 播放受伤动画
	}
	public onDead() {
	}
	public onSpawn() {
		super.onSpawn();
		// 播放idle动画
		let mv = Utils.DisplayUtil.showMovie('luobo_idle', this, 0, 0, -1);
		mv.onLoadComplete = function() {
			this.anchorOffsetX = this.width / 2;
			this.anchorOffsetY = this.height;
		}
		let info = ConfigurationTable.find(LuoboInfo, 'ID', 0);
		this.maxHp = info.HP;
		this.hp = info.HP;
	}
	public onUnSpawn() {
		super.onUnSpawn();
	}
	
}