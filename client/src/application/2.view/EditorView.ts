class EditorView extends View{
	private levelNum: eui.EditableText;
	private levelText: eui.EditableText;
	private bgImg: eui.Image;
	private roadImg: eui.Image;
	private cardImg: eui.Image;
	private bgImgText: eui.EditableText;
	private roadImgText: eui.EditableText;
	private cardImgText: eui.EditableText;
	private scoreText: eui.EditableText;
	private rounds: Round[] = [new Round(1, 1)];

	private roundList: eui.List;

	private holderPathSwitch: eui.ToggleSwitch;
	private holderGroup: eui.Group;
	private pathGroup: eui.Group;
	private shape: egret.Shape = new egret.Shape();
	private pathArr: string[] = [];
	private luobo: eui.Image;

	private btnReturn: eui.Button;
	private btnSetMap: eui.Button;
	private btnSetAttr: eui.Button;
	private btnSave: eui.Button;
	private btnLoad: eui.Button;
	
	private btnAdd: eui.Label;
	public constructor() {
		super();
	}
	protected createChildren() {
		super.createChildren();
		this.skinName = EditorSkin;
	}
	protected childrenCreated() {
		super.childrenCreated();
		this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoStart, this);
		this.btnSetMap.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSetMap, this);
		this.btnSetAttr.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSetAttr, this);
		this.btnSave.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSave, this);
		this.btnLoad.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLoad, this);
		this.bgImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapMap, this);

		this.bgImgText.addEventListener(egret.Event.CHANGE, this.onBgImgChange, this);
		this.cardImgText.addEventListener(egret.Event.CHANGE, this.onCardImgChange, this);
		this.roadImgText.addEventListener(egret.Event.CHANGE, this.onRoadImgChange, this);

		this.roundList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapRound, this);
		this.roundList.addEventListener(egret.TouchEvent.FOCUS_OUT, this.onFocusOut, this);
		this.roundList.itemRenderer = EditorRoundItemRender;
		this.roundList.dataProvider = new eui.ArrayCollection(this.rounds);
		this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAdd, this);

		this.pathGroup.addChildAt(this.shape, 0);
		this.shape.graphics.lineStyle(5, 0xff0000, 1);
		this.luobo.visible = false;
	}
	private onBgImgChange() {
		this.bgImg.source = this.bgImgText.text;
	}
	private onCardImgChange() {
		this.cardImg.source = this.cardImgText.text;
	}
	private onRoadImgChange() {
		this.roadImg.source = this.roadImgText.text;
	}
	private onTapMap(evt) {
		let grid : Point = Tools.MapTool.getGridByPoint(evt.stageX, evt.stageY);
		if(this.holderPathSwitch.selected) {
			//按下ctrl键，画线路
			let index = this.pathArr.indexOf(grid.x + '-' + grid.y);
			let centerPoint = Tools.MapTool.getGridCenterPointByGrid(grid);
			if( index != -1) {
				// 删除点， 重新绘制
				this.removePointInPath(index);
			} else {
				// 增加点
				this.addPointInPath(grid);
			}
		} else {
			//设置可放塔点
			let holder = this.holderGroup.getChildByName(grid.x + '-' + grid.y);
			if(!holder) {
				this.setHolder(grid)
			} else {
				this.clearHolder(holder);
			}
			
		}
	}
	private setHolder(grid:Point) {
		let gridCenter: Point = Tools.MapTool.getGridCenterPointByGrid(grid);
		let holderImg: eui.Image = new eui.Image('holder');
		holderImg.name = grid.x + '-' + grid.y;
		holderImg.anchorOffsetX = 36;
		holderImg.anchorOffsetY = 36;
		holderImg.x = gridCenter.x;
		holderImg.y = gridCenter.y;
		this.holderGroup.addChild(holderImg);
	}
	private clearHolder(target: egret.DisplayObject) {
		Utils.DisplayUtil.removeFromParent(target);
	}
	private removePointInPath(index) {
		this.pathArr.splice(index, 1);
		this.setPath();
	}
	private setPath() {
		this.shape.graphics.clear();
		this.shape.graphics.lineStyle(5, 0xff0000, 1);
		for(let i = 0, len = this.pathArr.length; i < len; i++) {
			let path = this.pathArr[i].split('-');
			let grid = new Point(parseInt(path[0]), parseInt(path[1]));
			let centerPoint = Tools.MapTool.getGridCenterPointByGrid(grid);
			this.shape.graphics.lineTo(centerPoint.x, centerPoint.y);
		}
		if(this.pathArr.length >= 1) {
			// 画萝卜
			let path = this.pathArr[this.pathArr.length-1].split('-');
			let grid = new Point(parseInt(path[0]), parseInt(path[1]));
			let centerPoint = Tools.MapTool.getGridCenterPointByGrid(grid);
			this.luobo.anchorOffsetX = this.luobo.width / 2;
			this.luobo.anchorOffsetY = this.luobo.height / 2;
			this.luobo.x = centerPoint.x;
			this.luobo.y = centerPoint.y;
			this.luobo.visible = true;
		} else {
			this.luobo.visible = false;
		}
	}
	private addPointInPath(grid) {
		this.pathArr.push(grid.x + '-' + grid.y);

		let centerPoint = Tools.MapTool.getGridCenterPointByGrid(grid);
		this.shape.graphics.lineTo(centerPoint.x, centerPoint.y);
		// 画萝卜
		this.luobo.anchorOffsetX = this.luobo.width / 2;
		this.luobo.anchorOffsetY = this.luobo.height / 2;
		this.luobo.x = centerPoint.x;
		this.luobo.y = centerPoint.y;
		this.luobo.visible = true;
	}
	private onTapRound(evt: TouchEvent) {
		let selectedIndex = this.roundList.selectedIndex;
		let name = (<any>evt.target).name;
		switch(name) {
			case 'btnDelete':
				this.rounds.splice(selectedIndex, 1);
				this.roundList.dataProvider = new eui.ArrayCollection(this.rounds);
				break;
			case 'btnAdd':
				this.rounds.splice(selectedIndex + 1, 0, new Round(1, 1));
				this.roundList.dataProvider = new eui.ArrayCollection(this.rounds);
				break;
		}
	}
	private onAdd() {
		this.rounds.splice(0, 0, new Round(1,1));
		this.roundList.dataProvider = new eui.ArrayCollection(this.rounds);
		this.roundList.dataProviderRefreshed();
	}
	private onFocusOut(evt: TouchEvent) {
		let selectedIndex = this.roundList.selectedIndex;
		let name = (<any>evt.target).name;
		switch(name) {
			case 'monsterIdText':
				this.rounds[selectedIndex].monster = parseInt((<any>evt.target).text);
				break;
			case 'countText':
				this.rounds[selectedIndex].count = parseInt((<any>evt.target).text);
				break;
		}
	}
	private gotoStart() {
		Game.getInstance().loadScene(StartScene);
	}
	private onSetMap() {
		this.currentState = 'mapState';
	}
	private onSetAttr() {
		this.currentState = 'attrState';
	}

	private onSave() {
		let level: Level = new Level();
		let levelNum = parseInt(this.levelNum.text);
		level.name = this.levelText.text;
		level.background = <string>this.bgImg.source;
		level.road = <string>this.roadImg.source;
		level.cardImage = <string>this.cardImg.source;
		level.initScore = parseInt(this.scoreText.text);
		level.rounds = this.rounds;
		// 设置holder
		let holder: Point[] = [];
		for(let i = 0, len = this.holderGroup.numChildren; i < len; i++) {
			let holderImg: eui.Image = <eui.Image>this.holderGroup.getChildAt(i);
			let pointArr = holderImg.name.split('-');
			let pointX = parseInt(pointArr[0]);
			let pointY = parseInt(pointArr[1]);
			let point = new Point(pointX, pointY);
			holder.push(point);
		}
		level.holder = holder;
		// 设置path
		let paths: Point[] = [];
		for(let i = 0, len = this.pathArr.length; i < len; i++) {
			let path = this.pathArr[i].split('-');
			paths.push(new Point(parseInt(path[0]), parseInt(path[1])))
		}
		level.path = paths;
		Tools.LevelTool.saveLevelToJSON(levelNum, level);
	}
	private onLoad() {
		let levelNum = parseInt(this.levelNum.text);
		let level = Tools.LevelTool.getLevelFromJSON(levelNum);
		if(!level) {
			Game.getInstance().noticeManager.addError("关卡未被编辑，加载不成功！");
			return;
		}
		this.levelText.text = level.name;
		
		this.roadImgText.text = this.roadImg.source = level.road;
		this.bgImgText.text = this.bgImg.source = level.background;
		this.cardImgText.text = this.cardImg.source = level.cardImage;

		this.scoreText.text = level.initScore + '';
		this.rounds = level.rounds;
		this.roundList.dataProvider = new eui.ArrayCollection(this.rounds);
		// 设置holder
		this.holderGroup.removeChildren();
		for(let i = 0, len = level.holder.length; i < len; i++) {
			this.setHolder(level.holder[i]);
		}

		// 设置path
		this.pathArr = [];
		for(let i = 0, len = level.path.length; i < len; i++) {
			let grid = level.path[i];
			this.pathArr.push(grid.x + '-' + grid.y);
		}
		this.setPath();
	}
	public onDispose() {

	}
}

class EditorRoundItemRender extends eui.ItemRenderer {
	private monsterIdText: eui.TextInput;
	private countText: eui.EditableText;
	protected childrenCreated() {
		super.childrenCreated();
	}

	public dataChanged() {
		super.dataChanged();
		let round: Round = <Round>this.data;
		this.monsterIdText.text = round.monster + "";
		this.countText.text = round.count + "";
	}
}