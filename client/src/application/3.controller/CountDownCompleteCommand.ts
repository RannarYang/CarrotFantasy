class CountDownCompleteCommand extends Controller{
	public execute() {
        //开始出怪
		let rModel =this.GetModel(RoundModel);
        rModel.startRound();
	}
}