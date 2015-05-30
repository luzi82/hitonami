ut.addCase("PeFjoPAD HNCipher",function(){
	var enc = hn.Data.fromFile("res/square.png.enc");
	var key = hn.Data.fromHex("0123456789abcdef0123456789abcdef");
	var iv  = hn.Data.fromHex("fedcba9876543210fedcba9876543210");

	var data = hn.Cipher.decrypt(hn.Cipher.AES128CBC,enc,key,iv);
	ut.eq("GGNLltvc",hn.Sha256.getHash(data).toHex(),"98c8abc1c2d429660bd4d6fe12706fa0c3e4f70f68580ad1fc006f35888b9c38");
});

ut.addCase("pFOLLsbu HNCipher invalid input",function(){
	var enc   = hn.Data.fromFile("res/square.png.enc");
	var key   = hn.Data.fromHex("0123456789abcdef0123456789abcdef");
	var keyX0 = hn.Data.fromHex("0123456789abcdef0123456789abcd");
	var keyX1 = hn.Data.fromHex("0123456789abcdef0123456789abcdef00");
	var iv    = hn.Data.fromHex("fedcba9876543210fedcba9876543210");
	var ivX0  = hn.Data.fromHex("fedcba9876543210fedcba98765432");
	var ivX1  = hn.Data.fromHex("fedcba9876543210fedcba987654321000");
	var empty  = new hn.Data();

	ut.eq("tHhJiUPo",hn.Cipher.decrypt(null,enc,key,iv),null);
	ut.eq("GtlDPOvj",hn.Cipher.decrypt("",enc,key,iv),null);
	ut.eq("ZwCWpPDM",hn.Cipher.decrypt("XXX",enc,key,iv),null);

	ut.eq("lelruOTa",hn.Cipher.decrypt(hn.Cipher.AES128CBC,null,key,iv),null);

	ut.eq("tViRzZqJ",hn.Cipher.decrypt(hn.Cipher.AES128CBC,enc,null,iv),null);
	ut.eq("RmxCohqn",hn.Cipher.decrypt(hn.Cipher.AES128CBC,enc,empty,iv),null);
	ut.eq("QcuZRqYh",hn.Cipher.decrypt(hn.Cipher.AES128CBC,enc,keyX0,iv),null);
	ut.eq("mWkCamdN",hn.Cipher.decrypt(hn.Cipher.AES128CBC,enc,keyX1,iv),null);

	ut.eq("sqcSwqtd",hn.Cipher.decrypt(hn.Cipher.AES128CBC,enc,key,null),null);
	ut.eq("ULaYBlht",hn.Cipher.decrypt(hn.Cipher.AES128CBC,enc,key,empty),null);
	ut.eq("yQgZGvCj",hn.Cipher.decrypt(hn.Cipher.AES128CBC,enc,key,ivX0),null);
	ut.eq("atSacOhB",hn.Cipher.decrypt(hn.Cipher.AES128CBC,enc,key,ivX1),null);
});
