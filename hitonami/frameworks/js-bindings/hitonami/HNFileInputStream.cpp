#include "HNFileInputStream.h"

#include "CCFileUtils.h"

namespace hn{

HNFileInputStream::HNFileInputStream(const std::string& aFilename):
mFilename(aFilename),
mFile(NULL),
mFileSize(0)
{}
HNFileInputStream::~HNFileInputStream()
{
	close();
}

bool HNFileInputStream::open()
{
	if(mFile!=NULL)return false;
	
	int tmp;
	
	mFile=fopen(mFilename.c_str(),"rb");
	if(mFile==NULL)return false;

	tmp=fseek(mFile,0,SEEK_END);
	if(tmp!=0){close();return false;}
	mFileSize=ftell(mFile);
	tmp=fseek(mFile,0,SEEK_SET);
	if(tmp!=0){close();return false;}

	return true;
}

void HNFileInputStream::close()
{
	if(mFile==NULL)return;
	fclose(mFile);
	mFile=NULL;
	mFileSize=0;
}

ssize_t HNFileInputStream::read(unsigned char* buf,ssize_t n)
{
	if(mFile==NULL)return -1;
	return fread(buf,1,n,mFile);
}

int HNFileInputStream::seek(ssize_t aOffset,int aOrigin)
{
	if(mFile==NULL)return -1;

	ssize_t newTell=aOffset;
	if(aOrigin==SEEK_CUR)newTell+=ftell(mFile);
	if(aOrigin==SEEK_END)newTell+=mFileSize;
	
	if(newTell<0)return -1;
	if(newTell>mFileSize)return -1;
	
	return fseek(mFile,aOffset,aOrigin);
}

ssize_t HNFileInputStream::tell()
{
	if(mFile==NULL)return -1;
	return ftell(mFile);
}

}
