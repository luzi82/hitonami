#!/bin/bash

echo "var case_bLRWLcbT=["

echo "[\"\",\"\",0],"

for LEN in {1..200}
do

dd if=/dev/urandom of=/tmp/test_bLRWLcbT bs=${LEN} count=1 2> /dev/null
HEX=`cat /tmp/test_bLRWLcbT | xxd -p -c ${LEN}`
B64=`cat /tmp/test_bLRWLcbT | base64 -w 0`

echo "[\"${HEX}\",\"${B64}\",${LEN}],"

done

echo "];"

rm /tmp/test_bLRWLcbT
