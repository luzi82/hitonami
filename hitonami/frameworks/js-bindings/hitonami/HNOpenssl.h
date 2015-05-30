#ifndef __hn_openssl_h__
#define __hn_openssl_h__

#include "cocos2d.h"

namespace hn{

class HNData;

class HNOpenssl : public cocos2d::Ref
{
public:
	HNOpenssl();
	virtual ~HNOpenssl();
	bool init();
	
	CREATE_FUNC(HNOpenssl);

public:
	static HNData* _checksumSha256(HNData* aData);

	static bool _verifyRsa(const std::string&aType,HNData* aHash,HNData* aSign,HNData* aPublicKey);

	static HNData* _decrypt(const std::string&aType,HNData* aEncData,HNData* aKey,HNData* aIv);

};

} // namespace hn

// __hn_openssl_h__
#endif
