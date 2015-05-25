ut.addCase("pPHesjhW HNData init",function(){
	var d = new hn.HNData();
	ut.eq("gcnuANFk",d.getSize(),0);
	ut.t("byDcIrnZ",d.isNull());
});

ut.addCase("XGIDVLaS HNData fromFile",function(){
	var d = hn.HNData.fromFile("res/square.png");
	ut.eq("qcMAmevc",d.getSize(),3753);
	ut.t("iOYfKtsN",!d.isNull());
});

ut.addCase("buirUyEc HNData clear",function(){
	var d = hn.HNData.fromFile("res/square.png");
	ut.eq("iKWswsLU",d.getSize(),3753);
	ut.t("zMdoexlv",!d.isNull());

	d.clear();
	ut.eq("dJNVAmWO",d.getSize(),0);
	ut.t("YkdfwWCe",d.isNull());
});

ut.addCase("xKCGhCcI HNData copy",function(){
	var d = hn.HNData.fromFile("res/square.png");
	ut.eq("iKWswsLU",d.getSize(),3753);
	ut.t("zMdoexlv",!d.isNull());
	
	var d0 = new hn.HNData();
	ut.eq("lzrMEuyj",d0.getSize(),0);
	ut.t("rhDMGGlN",d0.isNull());
	
	d0.copy(d);
	ut.eq("EAlzhoZV",d.getSize(),3753);
	ut.t("LwqQFnps",!d.isNull());
});

ut.addCase("fDOqutxC HNData copy independent 0",function(){
	var d = hn.HNData.fromFile("res/square.png");
	ut.eq("iKWswsLU",d.getSize(),3753);
	ut.t("zMdoexlv",!d.isNull());
	
	var d0 = new hn.HNData();
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
	var d = hn.HNData.fromFile("res/square.png");
	ut.eq("iKWswsLU",d.getSize(),3753);
	ut.t("zMdoexlv",!d.isNull());
	
	var d0 = new hn.HNData();
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
	var d = hn.HNData.fromFile("res/square.png");
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
	var d = hn.HNData.fromFile("res/square.png");
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
