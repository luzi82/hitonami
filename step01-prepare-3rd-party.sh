#!/bin/bash

# force quit when error
set -e

# sudo apt-get unzip cmake

rm -rf 3rd-party

mkdir 3rd-party
cd 3rd-party

wget http://www.cocos2d-x.org/filedown/cocos2d-js-v3.6.zip
echo "26d9b898d5376f2742c0803df87adb65  cocos2d-js-v3.6.zip" | md5sum -c -

wget http://dl.google.com/android/ndk/android-ndk-r10d-linux-x86_64.bin
echo "263b83071e6bca15f67898548d8d236e  android-ndk-r10d-linux-x86_64.bin" | md5sum -c -

wget http://dl.google.com/android/android-sdk_r24.2-linux.tgz
echo "a894cfc8c792bd56a3cceae214c975ad  android-sdk_r24.2-linux.tgz" | md5sum -c -

unzip cocos2d-js-v3.6.zip

chmod 755 android-ndk-r10d-linux-x86_64.bin
./android-ndk-r10d-linux-x86_64.bin

tar -xzvf android-sdk_r24.2-linux.tgz
pushd android-sdk-linux/tools
expect -c '
set timeout -1 ;
spawn ./android update sdk -u -t platform,platform-tool,build-tools-22.0.1,system-image,tool;
expect {
    "Do you accept the license" { exp_send "y\r" ; exp_continue }
    eof
}
'
popd
