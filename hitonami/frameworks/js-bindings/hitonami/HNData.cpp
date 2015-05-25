#include "HNData.h"

#include "CCData.h"
#include "CCFileUtils.h"

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

} // namespace hn
