ut.addCase("cIhHXCFO hn.Stream.Archive basic",function(){
	var resStream = hn.Stream.fromRes("res/zip000.zip");
	var archiveStream = hn.Stream.fromArchiveStream(resStream,"HelloWorld.png",hn.Stream.ARCHIVE_ZIP);
	ut.t("DAITJHDU",archiveStream!=null);
	ut.t("BBESIXJX", archiveStream.open());
	var archiveStreamData = archiveStream.readAll();
	ut.t("QKGKEMJB",archiveStreamData!=null);
	archiveStream.close();
	
	var data = hn.Data.fromFile("res/HelloWorld.png");
	ut.eq("OMLKXCWX",archiveStreamData.getSize(),data.getSize());
	ut.t("xtFLifRE",archiveStreamData.equal(data));
});
