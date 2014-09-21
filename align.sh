#!/bin/sh
rm localreads.apk
zipalign -v 4 platforms/android/ant-build/LocalReads-release-unsigned.apk localreads.apk

