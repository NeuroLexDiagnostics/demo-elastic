import math
import re

def frange(start, stop, step):
	i = start
	while i < stop:
		yield i
		i += step

def generate_range_str(width, end, start=0):
	"""
	Start is the last parameter because it defaults to 0.
	"""

	range_str = "\\\"ranges\\\":["

	for i in frange(start,end,width):
		range_str +="{\\\"from\\\":"+str(i)+",\\\"to\\\""+str(i+width)+"}"

		if (i < end - width):
			range_str+=","

	
	range_str += "]"

	print(range_str)
	return range_str


example_str = "\"ranges\":[{\"from\":0,\"to\":0.02},{\"from\":0.02,\"to\":0.04},{\"from\":0.04,\"to\":0.06},{\"from\":0.06,\"to\":0.08},{\"from\":0.08,\"to\":0.1}]"

print(example_str)
generated_str = generate_range_str(.02, .1)

print(example_str == generated_str)