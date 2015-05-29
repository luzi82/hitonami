#ifndef __hn_rsa_h__
#define __hn_rsa_h__

#include "cocos2d.h"

namespace hn{

class HNData;

class HNRsa : public cocos2d::Ref
{
public:
	HNRsa();
	virtual ~HNRsa();
	bool init();
	
	CREATE_FUNC(HNRsa);

public:
	static bool _verify(const std::string& aHashType,HNData* aHash,HNData* aSign,HNData* aPublicKey);

};

} // namespace hn

// __hn_rsa_h__
#endif
