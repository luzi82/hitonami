#include "HNStream.h"

#include "HN.h"
#include "HNData.h"
#include "HNFileInputStream.h"
#include "HNInputStream.h"
#include "HNCryptoAes128CbcDecInputStream.h"

namespace hn{

HNStream::HNStream():mInputStream(NULL){}
HNStream::~HNStream(){
	delete mInputStream;
	mInputStream = NULL;
}
bool HNStream::init(){return true;}

bool HNStream::_open(){
	if(mInputStream==NULL)return false;
	return mInputStream->open();
}

void HNStream::_close(){
	if(mInputStream==NULL)return;
	mInputStream->close();
}

HNData* HNStream::_read(ssize_t len){
	if(mInputStream==NULL)return NULL;
	if(len==0) return NULL;
	
	unsigned char* buf=new unsigned char[len];
	int retLen=mInputStream->read(buf,len);
	if(retLen<=0){
		delete [] buf;buf=NULL;
		return NULL;
	}
	
	HNData* ret=new HNData();
	ret->mData=new cocos2d::Data();
	ret->mData->fastSet(buf,retLen);

	return ret;
}

HNData* HNStream::_readAll(){
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
	
	HNData* ret=new HNData();
	ret->mData=new cocos2d::Data();
	ret->mData->fastSet(buf,len);
	
	return ret;
}

ssize_t HNStream::_skip(ssize_t len){
	if(mInputStream==NULL)return -1;
	
	return mInputStream->skip(len);
}

HNStream* HNStream::_fromFile(const std::string& aFilename){
	HNStream* ret = new HNStream();
	ret->mInputStream = new HNFileInputStream(aFilename);
	return ret;
}

HNStream* HNStream::_crypto(
	HNStream* aStream,
	const std::string& aMethod,
	HNData* aKey,
	HNData* aIv
){
	if(aMethod==HN_STREAM_CRYPTO_TYPE_AES128CBC_DEC)
	{
		HNCryptoAes128CbcDecInputStream* decInputStream = new HNCryptoAes128CbcDecInputStream();
		decInputStream->setInputStream(aStream->mInputStream);
		decInputStream->setKey(*(aKey->mData));
		decInputStream->setIv(*(aIv->mData));
		
		HNStream* ret = new HNStream();
		ret->mInputStream = decInputStream;
		
		aStream->mInputStream = NULL;
		
		return ret;
	}
	return NULL;
}

}
