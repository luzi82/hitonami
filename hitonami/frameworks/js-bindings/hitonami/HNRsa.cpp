#include "HNRsa.h"

#include <openssl/rsa.h>
#include <openssl/bio.h>
#include <openssl/pem.h>
#include "HNData.h"

namespace hn{

HNRsa::HNRsa(){}
HNRsa::~HNRsa(){}
bool HNRsa::init(){return true;}

bool HNRsa::_verify(const std::string& aHashType,HNData* aHash,HNData* aSign,HNData* aPublicKey){
	if(aHash==NULL)return false;
	if(aSign==NULL)return false;
	if(aPublicKey==NULL)return false;

	int type=0;
	if(aHashType=="SHA256"){
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

} // namespace hn
