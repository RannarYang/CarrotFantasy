class EgretTools {
	/**
	 * 循环播放egret.tween.TweenGroup动画
	 */
	public static playAnimation(target:egret.tween.TweenGroup,isLoop:boolean):void {
    if (isLoop) {
		for(var key in target.items)
			{
				target.items[key].props = {loop:true};
			}
		}
		target.play();
	}
}