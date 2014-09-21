#!/bin/sh
keytool -genkey -v -keystore localreads-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
