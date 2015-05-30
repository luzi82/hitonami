var hn = hn || {};

hn.Checksum = {};

hn.Checksum.SHA256 = "SHA256";

hn.Checksum.get = function(type,data){
	if(type==null)return null;
	if(data==null)return null;
	
	if(type==hn.Checksum.SHA256){
		return hn.Data._fromHNData( __hn.HNOpenssl._checksumSha256(data.__hndata) );
	}
	return null;
}
