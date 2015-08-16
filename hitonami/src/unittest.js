var ut={};

ut.eq = function(m,a,b){
	if(a==b){
		cc.log("CASE PASS: "+m);
		return;
	}
	throw("CASE FAIL: "+m+" "+a+"!="+b);
}

ut.eqq = function(m,a,b){
	if(a==b){
		return;
	}
	throw("CASE FAIL: "+m+" "+a+"!="+b);
}

ut.t = function(m,a){
	if(a){
		cc.log("CASE PASS: "+m);
		return;
	}
	throw("CASE FAIL: "+m)
}

ut.tt = function(m,a){
	if(a){
		return;
	}
	throw("CASE FAIL: "+m)
}

ut.caseList=[];

ut.addCase=function(t,f){
	ut.caseList.push({
		title: t,
		func: f
	});
}

// used to ignore case
ut.addCaseX=function(t,f){
	ut.caseList.push({
		title: t,
		func: function(){cc.log("IGNORED by addCaseX")}
	});
}

/*
ut.run=function(){
	var i;
	var allGood=true;
	for(i in ut.caseList){
		var c = ut.caseList[i];
		var good = false;
		cc.log("TEST START: "+c["title"]);
		try{
			c.func();
			good = true;
		}catch(e){
			good = false;
			cc.log(e);
		}
		if(good){
			cc.log("TEST PASS: "+c.title);
		}else{
			allGood = false;
			cc.log("TEST FAIL: "+c.title);
		}
		cc.log("===");
		if(!good){
			break;
		}
	}
	if(allGood){
		cc.log("ALL TEST PASS");
	}
}
*/

ut.testDone = 0;
ut.good=false;
ut.active=false;
ut.activeCase=null;
ut.caseLockAry=[];

ut.start=function(){
	ut.testDone = 0;
	ut.good=true;
	ut.active = true;
	ut.activeCase=null;
	ut.caseLockAry=[];
	
	ut.timer(ut.tick);
}

ut.tick=function(){
	if(!ut.active){
		return;
	}
	if(ut.activeCase==null){
		if(ut.testDone>=ut.caseList.length){
			ut.active=false;
			cc.log("ALL TEST PASS");
			return;
		}
		ut.activeCase = ut.caseList[ut.testDone];
		cc.log("TEST START: "+ut.activeCase["title"]);
		ut.next(ut.activeCase.func);
		return;
	}
	if(!ut.good){
		cc.log("TEST FAIL: "+ut.activeCase["title"]);
		ut.activeCase=null;
		ut.active=false;
		return;
	}
	if(ut.caseLockAry.length==0){
		cc.log("TEST PASS: "+ut.activeCase["title"]);
		cc.log("===");
		ut.activeCase=null;
		++ut.testDone;
		ut.timer(ut.tick);
		return;
	}
	ut.good=false;
	cc.log("!!! UNKNOWN TICK !!!: "+ut.activeCase["title"]);
	ut.timer(ut.tick);
}

ut.caseLock=function(s){
	ut.caseLockAry.push(s);
}

ut.caseUnlock=function(s){
	var idx=ut.caseLockAry.indexOf(s);
	if(idx<0){
		ut.good=false;
		cc.log("LOCK NOT FOUND: "+s);
		ut.timer(ut.tick);
		return;
	}
	ut.caseLockAry.splice(idx,1);
	if(ut.caseLockAry.length==0){
		ut.timer(ut.tick);
	}
}

ut.next=function(f){
	var ff=function(){
		try{
			f();
		}catch(e){
			ut.good = false;
			cc.log(e);
			ut.timer(ut.tick);
			return;
		}
		if(ut.caseLockAry.length==0){
			ut.timer(ut.tick);
		}
	};
	ut.timer(ff);
}

ut.timer=function(f){
	var ff=function(){
		f();
		cc.Director.getInstance().getScheduler().unscheduleCallbackForTarget(ut, ff);
	};
	cc.Director.getInstance().getScheduler().scheduleCallbackForTarget(ut, ff, 0, 0, 0, false);
}
