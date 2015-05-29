#ifndef __hn_data_h__
#define __hn_data_h__

#include <cstddef>
#include "cocos2d.h"

namespace cocos2d{
class Data;
}

namespace hn{

class HNData : public cocos2d::Ref
{
public:
	HNData();
	virtual ~HNData();
	bool init();

public:
	int _getSize();
	void _copy(HNData* aFrom);
	void _clear();
	bool _isEmpty();
	void _setZero();
	bool _equal(HNData* aFrom);
	
	std::string _toHex();
	std::string _toBase64();
	
	CREATE_FUNC(HNData);

public:
	static HNData* _fromFile(const std::string& aFilename);
	static HNData* _fromHex(const std::string& aHex);
	static HNData* _fromBase64(const std::string& aBase64);

public:
	cocos2d::Data* mData;
	
private:
	static bool _isBase64Char(char);
	static bool _isHexChar(char);
};

} // namespace hn

// __hn_data_h__
#endif
