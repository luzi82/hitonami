#include "HNRefStream.h"

#include "HN.h"
#include "HNRefData.h"
#include "HNFileInputStream.h"
#include "HNInputStream.h"
#include "HNCryptoAes128CbcDecInputStream.h"

namespace hn{

HNRefStream::HNRefStream():mInputStream(NULL){}
HNRefStream::~HNRefStream(){
	delete mInputStream;
	mInputStream = NULL;
}
bool HNRefStream::init(){return true;}

bool HNRefStream::_open(){
	if(mInputStream==NULL)return false;
	return mInputStream->open();
}

void HNRefStream::_close(){
	if(mInputStream==NULL)return;
	mInputStream->close();
}

HNRefData* HNRefStream::_read(ssize_t len){
	if(mInputStream==NULL)return NULL;
	if(len==0) return NULL;
	
	unsigned char* buf=new unsigned char[len];
	int retLen=mInputStream->read(buf,len);
	if(retLen<=0){
		delete [] buf;buf=NULL;
		return NULL;
	}
	
	HNRefData* ret=new HNRefData();
	ret->mData=new cocos2d::Data();
	ret->mData->fastSet(buf,retLen);

	return ret;
}

HNRefData* HNRefStream::_readAll(){
	//CCLOG("fworwoTP _readAll");
	
	if(mInputStream==NULL)return NULL;
	std::list<cocos2d::Data*> dataList;
	
	const int BUF_SIZE = 4096;
	unsigned char* buf=new unsigned char[BUF_SIZE];
	int len=0;
	while(true){
		int bufLen=mInputStream->read(buf,BUF_SIZE);
		//CCLOG("jBHkSOWs bufLen %d",bufLen);
		if(bufLen<=0)break;
		cocos2d::Data* data = new cocos2d::Data();
		data->copy(buf,bufLen);
		dataList.push_back(data);
		len+=bufLen;
	}
	delete [] buf;buf=NULL;

	//CCLOG("wcVcaUNZ len %d",len);
	
	buf = new unsigned char[len];
	std::list<cocos2d::Data*>::iterator itr=dataList.begin();
	std::list<cocos2d::Data*>::iterator end=dataList.end();
	int offset=0;
	
	while(itr!=end){
		cocos2d::Data* data = *itr;
		int bufLen=data->getSize();
		memcpy(buf+offset,data->getBytes(),bufLen);
		offset+=bufLen;
		delete data;data=NULL;
		*itr=NULL;
		++itr;
	}
	
	HNRefData* ret=new HNRefData();
	ret->mData=new cocos2d::Data();
	ret->mData->fastSet(buf,len);
	
	return ret;
}

ssize_t HNRefStream::_skip(ssize_t len){
	if(mInputStream==NULL)return -1;
	
	return mInputStream->skip(len);
}

HNRefStream* HNRefStream::_fromFile(const std::string& aFilename){
	HNRefStream* ret = new HNRefStream();
	ret->mInputStream = new HNFileInputStream(aFilename);
	return ret;
}

HNRefStream* HNRefStream::_crypto(
	HNRefStream* aStream,
	const std::string& aMethod,
	HNRefData* aKey,
	HNRefData* aIv
){
	if(aMethod==HN_STREAM_CRYPTO_TYPE_AES128CBC_DEC)
	{
		HNCryptoAes128CbcDecInputStream* decInputStream = new HNCryptoAes128CbcDecInputStream();
		decInputStream->setInputStream(aStream->mInputStream);
		decInputStream->setKey(*(aKey->mData));
		decInputStream->setIv(*(aIv->mData));
		
		HNRefStream* ret = new HNRefStream();
		ret->mInputStream = decInputStream;
		
		aStream->mInputStream = NULL;
		
		return ret;
	}
	return NULL;
}

}
