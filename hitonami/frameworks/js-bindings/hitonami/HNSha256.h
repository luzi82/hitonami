#ifndef __hn_sha256_h__
#define __hn_sha256_h__

#include "cocos2d.h"

namespace hn{

class HNData;

class HNSha256 : public cocos2d::Ref
{
public:
	HNSha256();
	virtual ~HNSha256();
	bool init();
	
	CREATE_FUNC(HNSha256);

public:
	static HNData* _getHash(HNData* aData);

};

} // namespace hn

// __hn_sha256_h__
#endif
