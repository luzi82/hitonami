#ifndef __hn_data_h__
#define __hn_data_h__

#include "cocos2d.h"

namespace cocos2d{
class Data;
}

namespace hn{

class HNData : public cocos2d::Ref
{
public:
	HNData();
	virtual ~HNData();
	bool init();

public:
	int getSize();
	void copy(HNData* aFrom);
	void clear();
	bool isNull();
	void setZero();
	
	std::string toHex();
	std::string toBase64();
	
	CREATE_FUNC(HNData);

public:
	static HNData* fromFile(const std::string& aFilename);
	static HNData* fromHex(const std::string& aHex);
	static HNData* fromBase64(const std::string& aBase64);

public:
	cocos2d::Data* mData;
};

} // namespace hn

// __hn_data_h__
#endif
