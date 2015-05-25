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
	
	CREATE_FUNC(HNData);

private:
	cocos2d::Data* mData;
};

} // namespace hn

// __hn_data_h__
#endif
