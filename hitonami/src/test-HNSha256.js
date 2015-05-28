ut.addCase("pPHesjhW HNSha256",function(){
	var d = hn.Data.fromFile("res/square.png");
	ut.eq("iKWswsLU",d.getSize(),3753);
	ut.t("zMdoexlv",!d.isNull());

	var s = hn.Sha256.getHash(d);
	ut.eq("hIuvKdzl",s.toHex(),"98c8abc1c2d429660bd4d6fe12706fa0c3e4f70f68580ad1fc006f35888b9c38");
});

ut.addCase("pPHesjhW HNSha256 empty",function(){
	var d = new hn.Data();
	ut.eq("iKWswsLU",d.getSize(),0);
	ut.t("zMdoexlv",d.isNull());

	var s = hn.Sha256.getHash(d);
	ut.eq("hIuvKdzl",s.toHex(),"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
	
	d = hn.Data.fromHex("");
	ut.eq("iKWswsLU",d.getSize(),0);
	ut.t("zMdoexlv",!d.isNull());

	s = hn.Sha256.getHash(d);
	ut.eq("hIuvKdzl",s.toHex(),"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
});
