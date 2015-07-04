#include "HNStream.h"

#include "HNData.h"
#include "HNFileInputStream.h"
#include "HNInputStream.h"

namespace hn{

HNStream::HNStream():mInputStream(NULL){}
HNStream::~HNStream(){}
bool HNStream::init(){return true;}

bool HNStream::_open(){
	if(mInputStream==NULL)return false;
	return mInputStream->open();
}
void HNStream::_close(){
	if(mInputStream==NULL)return;
	mInputStream->close();
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
	delete buf;buf=NULL;

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

HNStream* HNStream::_fromFile(const std::string& aFilename){
	HNStream* ret = new HNStream();
	ret->mInputStream = new HNFileInputStream(aFilename);
	return ret;
}

}
