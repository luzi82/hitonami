#include "HNFileInputStream.h"

#include "CCFileUtils.h"

namespace hn{

HNFileInputStream::HNFileInputStream(const std::string& aFilename):
mFilename(aFilename),
mFile(NULL)
{}
HNFileInputStream::~HNFileInputStream()
{
	close();
}

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

int HNFileInputStream::seek(ssize_t aOffset,int aOrigin)
{
	if(mFile==NULL)return -1;
	return fseek(mFile,aOffset,aOrigin);
}

ssize_t HNFileInputStream::tell()
{
	if(mFile==NULL)return -1;
	return ftell(mFile);
}

}
