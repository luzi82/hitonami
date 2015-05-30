ut.addCase("KjJSyOHO hn.Signature ok",function(){
	var data = hn.Data.fromFile("res/square.png");
	var publicKey = hn.Data.fromFile("res/public.pem");
	var sign = hn.Data.fromFile("res/square.png.sig");
	
	var sha256 = hn.Checksum.get(hn.Checksum.SHA256,data);
	
	ut.t("tpqliELB",hn.Signature.verify(hn.Signature.RSA,hn.Checksum.SHA256,sha256,sign,publicKey));
});

ut.addCase("KOFaoRdc hn.Signature fail",function(){
	var data = hn.Data.fromFile("res/HelloWorld.png");
	var publicKey = hn.Data.fromFile("res/public.pem");
	var sign = hn.Data.fromFile("res/square.png.sig");
	
	var sha256 = hn.Checksum.get(hn.Checksum.SHA256,data);
	
	ut.t("iYuIUHCS",!hn.Signature.verify(hn.Signature.RSA,hn.Checksum.SHA256,sha256,sign,publicKey));
});

ut.addCase("iWyptIrP hn.Signature invalid arg",function(){
	var data = hn.Data.fromFile("res/square.png");
	var publicKey = hn.Data.fromFile("res/public.pem");
	var sign = hn.Data.fromFile("res/square.png.sig");
	
	var sha256 = hn.Checksum.get(hn.Checksum.SHA256,data);
	
	var empty = new hn.Data();
	
	ut.t("iYuIUHCS",!hn.Signature.verify(hn.Signature.RSA,null,sha256,sign,publicKey));
	ut.t("VitjrccC",!hn.Signature.verify(hn.Signature.RSA,"",sha256,sign,publicKey));
	ut.t("vKDkebBN",!hn.Signature.verify(hn.Signature.RSA,"XXX",sha256,sign,publicKey));

	ut.t("JAAjJBdj",!hn.Signature.verify(hn.Signature.RSA,hn.Checksum.SHA256,null,sign,publicKey));
	ut.t("SKoARAkC",!hn.Signature.verify(hn.Signature.RSA,hn.Checksum.SHA256,empty,sign,publicKey));

	ut.t("UpXZosty",!hn.Signature.verify(hn.Signature.RSA,hn.Checksum.SHA256,sha256,null,publicKey));
	ut.t("DGIhyFEx",!hn.Signature.verify(hn.Signature.RSA,hn.Checksum.SHA256,sha256,empty,publicKey));
	
	ut.t("LrMUkuHv",!hn.Signature.verify(hn.Signature.RSA,hn.Checksum.SHA256,sha256,sign,null));
	ut.t("huWVpHUW",!hn.Signature.verify(hn.Signature.RSA,hn.Checksum.SHA256,sha256,sign,empty));

});
