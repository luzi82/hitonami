#include "HNData.h"

#include "CCData.h"
#include "CCFileUtils.h"

extern "C" 
{
#include "b64/cencode.h"
#include "b64/cdecode.h"
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

int HNData::_getSize(){
	if(mData==NULL)return 0;
	return mData->getSize();
}

void HNData::_copy(HNData* aFrom){
	delete mData;
	mData = NULL;
	
	if(aFrom==NULL)return;
	if(aFrom->mData==NULL)return;

	mData=new cocos2d::Data(*(aFrom->mData));
}

void HNData::_clear(){
	delete mData;
	mData = NULL;
}

bool HNData::_isNull(){
	if(mData==NULL)return true;
	return mData->isNull();
}

void HNData::_setZero(){
	if(mData==NULL)return;
	if(mData->isNull())return;
	
	ssize_t size = mData->getSize();
	unsigned char* buf = mData->getBytes();
	
	if(size==0)return;
	if(buf==NULL)return;
	
	memset(buf,0,size);
}

bool HNData::_equal(HNData* aFrom){
	if(aFrom==NULL)return false;
	if(_isNull()&&(aFrom->_isNull()))return true;
	if(_isNull())return false;
	if(aFrom->_isNull())return false;
	if(_getSize()!=aFrom->_getSize())return false;
	if(memcmp(mData->getBytes(),aFrom->mData->getBytes(),_getSize())!=0)return false;
	return true; 
}

HNData* HNData::_fromFile(const std::string& aFilename){
	cocos2d::Data d=cocos2d::FileUtils::getInstance()->getDataFromFile(aFilename);
	HNData* ret=new HNData();
	delete ret->mData;
	ret->mData = NULL;
	ret->mData=new cocos2d::Data(d);
	return ret;
}

std::string HNData::_toHex(){
	if(mData==NULL)return "";
	if(mData->isNull())return "";
	ssize_t srcSize = mData->getSize();
	if(srcSize==0)return "";
	
	ssize_t dstSize = srcSize<<1;
	
	unsigned char* srcPtr=mData->getBytes();
	char* dstBuf=new char[dstSize+1];
	char* dstBufPtr=dstBuf;
	for(int i=0;i<srcSize;++i){
		sprintf(dstBufPtr,"%02x",*srcPtr);
		dstBufPtr+=2;
		++srcPtr;
	}
	*dstBufPtr=0;dstBufPtr++;
	
	std::string ret(dstBuf,dstSize);
	delete [] dstBuf; dstBuf = NULL;
	
	return ret;
}

std::string HNData::_toBase64(){
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
	*(retBuf+retBufLen)=0;
	
	std::string ret(retBuf,retBufLen);
	delete [] retBuf; retBuf = NULL;

	return ret;
}

HNData* HNData::_fromHex(const std::string& aHex){
	int srcSize = aHex.size();
	if(srcSize&1)return NULL; // odd length
	
	int i;
	for(i=0;i<srcSize;++i){
		if(!_isHexChar(aHex[i])){
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

HNData* HNData::_fromBase64(const std::string& aBase64){
	int srcSize = aBase64.size();
	if(srcSize&3)return NULL; // non 4 multi length
	
	int i=0;
	int aPart=srcSize-2;
	for(i=0;i<aPart;++i){
		if(!_isBase64Char(aBase64[i]))return NULL;
	}
	if(aPart>=0){
		char c0=aBase64[aPart];
		char c1=aBase64[aPart+1];
		if(c1=='='){
			if(c0=='='){
				// good
			}else{
				if(!_isBase64Char(c0))return NULL;
			}
		}else{
			if(!_isBase64Char(c0))return NULL;
			if(!_isBase64Char(c1))return NULL;
		}
	}
	
	int dstSize = (srcSize*3/4)+10;
	unsigned char* dstBuf=new unsigned char[dstSize];
	const char* srcPtr=aBase64.data();
	int dstLen = 0;
	
	base64_decodestate s;
	base64_init_decodestate(&s);
	dstLen += base64_decode_block(srcPtr, srcSize, (char*) dstBuf, &s);

	HNData* ret=new HNData();
	delete ret->mData;ret->mData = NULL;
	ret->mData = new cocos2d::Data();
	ret->mData->copy(dstBuf,dstLen);

	delete [] dstBuf;dstBuf=NULL;

	return ret;
}

bool HNData::_isBase64Char(char c){
	if((c>='0')&&(c<='9'))return true;
	if((c>='a')&&(c<='z'))return true;
	if((c>='A')&&(c<='Z'))return true;
	if(c=='+')return true;
	if(c=='/')return true;
	return false;
}

bool HNData::_isHexChar(char c){
	if((c>='0')&&(c<='9'))return true;
	if((c>='a')&&(c<='f'))return true;
	if((c>='A')&&(c<='F'))return true;
	return false;
}

} // namespace hn
