#include "HNFileInputStream.h"

namespace hn{

HNFileInputStream::HNFileInputStream(const std::string& aFilename):
mFilename(aFilename),
mFile(NULL)
{}
HNFileInputStream::~HNFileInputStream(){}

bool HNFileInputStream::open()
{
	if(mFile!=NULL)return false;
	mFile=fopen(mFilename.c_str(),"rb");
	return mFile!=NULL;
}

void HNFileInputStream::close()
{
	if(mFile==NULL)return;
	fclose(mFile);
	mFile=NULL;
}

ssize_t HNFileInputStream::read(unsigned char* buf,ssize_t n)
{
	if(mFile==NULL)return -1;
	return fread(buf,1,n,mFile);
}

ssize_t HNFileInputStream::skip(ssize_t n)
{
	if(mFile==NULL)return -1;
	int fseekRet=fseek(mFile,n,SEEK_CUR);
	if(fseekRet==0)return n;
	return -1;
}

}
