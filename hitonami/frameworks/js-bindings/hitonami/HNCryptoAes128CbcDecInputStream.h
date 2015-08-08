#ifndef __hn_cryptoaes128cbcdecinputstream_h__
#define __hn_cryptoaes128cbcdecinputstream_h__

#include "HNInputStream.h"
#include "cocos2d.h"

#include <openssl/bio.h>

namespace hn{

class HNCryptoAes128CbcDecInputStream :
public HNInputStream
{
public:
	HNCryptoAes128CbcDecInputStream();
	virtual ~HNCryptoAes128CbcDecInputStream();

public:
	// aInputStream: transfer ownership
	void setInputStream(HNInputStream*aInputStream);
	void setKey(const cocos2d::Data& aData);
	void setIv(const cocos2d::Data& aData);

public:
	virtual bool open();
	virtual void close();
	virtual ssize_t read(unsigned char* buf,ssize_t n);
	virtual ssize_t skip(ssize_t n);

public:
	HNInputStream* mInputStream;
	cocos2d::Data* mKey;
	cocos2d::Data* mIv;
	
	BIO* mCipherBio;
	
	bool mIsOpen;
	ssize_t mOffset;

private:
	void newCipherBio();
	void freeCipherBio();
};

} // namespace hn

// __hn_cryptoaes128cbcdecinputstream_h__
#endif
