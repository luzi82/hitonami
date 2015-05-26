#include "HNData.h"

#include "CCData.h"
#include "CCFileUtils.h"

extern "C" 
{
#include "b64/cencode.h"
}

namespace hn{

HNData::HNData():
	mData(NULL)
{
}

HNData::~HNData()
{
	delete mData;
	mData = NULL;
}

bool HNData::init(){return true;}

int HNData::getSize(){
	if(mData==NULL)return 0;
	return mData->getSize();
}

void HNData::copy(HNData* aFrom){
	delete mData;
	mData = NULL;
	
	if(aFrom==NULL)return;
	if(aFrom->mData==NULL)return;

	mData=new cocos2d::Data(*(aFrom->mData));
}

void HNData::clear(){
	delete mData;
	mData = NULL;
}

bool HNData::isNull(){
	if(mData==NULL)return true;
	return mData->isNull();
}

void HNData::setZero(){
	if(mData==NULL)return;
	if(mData->isNull())return;
	
	ssize_t size = mData->getSize();
	unsigned char* buf = mData->getBytes();
	
	if(size==0)return;
	if(buf==NULL)return;
	
	memset(buf,0,size);
}

HNData* HNData::fromFile(const std::string& aFilename){
	cocos2d::Data d=cocos2d::FileUtils::getInstance()->getDataFromFile(aFilename);
	HNData* ret=new HNData();
	delete ret->mData;
	ret->mData = NULL;
	ret->mData=new cocos2d::Data(d);
	return ret;
}

std::string HNData::toHex(){
	if(mData==NULL)return "";
	if(mData->isNull())return "";
	ssize_t size = mData->getSize();
	if(size==0)return "";
	
	unsigned char* srcPtr=mData->getBytes();
	char* retBuf=new char[size<<1];
	char* retBufPtr=retBuf;
	for(int i=0;i<size;++i){
		sprintf(retBufPtr,"%02x",*srcPtr);
		retBufPtr+=2;
		++srcPtr;
	}
	std::string ret(retBuf,size<<1);
	delete [] retBuf; retBuf = NULL;
	
	return ret;
}

std::string HNData::toBase64(){
	if(mData==NULL)return "";
	if(mData->isNull())return "";
	ssize_t size = mData->getSize();
	if(size==0)return "";
	
	ssize_t retBufSize=size;
	retBufSize<<=2;
	retBufSize/=3;
	retBufSize+=10;

	unsigned char* srcPtr=mData->getBytes();
	char* retBuf=new char[retBufSize];
	ssize_t retBufLen = 0;
	base64_encodestate s;
	base64_init_encodestate(&s);

	retBufLen += base64_encode_block((char*)srcPtr, size, retBuf, &s);
	retBufLen += base64_encode_blockend(retBuf+retBufLen, &s);
	
	std::string ret(retBuf,retBufLen);
	delete [] retBuf; retBuf = NULL;

	return ret;
}

HNData* HNData::fromHex(const std::string& aHex){
	int srcSize = aHex.size();
	if(srcSize&1)return NULL; // odd length
	
	int i;
	for(i=0;i<srcSize;++i){
		char c=aHex[i];
		if(!(((c>='0')&&(c<='9'))||((c>='a')&&(c<='f')))){
			return NULL;
		}
	}
	
	int dstSize = (srcSize>>1);
	unsigned char* dstBuf=new unsigned char[dstSize];
	unsigned char* dstPtr=dstBuf;
	const char* srcPtr=aHex.data();
	
	for(i=0;i<srcSize;i+=2){
		sscanf(srcPtr,"%2hhx",dstPtr);
		srcPtr+=2;
		++dstPtr;
	}
	
	HNData* ret=new HNData();
	delete ret->mData;ret->mData = NULL;
	ret->mData = new cocos2d::Data();
	ret->mData->copy(dstBuf,dstSize);
	
	delete [] dstBuf;dstBuf=NULL;
	dstPtr=NULL;
	
	return ret;
}
HNData* HNData::fromBase64(const std::string& aBase64){
	int srcSize = aBase64.size();
	if(srcSize&3)return NULL; // non 4 multi length

	return NULL;
}

} // namespace hn
