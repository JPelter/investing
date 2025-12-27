from os import environ
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_db(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://postgres:{environ['POSTGRES_PASSWORD']}@{environ['POSTGRES_HOST']}/postgres"
    db.init_app(app)
    return db