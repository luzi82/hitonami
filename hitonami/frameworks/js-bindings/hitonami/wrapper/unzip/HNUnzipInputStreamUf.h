#ifndef __hn_unzipinputstreamuf_h__
#define __hn_unzipinputstreamuf_h__

#ifdef MINIZIP_FROM_SYSTEM
#include <minizip/unzip.h>
#else // from our embedded sources
#include "unzip.h"
#endif

namespace hn{

class HNInputStream;

struct HNUnzipInputStreamUf{
	HNUnzipInputStreamUf();
	HNInputStream*iInputStream;
	cocos2d::zlib_filefunc_def mZfd;
};

}

// __hn_unzipinputstreamuf_h__
#endif
