
$(function(){

	// デフォルト
	//$(".particle").particleText("PARTICLE ♡");


	// オプション
	$("#particle").particleText({

	    // 表示させたいテキスト
	    text: "PARTICLE ♡", 

	    // パーティクルの色を複数指定可能
	    colors:["#F54064","#F5D940", "#18EBF2"], 

	    // イージングのスピード。slow, middle, high の3つから選んでください。
	    speed: "high",  

	 });
	 
	 // 改行させたい場合
	 $("#particle").particleText({
	        text: "じゃんけんアプリ",
	 });

});
