#ifndef __hn_inputstreambio_h__
#define __hn_inputstreambio_h__

#include <openssl/bio.h>

namespace hn{

class HNInputStream;

BIO* newInputStreamBio(HNInputStream& aInputStream);

}

// __hn_inputstreambio_h__
#endif
