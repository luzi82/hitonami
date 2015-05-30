var hn = hn || {};

hn.Signature = {};

hn.Signature.RSA = "RSA";

hn.Signature.verify = function(signatureType,checksumType,hash,sign,publicKey){
	if(signatureType==null)return false;
	if(checksumType==null)return false;
	if(hash==null)return false;
	if(sign==null)return false;
	if(publicKey==null)return false;
	
	if(hash.isEmpty())return false;
	if(sign.isEmpty())return false;
	if(publicKey.isEmpty())return false;
	
	if(signatureType==hn.Signature.RSA){
		return __hn.HNOpenssl._verifyRsa(
			checksumType,
			hash.__hndata,
			sign.__hndata,
			publicKey.__hndata
		);
	}
	
	return null;
}
