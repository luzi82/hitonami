#!/usr/bin/python

import random
import json
import math

file_size = 1024*1024

ll = []

for i in xrange(100):
	a = random.randint(0,file_size)
	b = random.randint(0,file_size)
	l = [a,b]
	ll.append(l)

print "var case_VbTSQqsN="
print json.dumps(ll,indent=1)
print ";"
