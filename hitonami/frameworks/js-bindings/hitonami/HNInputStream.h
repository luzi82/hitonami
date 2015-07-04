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
	virtual ssize_t skip(ssize_t n);
};

} // namespace hn

// __hn_inputstream_h__
#endif
