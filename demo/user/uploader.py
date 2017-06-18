import io
import http
import requests

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



def POST(filename):

	url = 'http://localhost:49160/saveSample'
	headers = {'Content-type': 'application/json'}
	chunk_size = 512
	print('POSTing ' + filename)
	r = requests.post('http://localhost:49160/saveSample', data=read_in_chunks(filename), headers=headers)
	print(r.text)
	return True





print(POST("../../examples/data/1.json"))