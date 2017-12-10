class LuoBo extends Role{
	private hpImg: eui.Image;
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
		// 加入血量
		this.hpImg = new eui.Image('BossHP10');
		this.hpImg.anchorOffsetX = this.hpImg.width / 2;
		this.hpImg.anchorOffsetY = this.hpImg.height;
		this.hpImg.x = 30;
		this.hpImg.y = -60;
		this.addChild(this.hpImg);
		let info = ConfigurationTable.find(LuoboInfo, 'ID', 0);
		this.maxHp = info.HP;
		this.hp = info.HP;
	}
	public set hp(value: number) {
		this.hpImg.source = 'BossHP' + Utils.NumberUtil.fixNumberByAddZeroAtPrefix(value, 2);
	}
	public onUnSpawn() {
		super.onUnSpawn();
	}
	
}