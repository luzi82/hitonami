ut.addCase("PeFjoPAD HNCipher",function(){
	var enc = hn.Data.fromFile("res/square.png.enc");
	var key = hn.Data.fromHex("0123456789abcdef0123456789abcdef");
	var iv  = hn.Data.fromHex("fedcba9876543210fedcba9876543210");

	var data = hn.HNCipher.decrypt(hn.HNCipher.AES128CBC,enc,key,iv);
	ut.eq("GGNLltvc",hn.Sha256.getHash(data).toHex(),"98c8abc1c2d429660bd4d6fe12706fa0c3e4f70f68580ad1fc006f35888b9c38");
});

ut.addCase("pFOLLsbu HNCipher invalid input",function(){
	var enc = hn.Data.fromFile("res/square.png.enc");
	var key = hn.Data.fromHex("0123456789abcdef0123456789abcdef");
	var iv  = hn.Data.fromHex("fedcba9876543210fedcba9876543210");

	ut.eq("tHhJiUPo",hn.HNCipher.decrypt(null,enc,key,iv),null);
	ut.eq("lelruOTa",hn.HNCipher.decrypt(hn.HNCipher.AES128CBC,null,key,iv),null);
	ut.eq("tViRzZqJ",hn.HNCipher.decrypt(hn.HNCipher.AES128CBC,enc,null,iv),null);
	ut.eq("sqcSwqtd",hn.HNCipher.decrypt(hn.HNCipher.AES128CBC,enc,key,null),null);
});
