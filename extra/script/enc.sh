#!/bin/bash

openssl aes-128-cbc -in ${1} -out ${1}.enc \
 -K  0123456789abcdef0123456789abcdef \
 -iv fedcba9876543210fedcba9876543210
