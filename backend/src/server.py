# STL IMPORTS
import logging
from os import environ
# EXT IMPORTS
from flask import Flask
from waitress import serve

app = Flask(__name__)
if environ.get('LOCAL') == "TRUE":
    from flask_cors import CORS
    app.logger.setLevel(logging.DEBUG)
    CORS(app, supports_credentials=True)
    app.config['CORS_HEADERS'] = 'Content-Type'
else:
    app.logger.setLevel(logging.INFO)


@app.route("/api")
def hello():
	return "Hello, World!"


if __name__ == "__main__":
    app.logger.info('Starting server!')
    serve(app, host='0.0.0.0', port=5000)

