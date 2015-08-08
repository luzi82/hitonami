#include "HNCryptoAes128CbcDecInputStream.h"

#include <openssl/bio.h>
#include <openssl/evp.h>
#include "HNInputStreamBio.h"

namespace hn{

HNCryptoAes128CbcDecInputStream::HNCryptoAes128CbcDecInputStream():
mInputStream(NULL),
mKey(NULL),
mIv(NULL),
mCipherBio(NULL),
mIsOpen(false),
mOffset(0)
{}
HNCryptoAes128CbcDecInputStream::~HNCryptoAes128CbcDecInputStream()
{
	freeCipherBio();
	delete mInputStream;mInputStream=NULL;
	delete mKey;mKey=NULL;
	delete mIv;mIv=NULL;
}

void HNCryptoAes128CbcDecInputStream::setInputStream(HNInputStream*aInputStream)
{
	delete mInputStream;mInputStream=NULL;
	mInputStream=aInputStream;
}
void HNCryptoAes128CbcDecInputStream::setKey(const cocos2d::Data& aData)
{
	delete mKey;mKey=NULL;
	mKey=new cocos2d::Data(aData);
}
void HNCryptoAes128CbcDecInputStream::setIv(const cocos2d::Data& aData)
{
	delete mIv;mIv=NULL;
	mIv=new cocos2d::Data(aData);
}

bool HNCryptoAes128CbcDecInputStream::open()
{
	if(mInputStream==NULL)return false;
	if(mIsOpen)return false;
	if(!(mInputStream->open()))return false;
	
	newCipherBio();
	
	mIsOpen=true;
	mOffset=0;
	
	return true;
}
void HNCryptoAes128CbcDecInputStream::close()
{
	if(mInputStream==NULL)return;
	freeCipherBio();
	mInputStream->close();
	mIsOpen=false;
	mOffset=0;
}
ssize_t HNCryptoAes128CbcDecInputStream::read(unsigned char* buf,ssize_t n)
{
	if(n==0)return 0;
	ssize_t ret = BIO_read(mCipherBio,buf,n);
	mOffset+=ret;
	return ret;
}
ssize_t HNCryptoAes128CbcDecInputStream::skip(ssize_t n)
{
	if(n==0)return 0;

	int result;

	if(n<=BIO_pending(mCipherBio)){
		unsigned char* tmpBuf=new unsigned char[n+10];
		ssize_t ret = BIO_read(mCipherBio,tmpBuf,n);
		delete [] tmpBuf;
		mOffset+=ret;
		return ret;
	}
	
	freeCipherBio();
	mInputStream->close();
	mInputStream->open();
	newCipherBio();

	unsigned char tmpBuf0[20];
	
	ssize_t skipLen = mOffset+n;
	
	ssize_t skipLen0 = skipLen&0xf;
	ssize_t skipLen1 = skipLen-skipLen0;

	if(skipLen1>=16){
		result=BIO_seek(mCipherBio,skipLen1-16);
		if(result<0){
			CCLOG("!!! NJvqhfwO !!!");
			return -1;
		}
		result=BIO_read(mCipherBio,tmpBuf0,16);
		if(result!=16){
			CCLOG("!!! HWcWxbBD !!!");
			return -1;
		}
	}
	
	if(skipLen0>0){
		result=BIO_read(mCipherBio,tmpBuf0,skipLen0);
		if(result!=skipLen0){
			CCLOG("!!! xJuJLGFx !!! result=%d, skipLen0=%d",result,(int)skipLen0);
			return -1;
		}
	}
	
	mOffset=skipLen;
	
	return n;
}

void HNCryptoAes128CbcDecInputStream::newCipherBio(){
	BIO* inputBio = newInputStreamBio(*mInputStream);
	mCipherBio = BIO_new(BIO_f_cipher());
	BIO_set_cipher (mCipherBio, EVP_aes_128_cbc (), mKey->getBytes(), mIv->getBytes(), 0);
	BIO_push(mCipherBio,inputBio);
}

void HNCryptoAes128CbcDecInputStream::freeCipherBio()
{
	if(mCipherBio==NULL)return;
	BIO_free_all(mCipherBio);
	mCipherBio=NULL;
}

} // namespace hn
