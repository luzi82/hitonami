#!/bin/bash

set -e
source env.sh

pushd hitonami >> /dev/null

cocos compile -p android
adb install -r frameworks/runtime-src/proj.android/bin/hitonami-debug.apk
adb logcat -c
adb shell am start -n com.luzi82.hitonami/org.cocos2dx.javascript.AppActivity
adb logcat

popd >> /dev/null
