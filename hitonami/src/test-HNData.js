ut.addCase("pPHesjhW HNData init",function(){
	var d = new hn.Data();
	ut.eq("gcnuANFk",d.getSize(),0);
	ut.t("byDcIrnZ",d.isNull());
});

ut.addCase("XGIDVLaS HNData fromFile",function(){
	var d = hn.Data.fromFile("res/square.png");
	ut.eq("qcMAmevc",d.getSize(),3753);
	ut.t("iOYfKtsN",!d.isNull());
});

ut.addCase("buirUyEc HNData clear",function(){
	var d = hn.Data.fromFile("res/square.png");
	ut.eq("iKWswsLU",d.getSize(),3753);
	ut.t("zMdoexlv",!d.isNull());

	d.clear();
	ut.eq("dJNVAmWO",d.getSize(),0);
	ut.t("YkdfwWCe",d.isNull());
});

ut.addCase("xKCGhCcI HNData copy",function(){
	var d = hn.Data.fromFile("res/square.png");
	ut.eq("iKWswsLU",d.getSize(),3753);
	ut.t("zMdoexlv",!d.isNull());
	
	var d0 = new hn.Data();
	ut.eq("lzrMEuyj",d0.getSize(),0);
	ut.t("rhDMGGlN",d0.isNull());
	
	d0.copy(d);
	ut.eq("EAlzhoZV",d.getSize(),3753);
	ut.t("LwqQFnps",!d.isNull());
});

ut.addCase("fDOqutxC HNData copy independent 0",function(){
	var d = hn.Data.fromFile("res/square.png");
	ut.eq("iKWswsLU",d.getSize(),3753);
	ut.t("zMdoexlv",!d.isNull());
	
	var d0 = new hn.Data();
	ut.eq("lzrMEuyj",d0.getSize(),0);
	ut.t("rhDMGGlN",d0.isNull());
	
	d0.copy(d);
	ut.eq("aeniNwct",d.getSize(),3753);
	ut.t("SvRPcltt",!d.isNull());
	ut.eq("EAlzhoZV",d0.getSize(),3753);
	ut.t("LwqQFnps",!d0.isNull());
	
	d.clear();
	ut.eq("lzrMEuyj",d.getSize(),0);
	ut.t("rhDMGGlN",d.isNull());
	ut.eq("EAlzhoZV",d0.getSize(),3753);
	ut.t("LwqQFnps",!d0.isNull());
});

ut.addCase("sOSqLjIB HNData copy independent 1",function(){
	var d = hn.Data.fromFile("res/square.png");
	ut.eq("iKWswsLU",d.getSize(),3753);
	ut.t("zMdoexlv",!d.isNull());
	
	var d0 = new hn.Data();
	ut.eq("lzrMEuyj",d0.getSize(),0);
	ut.t("rhDMGGlN",d0.isNull());
	
	d0.copy(d);
	ut.eq("aeniNwct",d.getSize(),3753);
	ut.t("SvRPcltt",!d.isNull());
	ut.eq("EAlzhoZV",d0.getSize(),3753);
	ut.t("LwqQFnps",!d0.isNull());
	
	d0.clear();
	ut.eq("PoHZjZsr",d.getSize(),3753);
	ut.t("xhlIYQfv",!d.isNull());
	ut.eq("uNvHtfUb",d0.getSize(),0);
	ut.t("eOuicBzp",d0.isNull());
});

ut.addCase("sfbkVLkK HNData assign dependent 0",function(){
	var d = hn.Data.fromFile("res/square.png");
	ut.eq("iKWswsLU",d.getSize(),3753);
	ut.t("zMdoexlv",!d.isNull());
	
	var d0 = d;
	ut.eq("aeniNwct",d.getSize(),3753);
	ut.t("SvRPcltt",!d.isNull());
	ut.eq("EAlzhoZV",d0.getSize(),3753);
	ut.t("LwqQFnps",!d0.isNull());
	
	d0.clear();
	ut.eq("PoHZjZsr",d.getSize(),0);
	ut.t("xhlIYQfv",d.isNull());
	ut.eq("uNvHtfUb",d0.getSize(),0);
	ut.t("eOuicBzp",d0.isNull());
});

ut.addCase("wUMPScEn HNData assign dependent 1",function(){
	var d = hn.Data.fromFile("res/square.png");
	ut.eq("iKWswsLU",d.getSize(),3753);
	ut.t("zMdoexlv",!d.isNull());
	
	var d0 = d;
	ut.eq("aeniNwct",d.getSize(),3753);
	ut.t("SvRPcltt",!d.isNull());
	ut.eq("EAlzhoZV",d0.getSize(),3753);
	ut.t("LwqQFnps",!d0.isNull());
	
	d.clear();
	ut.eq("PoHZjZsr",d.getSize(),0);
	ut.t("xhlIYQfv",d.isNull());
	ut.eq("uNvHtfUb",d0.getSize(),0);
	ut.t("eOuicBzp",d0.isNull());
});

ut.addCase("EbUPdjQG HNData hex",function(){
	var d = hn.Data.fromFile("res/32B.dat");
	ut.eq("iKWswsLU",d.getSize(),32);
	ut.t("zMdoexlv",!d.isNull());
	ut.eq("XMhUEsXs",d.toHex(),"0730bf3321fa579f65cd6bb8efc43510916e8e4644f1285d5dac8b6fca682a10");
});

ut.addCase("koCYCgOv HNData base64",function(){
	var d = hn.Data.fromFile("res/32B.dat");
	ut.eq("pQBxPRXH",d.getSize(),32);
	ut.t("JmMftJWB",!d.isNull());
	ut.eq("AGNzPsKc",d.toBase64(),"BzC/MyH6V59lzWu478Q1EJFujkZE8ShdXayLb8poKhA=");
});

ut.addCase("jGWVUiMR HNData",function(){
	var bin0=hn.Data.fromHex("9479e176e687002b4c081973");
	ut.eq("PLHNviwy",bin0.getSize(),12);
	ut.eq("PIpMKUHc",bin0.toHex(),"9479e176e687002b4c081973");
});

ut.addCase("bLRWLcbT HNData",function(){
	var u;
	for(u in case_bLRWLcbT){
		var c=case_bLRWLcbT[u];
		var hex=c[0];
		var b64=c[1];
		var len=c[2];
		
		var bin0=hn.Data.fromHex(hex);
		ut.eq("piNVJGkF "+len,bin0.getSize(),len);
		ut.eq("AsKUhpCr "+len,bin0.toHex(),hex);
		ut.eq("VviZBmoM "+len,bin0.toBase64(),b64);

		var bin1=hn.Data.fromBase64(b64);
		ut.eq("eRoFeuQV "+len,bin1.getSize(),len);
		ut.eq("EmurIEdQ "+len,bin1.toHex(),hex);
		ut.eq("yxFfKWGk "+len,bin1.toBase64(),b64);
		
		ut.t("uEXtTYnh "+len,bin0.equal(bin1));
	}
});

ut.addCase("ywXnSJRQ HNData hex fail",function(){
	ut.eq("crIgPaqn",hn.Data.fromHex("!@"),null);
	ut.eq("vkGZzavO",hn.Data.fromHex("0"),null);
	ut.eq("FkZxtOQD",hn.Data.fromHex("a"),null);
	ut.eq("hQjFrCAa",hn.Data.fromHex("aaa"),null);
	ut.eq("qrkgUNxr",hn.Data.fromHex("0g"),null);
	ut.eq("kDceGeZu",hn.Data.fromHex("0z"),null);
	ut.eq("PRRlmsAF",hn.Data.fromHex("0G"),null);
	ut.eq("nugyTLDU",hn.Data.fromHex("0Z"),null);
	ut.eq("WpgeFqYh",hn.Data.fromHex("g0"),null);
	ut.eq("MCKxxcGf",hn.Data.fromHex("z0"),null);
	ut.eq("HaDpBXTZ",hn.Data.fromHex("G0"),null);
	ut.eq("eNEVmDGP",hn.Data.fromHex("Z0"),null);
});

ut.addCase("fIALLKnM HNData base64 fail",function(){
	ut.eq("qHJgbQJq",hn.Data.fromBase64("a"),null);
	ut.eq("RGtQjigB",hn.Data.fromBase64("aa"),null);
	ut.eq("oRMEjVWi",hn.Data.fromBase64("aaa"),null);
	ut.t("gBcHTVwB",hn.Data.fromBase64("aaaa")!=null);
	ut.eq("crIgPaqn",hn.Data.fromBase64("="),null);
	ut.eq("cgeRjhiX",hn.Data.fromBase64("=="),null);
	ut.eq("LFvyTXkz",hn.Data.fromBase64("==="),null);
	ut.eq("EfoMdkuj",hn.Data.fromBase64("===="),null);
	ut.eq("wYmDjlKf",hn.Data.fromBase64("========"),null);
	ut.eq("gIaZjAVj",hn.Data.fromBase64("====aaaa"),null);
	ut.eq("gReiYCCf",hn.Data.fromBase64("=aaaaaaa"),null);
	ut.eq("WVfGqdmY",hn.Data.fromBase64("a=aaaaaa"),null);
	ut.eq("pnrdviXa",hn.Data.fromBase64("aa=aaaaa"),null);
	ut.eq("ntVcRLsn",hn.Data.fromBase64("aaa=aaaa"),null);
	ut.eq("FAAEdRKm",hn.Data.fromBase64("aaaa=aaa"),null);
	ut.eq("cXbLkrmS",hn.Data.fromBase64("aaaaa=aa"),null);
	ut.eq("WszSddqJ",hn.Data.fromBase64("aaaaaa=a"),null);
	ut.eq("kdQrtxSr",hn.Data.fromBase64("aaaa="),null);
	ut.eq("RfAxkAXo",hn.Data.fromBase64("aaaa=="),null);
	ut.eq("IokLlRvd",hn.Data.fromBase64("aaaa==="),null);
	ut.eq("uZkXKcaS",hn.Data.fromBase64("aaaa===="),null);
	ut.eq("jZQsMSLm",hn.Data.fromBase64("aaaaa==="),null);
	ut.eq("vkGZzavO",hn.Data.fromBase64("!==="),null);
	ut.eq("TLiywTsL",hn.Data.fromBase64("!@=="),null);
	ut.eq("fQxxpftH",hn.Data.fromBase64("!@#="),null);
	ut.eq("qmFcKxQS",hn.Data.fromBase64("!@#$"),null);
});

ut.addCase("BjPyLrwy HNData upper",function(){
	var u;
	for(u in case_bLRWLcbT){
		var c=case_bLRWLcbT[u];
		var hex=c[0];
		var b64=c[1];
		var len=c[2];
		
		hex=hex.toUpperCase();
		
		var bin0=hn.Data.fromHex(hex);
		ut.eq("sZOPnfvk "+len,bin0.getSize(),len);
		ut.eq("dvIIGYxV "+len,bin0.toBase64(),b64);
	}
});

ut.addCase("BjPyLrwy HNData equal",function(){
	ut.t("vMZgzVph",hn.Data.fromHex("deadbeef").equal(hn.Data.fromHex("deadbeef")));
	ut.t("DnVkgJkO",!hn.Data.fromHex("deadbeef").equal(hn.Data.fromHex("deadbeee")));
	ut.t("bfiegkaV",!hn.Data.fromHex("deadbeef").equal(null)); // TODO, should able to handle null
	ut.t("DLbTxiwg",!hn.Data.fromHex("deadbeef").equal(hn.Data.fromHex("")));
	ut.t("BpBtTyRl",!hn.Data.fromHex("deadbeef").equal(hn.Data.fromHex("deadbe")));
});
