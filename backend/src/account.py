# STL IMPORTS
import re
# INT IMPORTS
from auth import login_required
from db import db
from models import Account
# EXT IMPORTS
from flask import Blueprint, request, jsonify, current_app, session
from werkzeug.security import generate_password_hash, check_password_hash

account_bp = Blueprint("account", __name__, url_prefix="/api/account")

@account_bp.route("/create", methods=["POST"])
def create_account():
    data = request.get_json()
    name = data['name']
    password = data['password']
    # Validate name: alphanumeric, underscore, or hyphen only
    if not name or not re.match(r"^[a-zA-Z0-9_-]+$", name):
        current_app.logger.info(f"Invalid account name attempted: {name}")
        return jsonify({"error": "Name must contain only alphanumeric characters, underscores, or hyphens"}), 400

    if Account.query.filter_by(name=name).first():
        current_app.logger.info(f"Attempted to create duplicate account: {name}")
        return jsonify({"error": "Account name already exists"}), 400

    acct = Account(name=name, password_hash=generate_password_hash(password))
    db.session.add(acct)
    db.session.commit()
    current_app.logger.info(f"Created new account: {name}")
    return jsonify({"id": acct.id}), 201

@account_bp.route("/login", methods=["GET"])
def login_account():
    data = request.get_json()
    name = data['name']
    password = data['password']
    acct = Account.query.filter_by(name=name).first()
    if acct and check_password_hash(acct.password_hash, password):
        current_app.logger.info(f"Account logged in: {name}")
        session['account_id'] = acct.id
        session['name'] = acct.name
        return jsonify({"id": acct.id}), 200
    else:
        current_app.logger.info(f"Failed login attempt for account: {name}")
        return jsonify({"error": "Invalid credentials"}), 401
    
@account_bp.route("/logout", methods=["GET"])
def logout_account():
    account_id = session.pop('account_id', None)
    name = session.pop('name', None)

    if account_id:
        current_app.logger.info(f"Account logged out: {name}")
        return jsonify({"message": "Logged out successfully"}), 200
    else:
        current_app.logger.info("Logout attempt with no active session")
        return jsonify({"error": "No active session"}), 400
    
@account_bp.route("/check-login", methods=["GET"])
@login_required()
def check_login():
        return jsonify({"message": "Logged in"}), 200