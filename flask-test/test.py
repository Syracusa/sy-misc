from flask import Flask
from flask import jsonify
from flask import request

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.get('/get-test/')
def login_get():
    data = request.get_json()
    print(data)
    
    response = jsonify({"test-response" : "dummy-response"})
    return response


@app.post('/post-test/')
def post_csr():
    auth_header = request.headers['Authorization']
    print(auth_header)

    data = request.get_json()
    print(data)

    response = jsonify({"test-response" : "dummy-response"})
    return response


if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', ssl_context=('server.cert.pem', 'server.key.pem'))