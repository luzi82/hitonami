ut.addCase("YFAMcPgl hn.CryptoStream file",function(){
	var fileStream = hn.Stream.fromRes("res/square.png.enc");
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

ut.addCase("TdqUYNpf hn.CryptoStream skip",function(){
	var fileStream = hn.Stream.fromRes("res/square.png.enc");
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

ut.addCaseX("TZkxtijt hn.CryptoStream random skip",function(){
	var data = hn.Data.fromFile("res/1MB.dat");
	
	var offset_list_list = case_TZkxtijt;
	
	for(var offset_list_list_idx=0;offset_list_list_idx<offset_list_list.length;++offset_list_list_idx){
		var fileStream = hn.Stream.fromRes("res/1MB.dat.enc");
		ut.t("AxoAFvAK", fileStream!=null);
		var key = hn.Data.fromHex("0123456789abcdef0123456789abcdef");
		var iv  = hn.Data.fromHex("fedcba9876543210fedcba9876543210");
		var stream = hn.Stream.crypto(fileStream,hn.Stream.CRYPTO_TYPE_AES128CBC_DEC,key,iv);
		ut.t("hQWCnCdz", stream.open());

		var offset_list = offset_list_list[offset_list_list_idx];
		var offset = 0;
		var offset_idx = 0;
		while(offset_idx<offset_list.length){
			var buf_start=offset_list[offset_idx++];
			var buf_end  =offset_list[offset_idx++];
			var skip_len = buf_start - offset;
			var read_len = buf_end - buf_start;
			
			ut.eq("YigETNRl "+offset_list[0]+" "+buf_start+" "+buf_end);
			
			ut.eq("GwZgbBao",stream.skip(skip_len),skip_len);
			var data0 = stream.read(read_len);
			ut.eq("KiEOPUEK",data0.getSize(),read_len);	

			var data1 = data.mid(buf_start,read_len);
			ut.eq("OMlfGpoB",data1.getSize(),read_len);
			ut.t("nMBbCvGo",data0.equal(data1));

			offset=buf_end;
		}
		
		stream.close();
	}

});

ut.addCaseX("kvVXICOm hn.CryptoStream random skip 2",function(){
	var offset_list_list = case_TZkxtijt;

	var fileStream = hn.Stream.fromRes("res/1MB.dat.enc");
	ut.t("gwFNOvyi", fileStream!=null);
	var key = hn.Data.fromHex("0123456789abcdef0123456789abcdef");
	var iv  = hn.Data.fromHex("fedcba9876543210fedcba9876543210");
	var stream = hn.Stream.crypto(fileStream,hn.Stream.CRYPTO_TYPE_AES128CBC_DEC,key,iv);

	var data = hn.Data.fromFile("res/1MB.dat");
	
	for(var offset_list_list_idx=0;offset_list_list_idx<offset_list_list.length;++offset_list_list_idx){
		ut.t("aUsehToo", stream.open());

		var offset_list = offset_list_list[offset_list_list_idx];
		var offset = 0;
		var offset_idx = 0;
		while(offset_idx<offset_list.length){
			var buf_start=offset_list[offset_idx++];
			var buf_end  =offset_list[offset_idx++];
			var skip_len = buf_start - offset;
			var read_len = buf_end - buf_start;
			
			ut.eq("ZAObZPuE "+offset_list[0]+" "+buf_start+" "+buf_end);
			
			ut.eq("hoOpUvpK",stream.skip(skip_len),skip_len);
			var data0 = stream.read(read_len);
			ut.eq("nXVQajtC",data0.getSize(),read_len);	

			var data1 = data.mid(buf_start,read_len);
			ut.eq("DbmifPRR",data1.getSize(),read_len);
			ut.t("yjtOXMAw",data0.equal(data1));

			offset=buf_end;
		}
		
		stream.close();
	}

});

ut.addCaseX("YJZPAOpk hn.CryptoStream random skip with zero len",function(){
	var offset_list_list = case_YJZPAOpk;

	var data = hn.Data.fromFile("res/1MB.dat");
	
	for(var offset_list_list_idx=0;offset_list_list_idx<offset_list_list.length;++offset_list_list_idx){
		var fileStream = hn.Stream.fromRes("res/1MB.dat.enc");
		ut.t("AxoAFvAK", fileStream!=null);
		var key = hn.Data.fromHex("0123456789abcdef0123456789abcdef");
		var iv  = hn.Data.fromHex("fedcba9876543210fedcba9876543210");
		var stream = hn.Stream.crypto(fileStream,hn.Stream.CRYPTO_TYPE_AES128CBC_DEC,key,iv);
		ut.t("hQWCnCdz", stream.open());

		var offset_list = offset_list_list[offset_list_list_idx];
		var offset = 0;
		var offset_idx = 0;
		while(offset_idx<offset_list.length){
			var buf_start=offset_list[offset_idx++];
			var buf_end  =offset_list[offset_idx++];
			var skip_len = buf_start - offset;
			var read_len = buf_end - buf_start;
			
			ut.eq("YigETNRl "+offset_list[0]+" "+buf_start+" "+buf_end);
			
			ut.eq("GwZgbBao",stream.skip(skip_len),skip_len);
			var data0 = stream.read(read_len);
			ut.eq("KiEOPUEK",data0.getSize(),read_len);	

			var data1 = data.mid(buf_start,read_len);
			ut.eq("OMlfGpoB",data1.getSize(),read_len);
			ut.t("nMBbCvGo",data0.equal(data1));

			offset=buf_end;
		}
		
		stream.close();
	}

});

ut.addCase("ZvgkicjI hn.CryptoStream random skip 2 with zero len",function(){
	var offset_list_list = case_YJZPAOpk;

	var fileStream = hn.Stream.fromRes("res/1MB.dat.enc");
	ut.t("gwFNOvyi", fileStream!=null);
	var key = hn.Data.fromHex("0123456789abcdef0123456789abcdef");
	var iv  = hn.Data.fromHex("fedcba9876543210fedcba9876543210");
	var stream = hn.Stream.crypto(fileStream,hn.Stream.CRYPTO_TYPE_AES128CBC_DEC,key,iv);

	var data = hn.Data.fromFile("res/1MB.dat");
	
	for(var offset_list_list_idx=0;offset_list_list_idx<offset_list_list.length;++offset_list_list_idx){
		ut.t("aUsehToo", stream.open());

		var offset_list = offset_list_list[offset_list_list_idx];
		var offset = 0;
		var offset_idx = 0;
		while(offset_idx<offset_list.length){
			var buf_start=offset_list[offset_idx++];
			var buf_end  =offset_list[offset_idx++];
			var skip_len = buf_start - offset;
			var read_len = buf_end - buf_start;
			
			ut.eq("ZAObZPuE "+offset_list[0]+" "+buf_start+" "+buf_end);
			
			ut.eq("hoOpUvpK",stream.skip(skip_len),skip_len);
			var data0 = stream.read(read_len);
			ut.eq("nXVQajtC",data0.getSize(),read_len);	

			var data1 = data.mid(buf_start,read_len);
			ut.eq("DbmifPRR",data1.getSize(),read_len);
			ut.t("yjtOXMAw",data0.equal(data1));

			offset=buf_end;
		}
		
		stream.close();
	}

});
