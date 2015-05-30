#include "HNOpenssl.h"

#include <openssl/evp.h>
#include <openssl/rsa.h>
#include <openssl/bio.h>
#include <openssl/pem.h>
#include "HNData.h"

namespace hn{

HNOpenssl::HNOpenssl(){}
HNOpenssl::~HNOpenssl(){}
bool HNOpenssl::init(){return true;}

HNData* HNOpenssl::_checksumSha256(HNData* aData){
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

bool HNOpenssl::_verifyRsa(const std::string& aType,HNData* aHash,HNData* aSign,HNData* aPublicKey){
	if(aHash==NULL)return false;
	if(aSign==NULL)return false;
	if(aPublicKey==NULL)return false;

	int type=0;
	if(aType=="SHA256"){
		type = NID_sha256;
	}else{
		return false;
	}
	
	cocos2d::Data* hashData=aHash->mData;
	cocos2d::Data* signData=aSign->mData;
	cocos2d::Data* keyData=aPublicKey->mData;
	
	BIO* public_pem_bio=NULL;
	public_pem_bio = BIO_new_mem_buf(aPublicKey->mData->getBytes(),aPublicKey->mData->getSize());
	BIO_set_close(public_pem_bio, BIO_NOCLOSE);
	
	RSA * public_rsa = NULL;
	public_rsa = PEM_read_bio_RSA_PUBKEY(public_pem_bio, NULL, NULL, NULL);
	BIO_free(public_pem_bio); public_pem_bio = NULL;

	if(public_rsa==NULL){
		return false;
	}
	
	int verifyGood = RSA_verify(
		type,
		hashData->getBytes(),
		hashData->getSize(),
		signData->getBytes(),
		signData->getSize(),
		public_rsa
	);
	
	RSA_free(public_rsa);
	
	return verifyGood==1;
}

HNData* HNOpenssl::_decrypt(const std::string& aMethod,HNData* aEnc,HNData* aKey,HNData* aIv){
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
