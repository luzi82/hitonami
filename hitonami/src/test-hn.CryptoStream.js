ut.addCase("YFAMcPgl hn.CryptoStream file",function(){
	var fileStream = hn.Stream.fromFile("res/square.png.enc");
	ut.t("IepvrYdT", fileStream!=null);

	var key = hn.Data.fromHex("0123456789abcdef0123456789abcdef");
	var iv  = hn.Data.fromHex("fedcba9876543210fedcba9876543210");
	var stream = hn.Stream.crypto(fileStream,hn.Stream.CRYPTO_TYPE_AES128CBC_DEC,key,iv);
	
	ut.t("KYNMBxfI", stream.open());
	var data = stream.readAll();
	ut.eq("YMfrPsZV",data.getSize(),3753);	
	stream.close();
	ut.t("DApBtKMX",true)

	var dataOri = hn.Data.fromFile("res/square.png");
	ut.t("VVYjNIWY",data.equal(dataOri));
});

ut.addCase("UtUjgsbJ hn.CryptoStream skip",function(){
	var fileStream = hn.Stream.fromFile("res/square.png.enc");
	ut.t("yeleDInW", fileStream!=null);
	
	var key = hn.Data.fromHex("0123456789abcdef0123456789abcdef");
	var iv  = hn.Data.fromHex("fedcba9876543210fedcba9876543210");
	stream = hn.Stream.crypto(fileStream,hn.Stream.CRYPTO_TYPE_AES128CBC_DEC,key,iv);

	ut.t("KlAQcani", stream.open());
	ut.eq("FDXWoOon",stream.skip(491),491);
	var data0 = stream.read(503);
	ut.eq("lHRvqfHZ",data0.getSize(),503);	
	stream.close();
	ut.t("sprkShPq",true)

	var data = hn.Data.fromFile("res/square.png");
	var data1 = data.mid(491,503);
	
	ut.t("pwsiRWZV",data0.equal(data1));
});
