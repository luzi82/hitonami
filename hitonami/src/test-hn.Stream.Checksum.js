ut.addCase("LNOVCPAX hn.Stream.Checksum basic",function(){
	var stream = hn.Stream.fromRes("res/square.png");

	var checksum = hn.Checksum.fromStream(hn.Checksum.SHA256,stream);
	ut.eq("QGGVCSAT",checksum.toHex(),"98c8abc1c2d429660bd4d6fe12706fa0c3e4f70f68580ad1fc006f35888b9c38");
});
