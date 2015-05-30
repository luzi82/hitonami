ut.addCase("cMiTOIwA hn.Checksum",function(){
	var d = hn.Data.fromFile("res/square.png");
	ut.eq("iKWswsLU",d.getSize(),3753);
	ut.t("zMdoexlv",!d.isEmpty());

	var s = hn.Checksum.getChecksum(hn.Checksum.SHA256,d);
	ut.eq("hIuvKdzl",s.toHex(),"98c8abc1c2d429660bd4d6fe12706fa0c3e4f70f68580ad1fc006f35888b9c38");
});

ut.addCase("MEGRKJPK hn.Checksum null/empty",function(){
	ut.eq("hIuvKdzl",hn.Checksum.getChecksum(hn.Checksum.SHA256,new hn.Data()).toHex(),"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");

	ut.eq("DTozGjbt",hn.Checksum.getChecksum(hn.Checksum.SHA256,null),null);

	ut.t("TvuczFIn",hn.Checksum.getChecksum(hn.Checksum.SHA256,hn.Data.fromHex(""))!=null);
	ut.eq("vNvonujO",hn.Checksum.getChecksum(hn.Checksum.SHA256,hn.Data.fromHex("")).toHex(),"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
});

ut.addCase("YWWKxnIq hn.Checksum invalid input",function(){
	var d = hn.Data.fromFile("res/square.png");

	ut.eq("YyxtAohN",hn.Checksum.getChecksum(null,d),null);
	ut.eq("BiWmZLzp",hn.Checksum.getChecksum("",d),null);
	ut.eq("RDsNgWlf",hn.Checksum.getChecksum("XXX",d),null);

	ut.eq("YifqfPrg",hn.Checksum.getChecksum(hn.Checksum.SHA256,null),null);
});
