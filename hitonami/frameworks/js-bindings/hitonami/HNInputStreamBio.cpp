#include "HNInputStreamBio.h"

#include "HNInputStream.h"

namespace hn{

// TEMHQUTR

int TEMHQUTR_write(BIO *b, const char *in, int inl){
	// luzi82@gmail.com: not support
	return 0;
}

int TEMHQUTR_read(BIO *b, char *out, int outl){
	HNInputStream*inputStream = (HNInputStream*)b->ptr;
	return inputStream->read((unsigned char*)out,outl);
}

int TEMHQUTR_puts(BIO *bp, const char *str){
	// luzi82@gmail.com: not support
	return 0;
}

int TEMHQUTR_gets(BIO *bp, char *buf, int size){
	// luzi82@gmail.com: no mood to support
	return 0;
}

long TEMHQUTR_ctrl_seek(BIO *b, int cmd, long num, void *ptr);
long TEMHQUTR_ctrl(BIO *b, int cmd, long num, void *ptr){
	switch(cmd){
	case BIO_CTRL_PUSH:
		return 0;
	case BIO_C_FILE_SEEK:
		return TEMHQUTR_ctrl_seek(b,cmd,num,ptr);
	}
	// luzi82@gmail.com: unhandled!
	return 0;
}

long TEMHQUTR_ctrl_seek(BIO *b, int cmd, long num, void *ptr)
{
	HNInputStream*inputStream = (HNInputStream*)b->ptr;
	return inputStream->skip(num);
}

long TEMHQUTR_callback_ctrl(BIO *b, int cmd, bio_info_cb *fp)
{
	// luzi82@gmail.com: not support
	return 0;
}

int TEMHQUTR_new(BIO *bi){
	//printf("TEMHQUTR_new\n");
	bi->init=1;
	bi->ptr=NULL;
	bi->flags=0;
	return 1;
}

int TEMHQUTR_free(BIO *a){
	//printf("TEMHQUTR_free\n");
	return 1;
}

BIO_METHOD TEMHQUTR_BIO_METHOD = {
    (50|BIO_TYPE_SOURCE_SINK),
    "TEMHQUTR",
    TEMHQUTR_write,
    TEMHQUTR_read,
    TEMHQUTR_puts,
    TEMHQUTR_gets,
    TEMHQUTR_ctrl,
    TEMHQUTR_new,
    TEMHQUTR_free,
    TEMHQUTR_callback_ctrl,
};

BIO* newInputStreamBio(HNInputStream& aInputStream){
	BIO* ret = BIO_new(&TEMHQUTR_BIO_METHOD);
	ret->ptr = &aInputStream;
	return ret;
}

}
