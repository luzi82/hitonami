#ifndef __hn_cipher_h__
#define __hn_cipher_h__

#include "cocos2d.h"

namespace hn{

class HNData;

class HNCipher : public cocos2d::Ref
{
public:
	HNCipher();
	virtual ~HNCipher();
	bool init();
	
	CREATE_FUNC(HNCipher);

public:
	static HNData* _decrypt(const std::string& aMethod,HNData* aEncData,HNData* aKey,HNData* aIv);

};

} // namespace hn

// __hn_cipher_h__
#endif
