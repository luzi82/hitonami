#ifndef __hn_stream_h__
#define __hn_stream_h__

#include "cocos2d.h"

namespace cocos2d{
class Data;
}

namespace hn{

class HNData;
class HNInputStream;

class HNStream : public cocos2d::Ref
{
public:
	HNStream();
	virtual ~HNStream();
	bool init();

public:
	bool _open();
	void _close();
	HNData* _readAll();
	
	CREATE_FUNC(HNStream);

public:
	static HNStream* _fromFile(const std::string& aFilename);

public:
	HNInputStream* mInputStream;

};

} // namespace hn

// __hn_stream_h__
#endif
