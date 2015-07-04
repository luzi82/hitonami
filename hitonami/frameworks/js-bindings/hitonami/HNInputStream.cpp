#include "HNInputStream.h"

namespace hn{

HNInputStream::HNInputStream(){}
HNInputStream::~HNInputStream(){}

ssize_t HNInputStream::skip(ssize_t n)
{
	const ssize_t TMP_BUF_SIZE = 4096;
	unsigned char* tmpBuf=new unsigned char[TMP_BUF_SIZE];
	
	ssize_t ret=0;
	while(ret<n)
	{
		ssize_t m=n-ret;
		if(m>TMP_BUF_SIZE)m=TMP_BUF_SIZE;
		m=read(tmpBuf,m);
		if(m<=0)break;
		ret+=m;
	}
	
	delete [] tmpBuf;
	
	return ret;
}

}
