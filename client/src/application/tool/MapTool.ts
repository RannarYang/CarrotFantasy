module Tools {
	export class MapTool {
		private static rowCount: number = 8;
		private static columnCount: number = 12;
		private static width: number = 960;
		private static height: number = 640;
		private static tileWidth: number = 80;
		private static tileHeight: number = 80;
		/**
		 * 根据坐标获取点击的格子
		 */
		public static getGridByPoint(x, y): Point {
			let pointX = Math.floor(x / this.tileWidth);
			let pointY = Math.floor(y / this.tileHeight);
			return new Point(pointX, pointY);
		}
		/**
		 * 根据坐标获取点击的格子在数组中的顺序
		 */
		public static getGridIndexByPoint(x, y) : number{
			let pointX = Math.floor(x / this.tileWidth);
			let pointY = Math.floor(y / this.tileHeight);
			return pointX + pointY * this.rowCount;
		}
		/**
		 * 根据格子获取格子在数组中的顺序
		 */
		public static getGridIndexByGrid(grid: Point): number {
			return grid.x + grid.y * this.rowCount;
		}
		/**
		 * 根据坐标获取点击的格子的左上角的坐标
		 */
		public static getGridLeftCornerPointByPoint(x, y): Point{
			let pointX = Math.floor(x / this.tileWidth) * this.tileWidth;
			let pointY = Math.floor(y / this.tileHeight) * this.tileHeight;
			return new Point(pointX, pointY);
		}
		/**
		 * 根据格子获取格子左上角的坐标
		 */
		public static getGridLeftCornerPointByGrid(grid: Point): Point {
			return new Point(grid.x * this.tileWidth, grid.y * this.tileHeight);
		}
		/**
		 * 根据坐标获取点击的格子的中点的坐标
		 */
		public static getGridCenterPointByPoint(x, y): Point {
			let pointX = Math.floor(x / this.tileWidth) * this.tileWidth + this.tileWidth / 2;
			let pointY = Math.floor(y / this.tileHeight) * this.tileHeight + this.tileHeight / 2;
			return new Point(pointX, pointY);
		}
		/**
		 * 根据格子获取点击的格子的左上角的坐标
		 */
		public static getGridCenterPointByGrid(grid: Point): Point {
			let pointX = grid.x * this.tileWidth + this.tileWidth / 2;
			let pointY = grid.y * this.tileHeight + this.tileHeight / 2;
			return new Point(pointX, pointY);
		}
		/**
		 * 点是否在数组中
		 */
		public static pointInArr(point: Point, arr: Point[]): boolean {
			return arr.some((value:Point, index: number, arr: Point[])=>{
				return (value.x == arr[index].x && value.y == arr[index].y) 
			})
		}
		
	}
}