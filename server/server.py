from flask import Flask
from flask_cors import CORS
from routes import api_blueprint

app = Flask(__name__)
CORS(app)

app.register_blueprint(api_blueprint, url_prefix='/api')

if __name__ == '__main__':
    port = 3001
    print(f'Server is running on http://localhost:{port}')
    app.run(host='localhost', port=port, debug=True)
