var hn = hn || {};

hn.Sha256 = {};

hn.Sha256.getHash = function(data){
	return hn.Data._fromHNData( __hn.HNSha256._getHash(data.__hndata) );
}
