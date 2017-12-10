class Log {
	public static error(...args) {
		if(!SysConfig.SHOW_LOG) return false;
		console.error.apply(null, args);
	}
	public static debug(...args) {
		if(!SysConfig.SHOW_LOG) return false;
		console.log.apply(null, args);
	}
	public static warning(...args) {
		if(!SysConfig.SHOW_LOG) return false;
		console.warn.apply(null, args);
	}
}

