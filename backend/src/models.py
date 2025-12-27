# STL IMPORTS
from uuid import uuid4
from datetime import datetime
# INT IMPORTS
from db import db

class Account(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid4()))
    name = db.Column(db.String(20), nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

class Post(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid4()))
    poster_id = db.Column(db.String(36), db.ForeignKey('account.id'), nullable=False)
    url = db.Column(db.String(100), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

class Comment(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid4()))
    post_id = db.Column(db.String(36), db.ForeignKey('post.id'), nullable=False)
    commenter_id = db.Column(db.String(36), db.ForeignKey('account.id'), nullable=False)
    content = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)