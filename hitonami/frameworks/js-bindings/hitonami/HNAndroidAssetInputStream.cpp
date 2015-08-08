#include "HNAndroidAssetInputStream.h"

#include "CCFileUtils.h"

namespace hn{

HNAndroidAssetInputStream::HNAndroidAssetInputStream(const std::string& aFilename,int aMode):
mFilename(aFilename),
mMode(aMode),
mFile(NULL),
mOffset(0)
{}
HNAndroidAssetInputStream::~HNAndroidAssetInputStream()
{
	close();
}

bool HNAndroidAssetInputStream::open()
{
	if(mFile!=NULL)return false;
	mFile=AAssetManager_open(cocos2d::FileUtilsAndroid::getAssetManager(),mFilename.c_str(),mMode);
	mOffset=0;
	return mFile!=NULL;
}

void HNAndroidAssetInputStream::close()
{
	if(mFile==NULL)return;
	AAsset_close(mFile);
	mFile=NULL;
	mOffset=0;
}

ssize_t HNAndroidAssetInputStream::read(unsigned char* buf,ssize_t n)
{
	if(mFile==NULL)return -1;
	ssize_t ret=AAsset_read(mFile,buf,n);
	if(ret<=0)return ret;
	mOffset+=ret;
	return ret;
}

ssize_t HNAndroidAssetInputStream::skip(ssize_t n)
{
	if(mFile==NULL)return -1;
	int fseekRet=AAsset_seek(mFile,n,SEEK_CUR);
	if(fseekRet==-1)return -1;
	ssize_t ret=fseekRet-mOffset;
	mOffset=fseekRet;
	return ret;
}

}
