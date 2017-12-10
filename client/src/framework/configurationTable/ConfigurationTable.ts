/**
 * 游戏内配置表的管理
 */
class ConfigurationTable {
	/*
    *从配置表中找到符合某条件数据,找到第一个立刻返回 
    * @param confName 配置表名
    * @param every  条件判断函数
    */
	public static find<T>(t: {new(): T},every:(item:T)=>boolean):T;
    /*
    *从配置表中找到符合某条件数据,找到第一个立刻返回 
    * @param confName 配置表名
    * @param key  关键属性名
    * @param value  关键值
    */
    public static find<T>(t: {new(): T},key:string,value:any):T;
	public static find<T>(t: {new(): T}, data: any, value?: any): T
	{
		let every : (item:T) => boolean;
		if (typeof data == 'string') {
			every = function(item:T):boolean{return item[data]==value};
		} else {
			every = data;
		}
		let confName = Utils.CommonUtil.getClassName(t);
		let conf : T[] = RES.getRes(confName);
		if(!conf) return null;
		let row: T = Utils.ArrayUtil.find(conf, every);
		if(!row) {
			return null;
		}
		return row;

	}
	/*
    *从配置表中找到符合某条件数据,找到第一个立刻返回 
    * @param confName 配置表名
    * @param key  关键属性名
    * @param value  关键值
    */
    public static findAll<T>(t: {new(): T},key:string,value:any):T[]
    /*
    *从配置表中找到所有符合某条件数据
    * @param confName 配置表名
    * @param every  条件判断函数
    */
    public static findAll<T>(t: {new(): T},every:(item:any)=>boolean):T[]
    public static findAll<T>(t: {new(): T},data:any,value?:any):T[]{
        let every:(item:any)=>boolean;
        if(typeof data == "string")
        {
            every = function(item:any):boolean{return item[data]==value};
        }else{
            every = data;
        }
		let confName = Utils.CommonUtil.getClassName(t);
        let conf : T[] = RES.getRes(confName);
        if(!conf)
            return [];
        let row:T[] = Utils.ArrayUtil.findAll(conf,every);
        return row;
    }
	/**
     * 获取配置表全部内容
     * @param confName 配置表名
     * 
     */
    public static getConfig<T>(t: {new(): T}):T[]{
		let confName = Utils.CommonUtil.getClassName(t);
        let conf:any[] = RES.getRes(confName);
        if(!conf)
            return null;
        return conf;
    }
	/**
     * @language zh_CN
     * 销毁配置资源的缓存数据,返回是否删除成功。
     * @param confName 配置文件中加载项的name属性或资源组名。
     * @param force 销毁一个资源组时其他资源组有同样资源情况资源是否会被删除，默认值 true。
     * @see #setMaxRetryTimes
     * @returns 是否销毁成功。
     * @version Egret 2.4
     * @platform Web,Native
     */
    public static destroyConfigRes<T>(t: {new(): T},force?: boolean):boolean{
		let confName = Utils.CommonUtil.getClassName(t);
        return RES.destroyRes(confName);
    }
	/**设置初始化配置 */
	public static initConfig() {
		
	}
}