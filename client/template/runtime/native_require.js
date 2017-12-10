
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/res/res.js",
	"libs/modules/eui/eui.js",
	"libs/modules/tween/tween.js",
	"promise/promise.js",
	"bin-debug/application/2.view/level/ui/Role.js",
	"bin-debug/framework/mvc/Model.js",
	"bin-debug/framework/mvc/View.js",
	"bin-debug/application/scene/SceneBase.js",
	"bin-debug/framework/mvc/ApplicationBase.js",
	"bin-debug/framework/mvc/Controller.js",
	"bin-debug/application/scene/StartScene.js",
	"bin-debug/application/1.model/RoundModel.js",
	"bin-debug/application/2.view/CompleteView.js",
	"bin-debug/application/2.view/EditorView.js",
	"bin-debug/application/2.view/SelectView.js",
	"bin-debug/application/2.view/StartView.js",
	"bin-debug/application/2.view/level/LevelView.js",
	"bin-debug/application/2.view/level/RoleView.js",
	"bin-debug/application/2.view/level/ui/LuoBo.js",
	"bin-debug/application/2.view/level/ui/Map.js",
	"bin-debug/application/2.view/level/ui/Monster.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/application/2.view/popup/CountDownView.js",
	"bin-debug/application/2.view/popup/MenuView.js",
	"bin-debug/application/2.view/ui/select/CardUI.js",
	"bin-debug/application/3.controller/CountDownCompleteCommand.js",
	"bin-debug/application/3.controller/EnterSceneCommand.js",
	"bin-debug/application/3.controller/ExitSceneCommand.js",
	"bin-debug/application/3.controller/StartLevelCommand.js",
	"bin-debug/application/3.controller/StartUpCommand.js",
	"bin-debug/application/args/SceneArgs.js",
	"bin-debug/application/args/SpawnMonsterArgs.js",
	"bin-debug/application/args/StartLevelArgs.js",
	"bin-debug/application/args/StartRoundArgs.js",
	"bin-debug/application/data/Card.js",
	"bin-debug/application/data/Level.js",
	"bin-debug/application/data/Point.js",
	"bin-debug/application/data/Round.js",
	"bin-debug/application/data/Tile.js",
	"bin-debug/application/scene/CompleteScene.js",
	"bin-debug/application/scene/EditorScene.js",
	"bin-debug/application/scene/LevelScene.js",
	"bin-debug/Main.js",
	"bin-debug/application/scene/SelectScene.js",
	"bin-debug/framework/utils/vec2.js",
	"bin-debug/application/staticData/BulletInfo.js",
	"bin-debug/application/staticData/LuoboInfo.js",
	"bin-debug/application/staticData/MonsterInfo.js",
	"bin-debug/application/staticData/StaticData.js",
	"bin-debug/application/staticData/TowerInfo.js",
	"bin-debug/application/tool/EgretTools.js",
	"bin-debug/application/tool/LevelTool.js",
	"bin-debug/application/tool/MapTool.js",
	"bin-debug/framework/config/SysConfig.js",
	"bin-debug/framework/configurationTable/ConfigurationTable.js",
	"bin-debug/framework/manager/FrameManager.js",
	"bin-debug/framework/manager/NoticeManager.js",
	"bin-debug/framework/manager/SoundManager.js",
	"bin-debug/framework/manager/popup/PopUpBase.js",
	"bin-debug/framework/manager/popup/PopUpEnum.js",
	"bin-debug/framework/manager/popup/PopUpManager.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/application/Consts.js",
	"bin-debug/framework/mvc/IDispose.js",
	"bin-debug/application/Game.js",
	"bin-debug/framework/mvc/MVC.js",
	"bin-debug/application/1.model/GameModel.js",
	"bin-debug/framework/pool/IReusable.js",
	"bin-debug/framework/pool/ObjectPool.js",
	"bin-debug/framework/pool/ResuableObject.js",
	"bin-debug/framework/pool/SubPool.js",
	"bin-debug/framework/scene/IState.js",
	"bin-debug/framework/scene/StateBase.js",
	"bin-debug/framework/scene/StateManager.js",
	"bin-debug/framework/utils/ArrayUtil.js",
	"bin-debug/framework/utils/CommonUtil.js",
	"bin-debug/framework/utils/DisplayUtil.js",
	"bin-debug/framework/utils/Log.js",
	"bin-debug/framework/utils/md5.js",
	"bin-debug/framework/utils/MovieClip.js",
	"bin-debug/framework/utils/NumberUtil.js",
	"bin-debug/framework/utils/StringUtil.js",
	"bin-debug/framework/utils/TimeUtil.js",
	"bin-debug/LoadingUI.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 960,
		contentHeight: 640,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};