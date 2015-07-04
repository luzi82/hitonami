#ifndef __hn_fileinputstream_h__
#define __hn_fileinputstream_h__

#include "HNInputStream.h"

namespace hn{

class HNFileInputStream :
public HNInputStream
{
public:
	HNFileInputStream(const std::string& aFilename);
	virtual ~HNFileInputStream();

public:
	virtual bool open();
	virtual void close();
	virtual ssize_t read(unsigned char* buf,ssize_t n);
	virtual ssize_t skip(ssize_t n);

public:
	const std::string mFilename;
	FILE* mFile;

};

} // namespace hn

// __hn_fileinputstream_h__
#endif
