LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)

LOCAL_MODULE := cocos2djs_shared

LOCAL_MODULE_FILENAME := libcocos2djs

LOCAL_SRC_FILES := hellojavascript/main.cpp \
                   ../../Classes/AppDelegate.cpp \
                   ../../../js-bindings/hitonami/HNCryptoAes128CbcDecInputStream.cpp \
                   ../../../js-bindings/hitonami/HNFileInputStream.cpp \
                   ../../../js-bindings/hitonami/HNInputStream.cpp \
                   ../../../js-bindings/hitonami/HNInputStreamBio.cpp \
                   ../../../js-bindings/hitonami/HNRefData.cpp \
                   ../../../js-bindings/hitonami/HNRefOpenssl.cpp \
                   ../../../js-bindings/hitonami/HNRefStream.cpp \
                   ../../../custom/auto/jsb_cocos2dx_hitonami.cpp \
                   ../../../js-bindings/external/libb64-1.2.1/src/cencode.c \
                   ../../../js-bindings/external/libb64-1.2.1/src/cdecode.c

LOCAL_C_INCLUDES := $(LOCAL_PATH)/../../Classes \
                    $(LOCAL_PATH)/../../../custom/auto \
                    $(LOCAL_PATH)/../../../js-bindings/hitonami \
                    $(LOCAL_PATH)/../../../js-bindings/external/libb64-1.2.1/include \
                    $(LOCAL_PATH)/../../../js-bindings/external/openssl-1.0.1l/include \
                    $(LOCAL_PATH)/../../../js-bindings/external/openssl-1.0.1l/crypto

LOCAL_STATIC_LIBRARIES := cocos_jsb_static

LOCAL_EXPORT_CFLAGS := -DCOCOS2D_DEBUG=2 -DCOCOS2D_JAVASCRIPT

include $(BUILD_SHARED_LIBRARY)


$(call import-module,bindings)
