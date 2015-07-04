ut.addCase("UtUjgsbJ hn.Stream file",function(){
	var stream = hn.Stream.fromFile("res/square.png");
	
	ut.t("Bzelqtrs", stream.open());
	var data = stream.readAll();
	ut.eq("TYHSEkEJ",data.getSize(),3753);	
	stream.close();
	ut.t("YQvjvLxl",true)

	var s = hn.Checksum.get(hn.Checksum.SHA256,data);
	ut.eq("hIuvKdzl",s.toHex(),"98c8abc1c2d429660bd4d6fe12706fa0c3e4f70f68580ad1fc006f35888b9c38");
});

ut.addCase("UtUjgsbJ hn.Stream skip",function(){
	var stream = hn.Stream.fromFile("res/square.png");
	
	ut.t("ncHTkKCk", stream.open());
	ut.eq("aagyVaxi",stream.skip(491),491);
	var data0 = stream.read(503);
	ut.eq("YlpTJtFw",data0.getSize(),503);	
	stream.close();
	ut.t("bFpjtXUS",true)

	var data = hn.Data.fromFile("res/square.png");
	var data1 = data.mid(491,503);
	
	ut.t("TFBpyZxc",data0.equal(data1));
});
