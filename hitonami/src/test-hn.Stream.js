ut.addCase("UtUjgsbJ hn.Stream file",function(){
	var stream = hn.Stream.fromRes("res/square.png");
	
	ut.t("Bzelqtrs", stream.open());
	var data = stream.readAll();
	ut.eq("TYHSEkEJ",data.getSize(),3753);	
	stream.close();
	ut.t("YQvjvLxl",true)

	var s = hn.Checksum.get(hn.Checksum.SHA256,data);
	ut.eq("hIuvKdzl",s.toHex(),"98c8abc1c2d429660bd4d6fe12706fa0c3e4f70f68580ad1fc006f35888b9c38");
});

ut.addCase("EeJryxhB hn.Stream seek",function(){
	var stream = hn.Stream.fromRes("res/square.png");
	
	ut.t("ncHTkKCk", stream.open());
	ut.eq("aagyVaxi",stream.seek(491,hn.Stream.SEEK_CUR),0);
	var data0 = stream.read(503);
	ut.eq("YlpTJtFw",data0.getSize(),503);	
	stream.close();
	ut.t("bFpjtXUS",true)

	var data = hn.Data.fromFile("res/square.png");
	var data1 = data.mid(491,503);
	
	ut.t("TFBpyZxc",data0.equal(data1));
});

ut.addCase("CqUbLvPP hn.Stream random seek 2 with zero len",function(){
	testStream(function(){
		return hn.Stream.fromRes("res/1MB.dat");
	});
});

function testStream(streamFactory){
	test_YJZPAOpk(streamFactory);
}

function test_YJZPAOpk(streamFactory){
	var offset_list_list = case_YJZPAOpk;
	
	var stream = streamFactory();
	
	var data = hn.Data.fromFile("res/1MB.dat");

	for(var offset_list_list_idx=0;offset_list_list_idx<offset_list_list.length;++offset_list_list_idx){
		ut.t("CmXYYLbT", stream.open());

		var offset_list = offset_list_list[offset_list_list_idx];
		var offset = 0;
		var offset_idx = 0;
		while(offset_idx<offset_list.length){
			var buf_start=offset_list[offset_idx++];
			var buf_end  =offset_list[offset_idx++];
			var skip_len = buf_start - offset;
			var read_len = buf_end - buf_start;
			
			ut.eq("jHtHdjHt "+offset_list[0]+" "+buf_start+" "+buf_end);
			
			ut.eq("YYbkCGcF",stream.seek(skip_len,hn.Stream.SEEK_CUR),0);
			var data0 = stream.read(read_len);
			ut.eq("IihrHWgk",data0.getSize(),read_len);	

			var data1 = data.mid(buf_start,read_len);
			ut.eq("FYyXdUbd",data1.getSize(),read_len);
			ut.t("ZHBZpnko",data0.equal(data1));

			offset=buf_end;
		}
		
		stream.close();
	}
}
