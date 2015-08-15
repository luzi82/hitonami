#include "HNUnzipInputStreamUf.h"

#include "HNInputStream.h"

namespace hn{

voidpf   ZFD_AZHAKPOX_open_file_func      (voidpf opaque, const char* filename, int mode);
uLong    ZFD_AZHAKPOX_read_file_func      (voidpf opaque, voidpf stream, void* buf, uLong size);
uLong    ZFD_AZHAKPOX_write_file_func     (voidpf opaque, voidpf stream, const void* buf, uLong size);
int      ZFD_AZHAKPOX_close_file_func     (voidpf opaque, voidpf stream);
int      ZFD_AZHAKPOX_testerror_file_func (voidpf opaque, voidpf stream);
long     ZFD_AZHAKPOX_tell_file_func      (voidpf opaque, voidpf stream);
long     ZFD_AZHAKPOX_seek_file_func      (voidpf opaque, voidpf stream, uLong offset, int origin);

HNUnzipInputStreamUf::HNUnzipInputStreamUf():
	iInputStream(NULL)
{
    mZfd.zopen_file=ZFD_AZHAKPOX_open_file_func;
    mZfd.zread_file=ZFD_AZHAKPOX_read_file_func;
    mZfd.zwrite_file=ZFD_AZHAKPOX_write_file_func;
    mZfd.ztell_file=ZFD_AZHAKPOX_tell_file_func;
    mZfd.zseek_file=ZFD_AZHAKPOX_seek_file_func;
    mZfd.zclose_file=ZFD_AZHAKPOX_close_file_func;
    mZfd.zerror_file=ZFD_AZHAKPOX_testerror_file_func;
    mZfd.opaque=this;
}

// fopen_file_func
voidpf   ZFD_AZHAKPOX_open_file_func      (voidpf opaque, const char* filename, int mode)
{
	//CCLOG("!!! ZFD_AZHAKPOX_open_file_func !!!");
	// luzi82@gmail.com : do nothing, open function done in HNUnzipInputStream
	HNUnzipInputStreamUf*huisu=(HNUnzipInputStreamUf*)opaque;
	return huisu->iInputStream;
}

// fread_file_func
uLong    ZFD_AZHAKPOX_read_file_func      (voidpf opaque, voidpf stream, void* buf, uLong size)
{
	//CCLOG("!!! ZFD_AZHAKPOX_read_file_func !!! %ld",size);
	HNUnzipInputStreamUf*huisu=(HNUnzipInputStreamUf*)opaque;
    uLong ret;
    ret = (uLong)huisu->iInputStream->read((unsigned char*)buf, size);
    return ret;
}

// fwrite_file_func
uLong    ZFD_AZHAKPOX_write_file_func     (voidpf opaque, voidpf stream, const void* buf, uLong size)
{
	//CCLOG("!!! ZFD_AZHAKPOX_write_file_func !!!");
	return -1; // luzi82@gmail.com : not support
}

// fclose_file_func
int      ZFD_AZHAKPOX_close_file_func     (voidpf opaque, voidpf stream)
{
	// luzi82@gmail.com : do nothing, close function done in HNUnzipInputStream
	return 0;
}

// ferror_file_func
int      ZFD_AZHAKPOX_testerror_file_func (voidpf opaque, voidpf stream)
{
	return 0; // luzi82@gmail.com : not support
}

// ftell_file_func
long     ZFD_AZHAKPOX_tell_file_func      (voidpf opaque, voidpf stream)
{
	//CCLOG("!!! ZFD_AZHAKPOX_tell_file_func !!!");
	HNUnzipInputStreamUf*huisu=(HNUnzipInputStreamUf*)opaque;
    long ret;
    ret = (uLong)huisu->iInputStream->tell();
    return ret;
}

// fseek_file_func
long     ZFD_AZHAKPOX_seek_file_func      (voidpf opaque, voidpf stream, uLong offset, int origin)
{
	//CCLOG("!!! ZFD_AZHAKPOX_seek_file_func !!! %ld %d",offset,origin);
	HNUnzipInputStreamUf*huisu=(HNUnzipInputStreamUf*)opaque;
    int fseek_origin=0;
    switch (origin)
    {
    case ZLIB_FILEFUNC_SEEK_CUR :
        fseek_origin = SEEK_CUR;
        break;
    case ZLIB_FILEFUNC_SEEK_END :
        fseek_origin = SEEK_END;
        break;
    case ZLIB_FILEFUNC_SEEK_SET :
        fseek_origin = SEEK_SET;
        break;
    default: return -1;
    }
    long ret;
    ret = huisu->iInputStream->seek(offset,fseek_origin);
    return ret;
}

}
