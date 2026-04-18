# STL IMPORTS
import logging
from os import environ
# INT IMPORTS
from db import init_db
from account import account_bp
from post import post_bp
# EXT IMPORTS
from flask import Flask
from waitress import serve

app = Flask(__name__)
app.secret_key = environ['FLASK_SECRET_KEY']
init_db(app)

app.register_blueprint(account_bp)
app.register_blueprint(post_bp)

if environ.get('LOCAL') == "TRUE":
    app.logger.setLevel(logging.DEBUG)
    app.logger.info('Running in local mode!')
    from flask_cors import CORS
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

