ut.addCase("KjJSyOHO HNRsa",function(){
	var data = hn.Data.fromFile("res/square.png");
	var publicKey = hn.Data.fromFile("res/public.pem");
	var sign = hn.Data.fromFile("res/square.png.sig");
	
	ut.t("tpqliELB",hn.Rsa.verify(data,sign,publicKey));
});

ut.addCase("KOFaoRdc HNRsa",function(){
	var data = hn.Data.fromFile("res/HelloWorld.png");
	var publicKey = hn.Data.fromFile("res/public.pem");
	var sign = hn.Data.fromFile("res/square.png.sig");
	
	ut.t("iYuIUHCS",!hn.Rsa.verify(data,sign,publicKey));
});
