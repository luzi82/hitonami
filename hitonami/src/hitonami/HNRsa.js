var hn = hn || {};

hn.Rsa = {};

hn.Rsa.SHA256 = "SHA256";

hn.Rsa.verify = function(type,hash,sign,publicKey){
	if(type==null)return false;
	if(hash==null)return false;
	if(sign==null)return false;
	if(publicKey==null)return false;
	
	if(hash.isEmpty())return false;
	if(sign.isEmpty())return false;
	if(publicKey.isEmpty())return false;
	
	return __hn.HNRsa._verify(
			type,
			hash.__hndata,
			sign.__hndata,
			publicKey.__hndata
	);
}
