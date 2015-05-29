ut.addCase("KjJSyOHO HNRsa",function(){
	var data = hn.Data.fromFile("res/square.png");
	var publicKey = hn.Data.fromFile("res/public.pem");
	var sign = hn.Data.fromFile("res/square.png.sig");
	
	var sha256 = hn.Sha256.getHash(data);
	
	ut.t("tpqliELB",hn.Rsa.verify(hn.Rsa.SHA256,sha256,sign,publicKey));
});

ut.addCase("KOFaoRdc HNRsa",function(){
	var data = hn.Data.fromFile("res/HelloWorld.png");
	var publicKey = hn.Data.fromFile("res/public.pem");
	var sign = hn.Data.fromFile("res/square.png.sig");
	
	var sha256 = hn.Sha256.getHash(data);
	
	ut.t("iYuIUHCS",!hn.Rsa.verify(hn.Rsa.SHA256,sha256,sign,publicKey));
});
