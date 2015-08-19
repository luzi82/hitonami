
ut.addCaseX("DVZQFRWM jsb.AssetManager from sample",function(){
	cc.log("DGKXXCSJ jsb.fileUtils.getWritablePath() "+jsb.fileUtils.getWritablePath())
	
	var DVZQFRWM_manager;
	var DVZQFRWM_listener;

	DVZQFRWM_manager = new jsb.AssetsManager("res/001.manifest", jsb.fileUtils.getWritablePath()+"/manifest/001/");
	
	ut.caseLock("BNRGZQHO");
	DVZQFRWM_manager.retain();
	
	ut.tt("FPWUIHIN",DVZQFRWM_manager.getLocalManifest().isLoaded());
	
		cc.log("NXEOJBFQ");
		DVZQFRWM_listener = new jsb.EventListenerAssetsManager(DVZQFRWM_manager, function(event) {
			ut.run(function(){
			cc.log("FBGANKXB "+event.getEventCode());
	        switch (event.getEventCode())
	        {
	            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
	                cc.log("No local manifest file found, skip assets update.");
	                break;
	            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
	                var percent = event.getPercent();
	                var filePercent = event.getPercentByFile();
	                cc.log("Download percent : " + percent + " | File percent : " + filePercent);
	                break;
	            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
	            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
	                cc.log("Fail to download manifest file, update skipped.");
	                break;
	            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
	            case jsb.EventAssetsManager.UPDATE_FINISHED:
	                cc.log("Update finished.");
	                ut.tt("VUWFHYLW",DVZQFRWM_manager!=null);
	                // You need to release the assets manager while you are sure you don't need it any more
	                DVZQFRWM_manager.release();
	                DVZQFRWM_manager = null;
	                DVZQFRWM_listener = null;
	                ut.caseUnlock("BNRGZQHO");
	                break;
	            case jsb.EventAssetsManager.UPDATE_FAILED:
	                cc.log("Update failed. " + event.getMessage());
	                // Directly update previously failed assets, we suggest you to count and abort after several retry.
	                DVZQFRWM_manager.downloadFailedAssets();
	                break;
	            case jsb.EventAssetsManager.ERROR_UPDATING:
	                cc.log("Asset update error: " + event.getAssetId() + ", " + event.getMessage());
	                break;
	            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
	                cc.log(event.getMessage());
	                break;
	            case jsb.EventAssetsManager.ASSET_UPDATED:
                cc.log("GGTZKIRZ jsb.EventAssetsManager.ASSET_UPDATED");
                break;
	            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                cc.log("MHANEIQL jsb.EventAssetsManager.NEW_VERSION_FOUND");
                break;
	            default:
	            		cc.log("RDKRAIGC AssetsManager UNHANDLED EVENT "+event.getEventCode());
	                break;
	        }
  			cc.log("NOOTPPVZ");
	    });
	    });
			cc.log("IXYMTHTJ");
			cc.eventManager.addListener(DVZQFRWM_listener, 1);
			cc.log("RILVQLXN");
	
	DVZQFRWM_manager.update();

		cc.log("XHBHPDRI")
});

ut.addCaseX("JBVPJMNY jsb.AssetManager basic",function(){
	cc.log("FMZJESIV jsb.fileUtils.getWritablePath() "+jsb.fileUtils.getWritablePath())
	
	var JBVPJMNY_manager;
	var JBVPJMNY_listener;
	
	var tarDir=jsb.fileUtils.getWritablePath()+"/manifest/000/";
	ut.tt("TKIWXFVD",jsb.fileUtils.removeDirectory(tarDir));

	JBVPJMNY_manager = new jsb.AssetsManager("res/000.manifest", tarDir);
	
	ut.caseLock("IJPEPWWM");
	JBVPJMNY_manager.retain();

	ut.tt("HACMAWVI",JBVPJMNY_manager.getLocalManifest().isLoaded());

		cc.log("HAZMHCLW");
		JBVPJMNY_listener = new jsb.EventListenerAssetsManager(JBVPJMNY_manager, function(event) {
			ut.run(function(){
				ut.tt("XLKFBAHQ",event.getAssetsManagerEx()==JBVPJMNY_manager);
				cc.log("XPKNCGBR "+event.getEventCode());
	        switch (event.getEventCode())
	        {
	            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
	                cc.log("No local manifest file found, skip assets update.");
	                break;
	            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
	                var percent = event.getPercent();
	                var filePercent = event.getPercentByFile();
	                cc.log("Download percent : " + percent + " | File percent : " + filePercent);
	                break;
	            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
	            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
	                cc.log("Fail to download manifest file, update skipped.");
	                break;
	            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
	            case jsb.EventAssetsManager.UPDATE_FINISHED:
	                cc.log("Update finished.");
	                ut.tt("JQFXEHBR",JBVPJMNY_manager!=null);
	                // You need to release the assets manager while you are sure you don't need it any more
	                JBVPJMNY_manager.release();
	                JBVPJMNY_manager = null;
	                JBVPJMNY_listener = null;
                	cc.eventManager.removeListener(JBVPJMNY_listener[i]);
	                ut.caseUnlock("IJPEPWWM");
	                break;
	            case jsb.EventAssetsManager.UPDATE_FAILED:
	                cc.log("Update failed. " + event.getMessage());
	                // Directly update previously failed assets, we suggest you to count and abort after several retry.
	                JBVPJMNY_manager.downloadFailedAssets();
	                break;
	            case jsb.EventAssetsManager.ERROR_UPDATING:
	                cc.log("Asset update error: " + event.getAssetId() + ", " + event.getMessage());
	                break;
	            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
	                cc.log(event.getMessage());
	                break;
	            case jsb.EventAssetsManager.ASSET_UPDATED:
                cc.log("JKPWEMQV jsb.EventAssetsManager.ASSET_UPDATED");
                break;
	            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                cc.log("FJICVUJB jsb.EventAssetsManager.NEW_VERSION_FOUND");
                break;
	            default:
	            		cc.log("RDKRAIGC AssetsManager UNHANDLED EVENT "+event.getEventCode());
	                break;
	        }
  			cc.log("NAZJSHMX");
			});
	    });
	
		cc.log("ICCBQRBQ");
		cc.eventManager.addListener(JBVPJMNY_listener, 1);
		cc.log("JGOYNJJP");

		JBVPJMNY_manager.update();

	cc.log("MLBMMWUY")
});

ut.addCase("IQSEDGQA jsb.AssetManager just repeat JBVPJMNY",function(){
	cc.log("FMZJESIV jsb.fileUtils.getWritablePath() "+jsb.fileUtils.getWritablePath())
	
	var IQSEDGQA_manager=[];
	var IQSEDGQA_listener=[];
	
	var tarDir=jsb.fileUtils.getWritablePath()+"/manifest/000/";
	//ut.tt("TKIWXFVD",jsb.fileUtils.removeDirectory(tarDir));

	ut.caseLock("ZVTNOXLY");

	var fff=function(ii){
		var i=ii;

	IQSEDGQA_manager[i] = new jsb.AssetsManager("res/000.manifest", tarDir);
	
	IQSEDGQA_manager[i].retain();

	ut.tt("HACMAWVI",IQSEDGQA_manager[i].getLocalManifest().isLoaded());

		cc.log("HAZMHCLW");
		IQSEDGQA_listener[i] = new jsb.EventListenerAssetsManager(IQSEDGQA_manager[i], function(event) {
			ut.run(function(){
				ut.tt("EIPAEHLN "+i,event.getAssetsManagerEx()==IQSEDGQA_manager[i]);
				cc.log("TDZHCFKF "+event.getEventCode());
	        switch (event.getEventCode())
	        {
	            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
	                cc.log("No local manifest file found, skip assets update.");
	                break;
	            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
	                var percent = event.getPercent();
	                var filePercent = event.getPercentByFile();
	                cc.log("Download percent : " + percent + " | File percent : " + filePercent);
	                break;
	            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
	            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
	                cc.log("Fail to download manifest file, update skipped.");
	                break;
	            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
	            case jsb.EventAssetsManager.UPDATE_FINISHED:
	                cc.log("HCRYMMZO Update finished. "+i);
	                ut.tt("UIZILTMY",IQSEDGQA_manager[i]!=null);
	                // You need to release the assets manager while you are sure you don't need it any more
	                IQSEDGQA_manager[i].release();
	                if(i<10){
	                	cc.eventManager.removeListener(IQSEDGQA_listener[i]);
	                	fff(i+1);
	                }else{
	                	IQSEDGQA_manager=null;
	                	IQSEDGQA_listener=null;
	                	ut.caseUnlock("ZVTNOXLY");
	                }
	                break;
	            case jsb.EventAssetsManager.UPDATE_FAILED:
	                cc.log("Update failed. " + event.getMessage());
	                // Directly update previously failed assets, we suggest you to count and abort after several retry.
	                IQSEDGQA_manager[i].downloadFailedAssets();
	                break;
	            case jsb.EventAssetsManager.ERROR_UPDATING:
	                cc.log("Asset update error: " + event.getAssetId() + ", " + event.getMessage());
	                break;
	            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
	                cc.log(event.getMessage());
	                break;
	            case jsb.EventAssetsManager.ASSET_UPDATED:
                cc.log("JKPWEMQV jsb.EventAssetsManager.ASSET_UPDATED");
                break;
	            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                cc.log("FJICVUJB jsb.EventAssetsManager.NEW_VERSION_FOUND");
                break;
	            default:
	            		cc.log("RDKRAIGC AssetsManager UNHANDLED EVENT "+event.getEventCode());
	                break;
	        }
  			cc.log("NAZJSHMX");
			});
	    });
	
		cc.log("ICCBQRBQ");
		cc.eventManager.addListener(IQSEDGQA_listener[i], 1);
		cc.log("JGOYNJJP");

		IQSEDGQA_manager[i].update();

	cc.log("MLBMMWUY")
	};
	
	fff(0);
});
