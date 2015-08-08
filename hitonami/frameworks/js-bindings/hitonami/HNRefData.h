#ifndef __hn_data_h__
#define __hn_data_h__

#include <cstddef>
#include "cocos2d.h"

namespace cocos2d{
class Data;
}

namespace hn{

class HNRefData : public cocos2d::Ref
{
public:
	HNRefData();
	virtual ~HNRefData();
	bool init();

public:
	int _getSize();
	void _copy(HNRefData* aFrom);
	void _clear();
	bool _isEmpty();
	void _setZero();
	bool _equal(HNRefData* aFrom);
	HNRefData* _mid(int offset,int len);
	
	std::string _toHex();
	std::string _toBase64();
	
	CREATE_FUNC(HNRefData);

public:
	static HNRefData* _fromFile(const std::string& aFilename);
	static HNRefData* _fromHex(const std::string& aHex);
	static HNRefData* _fromBase64(const std::string& aBase64);

public:
	cocos2d::Data* mData;
	
private:
	static bool _isBase64Char(char);
	static bool _isHexChar(char);
};

} // namespace hn

// __hn_data_h__
#endif
