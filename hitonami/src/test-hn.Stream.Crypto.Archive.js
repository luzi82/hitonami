ut.addCase("VOFPYZGU hn.Stream.Crypto+Archive basic",function(){
	var stream = hn.Stream.fromRes("res/zip000.zip.enc");

	var key = hn.Data.fromHex("0123456789abcdef0123456789abcdef");
	var iv  = hn.Data.fromHex("fedcba9876543210fedcba9876543210");
	stream = hn.Stream.crypto(stream,hn.Stream.CRYPTO_TYPE_AES128CBC_DEC,key,iv);

	stream = hn.Stream.fromArchiveStream(stream,"HelloWorld.png",hn.Stream.ARCHIVE_ZIP);
	
	ut.t("CQUNKOKD",stream!=null);
	ut.t("WJUEXHPZ", stream.open());
	var streamData = stream.readAll();
	ut.t("PFBVJNUT",streamData!=null);
	stream.close();
	
	var data = hn.Data.fromFile("res/HelloWorld.png");
	ut.eq("SZDVJQBM",streamData.getSize(),data.getSize());
	ut.t("ETCPHQAK",streamData.equal(data));
});

ut.addCase("ZUGFHQLT hn.Stream.Crypto+Archive testStream",function(){
	testStream(function(s){
		var stream = hn.Stream.fromRes("res/zip001.zip.enc");

		var key = hn.Data.fromHex("0123456789abcdef0123456789abcdef");
		var iv  = hn.Data.fromHex("fedcba9876543210fedcba9876543210");
		stream = hn.Stream.crypto(stream,hn.Stream.CRYPTO_TYPE_AES128CBC_DEC,key,iv);

		stream = hn.Stream.fromArchiveStream(stream,s,hn.Stream.ARCHIVE_ZIP);
		
		return stream;
	});
});
