#ifndef __hn_unzipinputstream_h__
#define __hn_unzipinputstream_h__

#include "HNInputStream.h"

#ifdef MINIZIP_FROM_SYSTEM
#include <minizip/unzip.h>
#else // from our embedded sources
#include "unzip.h"
#endif

#include "HNUnzipInputStreamUf.h"

namespace hn{

class HNUnzipInputStream :
public HNInputStream
{
public:
	// aInputStream: transfer ownership
	HNUnzipInputStream(HNInputStream*aInputStream,const std::string& aEntryName);
	virtual ~HNUnzipInputStream();

public:
	virtual bool open();
	virtual void close();
	virtual ssize_t read(unsigned char* buf,ssize_t n);
	virtual int seek(ssize_t aOffset,int aOrigin);
	virtual ssize_t tell();

public:
	HNInputStream* mInputStream;
	const std::string mEntryName;
	HNUnzipInputStreamUf mUf;

public:
	cocos2d::unz_file_info mUnzFileInfo;
	unzFile mUnzFilePtr;
	
public:
	int _seek(ssize_t aOffset);
	bool newUnzFilePtr();
	void freeUnzFilePtr();

};

} // namespace hn

// __hn_unzipinputstream_h__
#endif
