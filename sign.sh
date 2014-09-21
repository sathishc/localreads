#!/bin/sh
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore localreads-release-key.keystore platforms/android/ant-build/LocalReads-release-unsigned.apk alias_name
