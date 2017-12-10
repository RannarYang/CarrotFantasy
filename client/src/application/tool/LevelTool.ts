module Tools {
	export class LevelTool {
		/**
		 * 解析xml文件,以后弄个通用解析类 xml to Level
		 */
		/*
		public static getLevelFromXML(levelNum: number): Level {
			let level = new Level();

			let levelBuf: ArrayBuffer = RES.getRes('level' + levelNum);
			let levelString = decodeURI(String.fromCharCode.apply(null, new Uint8Array(levelBuf)));
			let levelXML = egret.XML.parse(levelString);

			for(let i = 0, len = levelXML.children.length; i < len; i++) {
				let levelChildXML: egret.XML = <egret.XML>levelXML.children[i];
				switch(levelChildXML.name){
					case 'Name':
						level.name = (<egret.XMLText>levelChildXML.children[0]).text;
						break;
					case 'CardImage':
						level.cardImage = (<egret.XMLText>levelChildXML.children[0]).text;
						break;
					case 'Background':
						level.background = (<egret.XMLText>levelChildXML.children[0]).text;
						break;
					case 'Road':
						level.road = (<egret.XMLText>levelChildXML.children[0]).text;
						break;
					case 'InitScore':
						level.initScore = parseInt((<egret.XMLText>levelChildXML.children[0]).text);
						break;
					case 'Holder':
						level.holder = [];
						for(let j = 0, len = levelChildXML.children.length; j < len; j++) {
							let pointDef: egret.XML = <egret.XML>levelChildXML.children[j];
							let x = parseInt(pointDef.attributes['X']);
							let y = parseInt(pointDef.attributes['Y']);
							let point = new Point(x, y);
							level.holder.push(point);
						}
						break;
					case 'Path':
						level.path = [];
						for(let j = 0, len = levelChildXML.children.length; j < len; j++) {
							let pointDef: egret.XML = <egret.XML>levelChildXML.children[j];
							let x = parseInt(pointDef.attributes['X']);
							let y = parseInt(pointDef.attributes['Y']);
							let point = new Point(x, y);
							level.path.push(point);
						}
						break;
					case 'Rounds':
						level.rounds = [];
						for(let j = 0, len = levelChildXML.children.length; j < len; j++) {
							let roundDef: egret.XML = <egret.XML>levelChildXML.children[j];
							let monster = parseInt(roundDef.attributes['Monster']);
							let count = parseInt(roundDef.attributes['Count']);
							let round = new Round(monster, count);
							level.rounds.push(round);
						}
						break;
				}
			}
			return level;
		}
		*/
		
		public static getLevelFromJSON(levelNum: number): Level {
			let levelBuf: ArrayBuffer = RES.getRes('level' + levelNum);
			if(!levelBuf) {
				return null;
			}
			let levelString = decodeURI(String.fromCharCode.apply(null, new Uint8Array(levelBuf)));
			let level : Level = <Level>JSON.parse(JSON.parse(levelString));
			return level;
		}
		public static saveLevelToJSON(levelNum: number, level: Level) {
			let lvJSON = JSON.stringify(level); 
			var blob = new Blob([JSON.stringify(lvJSON)], { type: 'text/plain;charset=utf-8' });
			console.log('level' + levelNum + '.json >>>>>>>>>>>>>>', JSON.parse(lvJSON)); 
			var reader = new FileReader();
			reader.onloadend = function(e) { 
				var link = document.createElement("a");
				let target: any = e.target;
				link.href = target.result;
				link.download = 'level' + levelNum + '.text';
				link.click(); 
			};
			reader.readAsDataURL(blob); 
		} 
		
	}
}
