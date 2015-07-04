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
