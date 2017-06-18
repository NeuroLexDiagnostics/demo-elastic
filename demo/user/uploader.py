import io
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
    print(r.text)
    return

def POST(filename):

	url = 'http://localhost:49160/saveSample'
	headers = {'Content-type': 'application/json'}
	chunk_size = 512
	print('POSTing ' + filename)
	r = requests.post(url, data=read_in_chunks(filename), headers=headers)
	print(r.text)
	return True


def GET(id):
    url = 'http://localhost:49160/getSample'
    print("Getting linguistic feature data with id " + str(id))
    r = requests.get(url, params={'id':id})
    return(r.text)

print(init())
time.sleep(2)
POST("../../examples/data/1.json")
time.sleep(2)
# POST("../../examples/data/2.json")
# POST("../../examples/data/3.json")
# POST("../../examples/data/4.json")
# POST("../../examples/data/5.json")

# pause(1000)
print(GET(1))

print('Done.')