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
	int _seek(ssize_t aOffset,const std::string& aOrigin);
	ssize_t _tell();
	
	CREATE_FUNC(HNRefStream);

public:
	static HNRefStream* _fromFile(const std::string& aFilename);
	static HNRefStream* _fromAndroidAssetFile(const std::string& aFilename,int aMode);
	static HNRefStream* _crypto(
		HNRefStream* aStream,
		const std::string& aType,
		HNRefData* aKey,
		HNRefData* aIv
	);
	static HNRefStream* _fromArchiveStream(
		HNRefStream* aStream,
		const std::string& aEntryName,
		const std::string& aType
	);

public:
	HNInputStream* mInputStream;

};

} // namespace hn

// __hn_stream_h__
#endif
