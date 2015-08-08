#ifndef __hn_androidassetinputstream_h__
#define __hn_androidassetinputstream_h__

#if CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID

#include "HNInputStream.h"

#include "android/asset_manager.h"
#include "android/asset_manager_jni.h"

namespace hn{

class HNAndroidAssetInputStream :
public HNInputStream
{
public:
	HNAndroidAssetInputStream(const std::string& aFilename,int aMode);
	virtual ~HNAndroidAssetInputStream();

public:
	virtual bool open();
	virtual void close();
	virtual ssize_t read(unsigned char* buf,ssize_t n);
	virtual ssize_t skip(ssize_t n);

public:
	const std::string mFilename;
	int mMode;
	AAsset* mFile;
	int mOffset;

};

} // namespace hn

// CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID
#endif

// __hn_androidassetinputstream_h__
#endif
