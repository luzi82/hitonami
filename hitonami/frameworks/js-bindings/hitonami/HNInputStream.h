#ifndef __hn_inputstream_h__
#define __hn_inputstream_h__

#include "cocos2d.h"

namespace hn{

class HNInputStream
{
public:
	HNInputStream();
	virtual ~HNInputStream();

public:
	virtual bool open()=0;
	virtual void close()=0;
	virtual ssize_t read(unsigned char* buf,ssize_t n)=0;
	virtual int seek(ssize_t aOffset,int aOrigin)=0;
	virtual ssize_t tell()=0;
};

} // namespace hn

// __hn_inputstream_h__
#endif
