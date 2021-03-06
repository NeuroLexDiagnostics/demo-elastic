import io
import os
import http
import requests
import time

UTF = 'utf-8'

def read_in_chunks(filename, chunk_size=128):
    """
    Lazy function (generator) to read a file piece by piece.
    Default chunk size: 1k.

    """
    file_object = open(filename, 'r', encoding='utf-8')
    while True:
        data = file_object.read(chunk_size)
        if not data:
            break
        yield str.encode(data)

def init():
    r = requests.get(url = 'http://localhost:49160/init')
    # print(r.text)
    return

def POST(path, filename):

	url = 'http://localhost:49160/saveSample'
	headers = {'Content-type': 'application/json'}
	chunk_size = 512
	print('POSTing ' + filename)
	r = requests.post(url, data=read_in_chunks(path + filename), headers=headers)
	return


def GET(id, index_type):
    url = 'http://localhost:49160/getSample'
    print("Getting " + index_type + " feature data with id " + str(id))
    r = requests.get(url, params={'id':id, 'type':index_type})
    print(r.status_code)
    return (index_type + " document " + str(id)+ "\n" + r.text)

init()
time.sleep(2)
path = "../../examples/data/" #edit this to relative path for 33 ID samples
for filename in os.listdir(path):
    if not os.path.isdir(path+filename):
    #don't post directories
        print(filename)
        POST(path, filename)
time.sleep(2)

print(GET(1, 'linguistic'))
# print(GET(2, 'linguistic'))
# print(GET(3, 'linguistic'))
# print(GET(4, 'linguistic'))
# print(GET(5, 'linguistic'))
# print(GET(1, 'audio'))

print('======================')
print('====     Done.    ====')
print('======================')
