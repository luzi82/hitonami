import random
import json
import math

file_size = 1024*1024
phi = (1+math.sqrt(5))/2

sample = 1

ll = []

while True:
	sample_ceil=int(math.ceil(sample))*2
	if file_size/sample_ceil<64 :
		break
	l = []
	for i in xrange(sample_ceil):
		l.append(random.randint(0,file_size))
	l = sorted(l)
	ll.append(l)
	sample *= phi

print "var case_YJZPAOpk="
print json.dumps(ll,indent=1)
print ";"
