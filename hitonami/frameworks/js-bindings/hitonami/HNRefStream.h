#ifndef __hn_stream_h__
#define __hn_stream_h__

#include "cocos2d.h"

namespace cocos2d{
class Data;
}

namespace hn{

class HNRefData;
class HNInputStream;

class HNRefStream : public cocos2d::Ref
{
public:
	HNRefStream();
	virtual ~HNRefStream();
	bool init();

public:
	bool _open();
	void _close();
	HNRefData* _read(ssize_t len);
	HNRefData* _readAll();
	ssize_t _skip(ssize_t len);
	
	CREATE_FUNC(HNRefStream);

public:
	static HNRefStream* _fromFile(const std::string& aFilename);
	static HNRefStream* _crypto(
		HNRefStream* aStream,
		const std::string& aType,
		HNRefData* aKey,
		HNRefData* aIv
	);

public:
	HNInputStream* mInputStream;

};

} // namespace hn

// __hn_stream_h__
#endif
