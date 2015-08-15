#include "HNUnzipInputStream.h"

namespace hn{

HNUnzipInputStream::HNUnzipInputStream(HNInputStream*aInputStream,const std::string& aEntryName):
	mInputStream(aInputStream),
	mEntryName(aEntryName),
	mUnzFilePtr(NULL)
{
	mUf.iInputStream=mInputStream;
}
HNUnzipInputStream::~HNUnzipInputStream(){
	close();
	delete mInputStream;mInputStream=NULL;
	mUf.iInputStream=NULL;
}

bool HNUnzipInputStream::HNUnzipInputStream::open()
{
	if(mUnzFilePtr!=NULL)return false;

	if(!mInputStream->open()){
		CCLOG("!!! WVMGUWQN !!!");
		return false;
	}
	bool tmp=newUnzFilePtr();
	if(!tmp){
		CCLOG("!!! IIPOPDYY !!!");
		return false;
	}

	return true;
}
void HNUnzipInputStream::HNUnzipInputStream::close()
{
	freeUnzFilePtr();
	mInputStream->close();
}
ssize_t HNUnzipInputStream::HNUnzipInputStream::read(unsigned char* buf,ssize_t n)
{
	if(mUnzFilePtr==NULL)return -1;
	return cocos2d::unzReadCurrentFile(mUnzFilePtr,buf,n);
}
int HNUnzipInputStream::HNUnzipInputStream::seek(ssize_t aOffset,int aOrigin)
{
	if(aOrigin==SEEK_SET){
		return _seek(aOffset);
	}else if(aOrigin==SEEK_CUR){
		return _seek(cocos2d::unztell(mUnzFilePtr)+aOffset);
	}else if(aOrigin==SEEK_END){
		return _seek(mUnzFileInfo.uncompressed_size+aOffset);
	}
	return -1;
}
int HNUnzipInputStream::_seek(ssize_t aOffset){
	if(aOffset<0)return -1;
	if(aOffset>mUnzFileInfo.uncompressed_size)return -1;
	int diff = aOffset-cocos2d::unztell(mUnzFilePtr);
	if(diff==0)return 0;
	
	if(diff<0){
		freeUnzFilePtr();
		mInputStream->seek(0,SEEK_SET);
		if(!newUnzFilePtr())return -1;
	}

	diff = aOffset-cocos2d::unztell(mUnzFilePtr);

	const int SKIP_LEN = 4096;
	unsigned char* tmpBuf=new unsigned char[SKIP_LEN+10];
	while(diff>0){
		int expectLen=(diff>SKIP_LEN)?SKIP_LEN:diff;
		int actualLen=cocos2d::unzReadCurrentFile(mUnzFilePtr,tmpBuf,expectLen);
		if(actualLen!=expectLen){
			delete [] tmpBuf;tmpBuf=NULL;
			return -1;
		}
		diff-=actualLen;
	}
	delete [] tmpBuf;tmpBuf=NULL;
	if(cocos2d::unztell(mUnzFilePtr)!=aOffset)return -1;
	return 0;
}
ssize_t HNUnzipInputStream::HNUnzipInputStream::tell()
{
	if(mUnzFilePtr==NULL)return -1;
	return cocos2d::unztell(mUnzFilePtr);
}

bool HNUnzipInputStream::newUnzFilePtr()
{
	if(mUnzFilePtr!=NULL){
		CCLOG("!!! ZPQZEWQJ !!!");
		return false;
	}

	mUnzFilePtr = cocos2d::unzOpen2("dummy",&(mUf.mZfd));
	if(mUnzFilePtr==NULL){
		CCLOG("!!! EFEIKEEL !!!");
		return false;
	}
	
	int tmp;
	tmp = cocos2d::unzLocateFile(mUnzFilePtr,mEntryName.c_str(),1);
	if(tmp!=UNZ_OK){
		CCLOG("!!! HTXUQDIL !!!");
		cocos2d::unzClose(mUnzFilePtr);mUnzFilePtr=NULL;
		return false;
	}

	tmp = cocos2d::unzGetCurrentFileInfo(mUnzFilePtr, &mUnzFileInfo, NULL, 0, NULL, 0, NULL, 0);
	if(tmp!=UNZ_OK){
		CCLOG("!!! APVPWUGP !!!");
		cocos2d::unzClose(mUnzFilePtr);mUnzFilePtr=NULL;
		return false;
	}
	
	tmp = cocos2d::unzOpenCurrentFile(mUnzFilePtr);
	if(tmp!=UNZ_OK){
		CCLOG("!!! DHITLHMG !!!");
		cocos2d::unzClose(mUnzFilePtr);mUnzFilePtr=NULL;
		return false;
	}
	
	return true;
}
void HNUnzipInputStream::freeUnzFilePtr()
{
	if(mUnzFilePtr==NULL)return;
	cocos2d::unzCloseCurrentFile(mUnzFilePtr);
	cocos2d::unzClose(mUnzFilePtr);mUnzFilePtr=NULL;
}

} // namespace hn
