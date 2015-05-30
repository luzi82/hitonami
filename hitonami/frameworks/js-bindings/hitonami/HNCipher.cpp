#include "HNCipher.h"

#include <openssl/evp.h>
#include "HNData.h"

namespace hn{

HNCipher::HNCipher(){}
HNCipher::~HNCipher(){}
bool HNCipher::init(){return true;}

HNData* HNCipher::_decrypt(const std::string& aMethod,HNData* aEnc,HNData* aKey,HNData* aIv){
	if(aEnc==NULL)return NULL;
	if(aKey==NULL)return NULL;
	if(aIv==NULL)return NULL;
	
	const EVP_CIPHER* cipher=NULL;
	if(aMethod=="AES-128-CBC"){
		cipher=EVP_aes_128_cbc();
	}else{
		return NULL;
	}
	
	if(aKey->_getSize()!=EVP_CIPHER_key_length(cipher)){
		return NULL;
	}
	if(aIv->_getSize()!=EVP_CIPHER_iv_length(cipher)){
		return NULL;
	}
	
	cocos2d::Data* encD=aEnc->mData;
	cocos2d::Data* keyD=aKey->mData;
	cocos2d::Data* ivD =aIv->mData;
	
	int retBufSize = encD->getSize()+256;
	unsigned char* retBuf=new unsigned char[retBufSize];
	int retBufLen = 0;
	int tmpInt = 0;

    EVP_CIPHER_CTX ctx;
    EVP_CIPHER_CTX_init(&ctx);
    EVP_DecryptInit_ex(&ctx, cipher, NULL, keyD->getBytes(), ivD->getBytes());

    if(!EVP_DecryptUpdate(&ctx, retBuf, &retBufLen, encD->getBytes(), encD->getSize()))
    {
    	delete [] retBuf;retBuf=NULL;
    	EVP_CIPHER_CTX_cleanup(&ctx);
	    return NULL;
    }
    if(!EVP_DecryptFinal_ex(&ctx, retBuf + retBufLen, &tmpInt))
    {
    	delete [] retBuf;retBuf=NULL;
    	EVP_CIPHER_CTX_cleanup(&ctx);
        return NULL;
    }
    retBufLen += tmpInt;
    EVP_CIPHER_CTX_cleanup(&ctx);
	
	HNData* ret=new HNData();
	ret->_clear();
	ret->mData=new cocos2d::Data();
	ret->mData->copy(retBuf,retBufLen);
	
	delete [] retBuf;retBuf=NULL;
	
	return ret;
}

}
