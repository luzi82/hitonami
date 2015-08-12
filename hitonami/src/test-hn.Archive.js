ut.addCase("cIhHXCFO hn.Archive basic",function(){
	var resStream = hn.Stream.fromRes("res/zip000.zip");
	var archive = hn.Archive.fromStream(stream,hn.Archive.ZIP);

	var entryStream = archive.getEntryStream("HelloWorld.png");
	var entryStreamData = entryStream.readAll();
	
	var data = hn.Data.fromFile("res/HelloWorld.png");
	ut.t("xtFLifRE",entryStreamData.equal(data));
});
