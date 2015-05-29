#include "HNSha256.h"

#include <openssl/sha.h>
#include "HNData.h"

namespace hn{

HNSha256::HNSha256(){}
HNSha256::~HNSha256(){}
bool HNSha256::init(){return true;}

HNData* HNSha256::_getHash(HNData* aData){
	if(aData==NULL)return NULL;
	
	cocos2d::Data* data=aData->mData;

	unsigned char hash[SHA256_DIGEST_LENGTH];
	
	SHA256_CTX sha256;
	SHA256_Init(&sha256);
	if(!aData->_isEmpty()){
		SHA256_Update(&sha256, data->getBytes(), data->getSize());
	}
	SHA256_Final(hash,&sha256);
	
	HNData* ret=new HNData();
	ret->_clear();
	ret->mData=new cocos2d::Data();
	ret->mData->copy(hash,SHA256_DIGEST_LENGTH);
	
	return ret;
}

}
