var ut={};

ut.eq = function(m,a,b){
	if(a==b){
		cc.log("CASE PASS: "+m);
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

ut.caseList=[];

ut.addCase=function(t,f){
	ut.caseList.push({
		title: t,
		func: f
	});
}

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
	}
	if(allGood){
		cc.log("ALL TEST PASS");
	}
}
