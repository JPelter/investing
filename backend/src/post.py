# INT IMPORTS
from auth import login_required
from db import db
from models import Account, Post, Comment
# EXT IMPORTS
from flask import Blueprint, request, jsonify, current_app, session

post_bp = Blueprint("post", __name__, url_prefix="/api/post")

@post_bp.route("/create", methods=["POST"])
@login_required()
def create_post():
    data = request.get_json()
    url = data.get("url")
    title = data.get("title")
    if not url or not title:
        current_app.logger.info(f"Failed post creation attempt by account {session['name']}: Missing URL or title")
        return jsonify({"error": "URL and title are required"}), 400
    if Post.query.filter_by(url=url).first():
        current_app.logger.info(f"Duplicate post URL attempt by account {session['name']}: {url}")
        return jsonify({"error": "Post with this URL already exists"}), 400
    new_post = Post(poster_id=session['account_id'], url=data['url'], title=data['title'])
    db.session.add(new_post)
    db.session.commit()
    current_app.logger.info(f"New post created by account {session['name']}: {title}")
    return jsonify({"message": "Post created successfully", "post_id": new_post.id}), 201

@post_bp.route("/get", methods=["GET"])
def get_posts():
    page = request.args.get("page", default=0, type=int)
    offset = page * 20
    posts = Post.query.order_by(Post.created_at.desc()).limit(20).offset(offset).all()
    post_list = [{"id": post.id, "url": post.url, "title": post.title, "poster_id": post.poster_id, "created_at": post.created_at} for post in posts]
    current_app.logger.info("Posts retrieved")
    return jsonify({"posts": post_list}), 200