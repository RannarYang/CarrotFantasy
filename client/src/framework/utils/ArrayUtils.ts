class ArrayUtils {
	/**
	 * 去重
	 */
	public static removeRepeat(a: any[]) {
		var r = [];
		for(var i = 0; i < a.length; i ++) {
			var flag = true;
			var temp = a[i];
			for(var j = 0; j < r.length; j ++) {
				if(temp === r[j]) {
					flag = false;
					break;
				}
			}
			if(flag) {
				r.push(temp);
			}
		}
		return r;
	}

	/**
	 * 交集
	 */
	public static intersection(a: any[], b: any[]) {
		var result = [];
		for(var i = 0; i < b.length; i ++) {
			var temp = b[i];
			for(var j = 0; j < a.length; j ++) {
				if(temp === a[j]) {
					result.push(temp);
					break;
				}
			}
		}
		return this.removeRepeat(result);
	}
	/**
	 * 并集
	 */
	public static union(a : any[], b: any[]) {
		return this.removeRepeat(a.concat(b));
	}
	/**
	 * 差集
	 */
	public static difference(a: any[], b: any[]) {
		//clone = a
		var clone = a.slice(0);
		for(var i = 0; i < b.length; i ++) {
			var temp = b[i];
			for(var j = 0; j < clone.length; j ++) {
				if(temp === clone[j]) {
					//remove clone[j]
					clone.splice(j,1);
				}
			}
		}
		return this.removeRepeat(clone);
	}

	/**
	 * 获得区间范围内缺失的整数数据 eq: [1,2,4,5],0,8  => 0, 3, 6, 7, 8
	 */
	public static getDeletionNums(a: number[], min: number, max: number): number[] {
		let resArr: number[] = [];
		let lastIndex = 0;
		for (let i = min; i <= max; i++) {
			if(a[lastIndex] !== i) {
				resArr.push(i);
			} else {
				lastIndex++;
			}
		}
		return resArr;
	}
}