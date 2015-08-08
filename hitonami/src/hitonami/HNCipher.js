var hn = hn || {};

hn.Cipher = {};

hn.Cipher.AES128CBC = "AES-128-CBC";

hn.Cipher.decrypt = function(method,enc,key,iv){
	if(method==null)return null;
	if(enc==null)return null;
	if(key==null)return null;
	if(iv==null)return null;
	return hn.Data._fromHNRefData( __hn.HNRefOpenssl._decrypt(method,enc.__hndata,key.__hndata,iv.__hndata) );
}
