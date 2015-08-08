var hn = hn || {};

function __HNRefStream() {

	this.open = function(){
		return this.__hnstream._open();
	}
	
	this.close = function(){
		this.__hnstream._close();
	}
	
	this.read = function(n){
		if(n==0){
			return new hn.Data();
		}
		return hn.Data._fromHNRefData( this.__hnstream._read(n) );
	}
	
	this.readAll = function(){
		return hn.Data._fromHNRefData( this.__hnstream._readAll() );
	}
	
	this.skip = function(n){
		return this.__hnstream._skip(n);
	}
	
	this.__hnstream = null;
	
}

hn.Stream = __HNRefStream;

hn.Stream.fromFile = function(str){
	return hn.Stream._fromHNRefStream( __hn.HNRefStream._fromFile(str) );
}

hn.Stream.fromAndroidAsset = function(str,mode){
	return hn.Stream._fromHNRefStream( __hn.HNRefStream._fromAndroidAssetFile(str,mode) );
}

hn.Stream.fromRes = function(str){
	if(sys.os==sys.OS_ANDROID){
		return hn.Stream.fromAndroidAsset(str,0);
	}else{
		return hn.Stream.fromFile(str);
	}
}

hn.Stream.crypto = function(stream,method,key,iv){
	return hn.Stream._fromHNRefStream( __hn.HNRefStream._crypto(stream.__hnstream,method,key.__hndata,iv.__hndata) );
}

hn.Stream._fromHNRefStream = function(hnstream){
	if (hnstream == null)
		return null;
	var ret = new hn.Stream();
	ret.__hnstream = hnstream;
	return ret;
}

hn.Stream.CRYPTO_TYPE_AES128CBC_DEC = "AES128CBC_DEC";
