#ifndef __hn_openssl_h__
#define __hn_openssl_h__

#include "cocos2d.h"

namespace hn{

class HNRefData;
class HNRefStream;

class HNRefOpenssl : public cocos2d::Ref
{
public:
	HNRefOpenssl();
	virtual ~HNRefOpenssl();
	bool init();
	
	CREATE_FUNC(HNRefOpenssl);

public:
	static HNRefData* _checksumSha256(HNRefData* aData);
	static HNRefData* _checksumSha256Stream(HNRefStream* aStream);

	static bool _verifyRsa(const std::string&aType,HNRefData* aHash,HNRefData* aSign,HNRefData* aPublicKey);

	static HNRefData* _decrypt(const std::string&aType,HNRefData* aEncData,HNRefData* aKey,HNRefData* aIv);

};

} // namespace hn

// __hn_openssl_h__
#endif
