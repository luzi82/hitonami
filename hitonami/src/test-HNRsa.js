ut.addCase("KjJSyOHO HNRsa ok",function(){
	var data = hn.Data.fromFile("res/square.png");
	var publicKey = hn.Data.fromFile("res/public.pem");
	var sign = hn.Data.fromFile("res/square.png.sig");
	
	var sha256 = hn.Sha256.getHash(data);
	
	ut.t("tpqliELB",hn.Rsa.verify(hn.Rsa.SHA256,sha256,sign,publicKey));
});

ut.addCase("KOFaoRdc HNRsa fail",function(){
	var data = hn.Data.fromFile("res/HelloWorld.png");
	var publicKey = hn.Data.fromFile("res/public.pem");
	var sign = hn.Data.fromFile("res/square.png.sig");
	
	var sha256 = hn.Sha256.getHash(data);
	
	ut.t("iYuIUHCS",!hn.Rsa.verify(hn.Rsa.SHA256,sha256,sign,publicKey));
});

ut.addCase("iWyptIrP HNRsa null",function(){
	var data = hn.Data.fromFile("res/square.png");
	var publicKey = hn.Data.fromFile("res/public.pem");
	var sign = hn.Data.fromFile("res/square.png.sig");
	
	var sha256 = hn.Sha256.getHash(data);
	
	var empty = new hn.Data();
	
	ut.t("iYuIUHCS",!hn.Rsa.verify(null,sha256,sign,publicKey));
	ut.t("JAAjJBdj",!hn.Rsa.verify(hn.Rsa.SHA256,null,sign,publicKey));
	ut.t("UpXZosty",!hn.Rsa.verify(hn.Rsa.SHA256,sha256,null,publicKey));
	ut.t("LrMUkuHv",!hn.Rsa.verify(hn.Rsa.SHA256,sha256,sign,null));

	ut.t("VitjrccC",!hn.Rsa.verify("",sha256,sign,publicKey));
	ut.t("SKoARAkC",!hn.Rsa.verify(hn.Rsa.SHA256,empty,sign,publicKey));
	ut.t("DGIhyFEx",!hn.Rsa.verify(hn.Rsa.SHA256,sha256,empty,publicKey));
	ut.t("huWVpHUW",!hn.Rsa.verify(hn.Rsa.SHA256,sha256,sign,empty));

	ut.t("vKDkebBN",!hn.Rsa.verify("XXX",sha256,sign,publicKey));
});
