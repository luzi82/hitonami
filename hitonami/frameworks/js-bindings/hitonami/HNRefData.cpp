#include "HNRefData.h"

#include "CCData.h"
#include "CCFileUtils.h"

extern "C" 
{
#include "b64/cencode.h"
#include "b64/cdecode.h"
}

namespace hn{

HNRefData::HNRefData():
	mData(NULL)
{
}

HNRefData::~HNRefData()
{
	delete mData;
	mData = NULL;
}

bool HNRefData::init(){return true;}

int HNRefData::_getSize(){
	if(mData==NULL)return 0;
	return mData->getSize();
}

void HNRefData::_copy(HNRefData* aFrom){
	delete mData;
	mData = NULL;
	
	if(aFrom==NULL)return;
	if(aFrom->mData==NULL)return;

	mData=new cocos2d::Data(*(aFrom->mData));
}

void HNRefData::_clear(){
	delete mData;
	mData = NULL;
}

bool HNRefData::_isEmpty(){
	if(mData==NULL)return true;
	return mData->isNull();
}

void HNRefData::_setZero(){
	if(mData==NULL)return;
	if(mData->isNull())return;
	
	ssize_t size = mData->getSize();
	unsigned char* buf = mData->getBytes();
	
	if(size==0)return;
	if(buf==NULL)return;
	
	memset(buf,0,size);
}

bool HNRefData::_equal(HNRefData* aFrom){
	if(aFrom==NULL)return false;
	if(_isEmpty()&&(aFrom->_isEmpty()))return true;
	if(_isEmpty())return false;
	if(aFrom->_isEmpty())return false;
	if(_getSize()!=aFrom->_getSize())return false;
	if(memcmp(mData->getBytes(),aFrom->mData->getBytes(),_getSize())!=0)return false;
	return true; 
}

HNRefData* HNRefData::_mid(int offset,int len){
	if(_isEmpty())return NULL;
	if(len>_getSize()-offset){
		len=_getSize()-offset;
	}
	unsigned char* buf=new unsigned char[len];
	memcpy(buf,mData->getBytes()+offset,len);
	
	HNRefData* ret=new HNRefData();
	ret->mData=new cocos2d::Data();
	ret->mData->fastSet(buf,len);

	return ret;	
}

HNRefData* HNRefData::_fromFile(const std::string& aFilename){
	cocos2d::Data d=cocos2d::FileUtils::getInstance()->getDataFromFile(aFilename);
	HNRefData* ret=new HNRefData();
	delete ret->mData;
	ret->mData = NULL;
	ret->mData=new cocos2d::Data(d);
	return ret;
}

std::string HNRefData::_toHex(){
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

std::string HNRefData::_toBase64(){
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

HNRefData* HNRefData::_fromHex(const std::string& aHex){
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
	
	HNRefData* ret=new HNRefData();
	delete ret->mData;ret->mData = NULL;
	ret->mData = new cocos2d::Data();
	ret->mData->copy(dstBuf,dstSize);
	
	delete [] dstBuf;dstBuf=NULL;
	dstPtr=NULL;
	
	return ret;
}

HNRefData* HNRefData::_fromBase64(const std::string& aBase64){
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

	HNRefData* ret=new HNRefData();
	delete ret->mData;ret->mData = NULL;
	ret->mData = new cocos2d::Data();
	ret->mData->copy(dstBuf,dstLen);

	delete [] dstBuf;dstBuf=NULL;

	return ret;
}

bool HNRefData::_isBase64Char(char c){
	if((c>='0')&&(c<='9'))return true;
	if((c>='a')&&(c<='z'))return true;
	if((c>='A')&&(c<='Z'))return true;
	if(c=='+')return true;
	if(c=='/')return true;
	return false;
}

bool HNRefData::_isHexChar(char c){
	if((c>='0')&&(c<='9'))return true;
	if((c>='a')&&(c<='f'))return true;
	if((c>='A')&&(c<='F'))return true;
	return false;
}

} // namespace hn
