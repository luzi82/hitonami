var hn = hn || {};

function __HNStream() {

	this.open = function(){
		return this.__hnstream._open();
	}
	
	this.close = function(){
		this.__hnstream._close();
	}
	
	this.read = function(n){
		return hn.Data._fromHNData( this.__hnstream._read(n) );
	}
	
	this.readAll = function(){
		return hn.Data._fromHNData( this.__hnstream._readAll() );
	}
	
	this.skip = function(n){
		return this.__hnstream._skip(n);
	}
	
	this.__hnstream = null;
	
}

hn.Stream = __HNStream;

hn.Stream.fromFile = function(str){
	return hn.Stream._fromHNStream( __hn.HNStream._fromFile(str) );
}

hn.Stream._fromHNStream = function(hnstream){
	if (hnstream == null)
		return null;
	var ret = new hn.Stream();
	ret.__hnstream = hnstream;
	return ret;
}
