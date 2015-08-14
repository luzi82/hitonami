ut.addCase("cIhHXCFO hn.Stream.Archive basic",function(){
	var resStream = hn.Stream.fromRes("res/zip000.zip");
	var archiveStream = hn.Stream.fromArchiveStream(stream,"HelloWorld.png",hn.Stream.ARCHIVE_ZIP);
	var archiveStreamData = archiveStream.readAll();
	
	var data = hn.Data.fromFile("res/HelloWorld.png");
	ut.t("xtFLifRE",archiveStreamData.equal(data));
});
