# STL IMPORTS
from functools import wraps
# INT IMPORTS
from models import Account
# EXT IMPORTS
from flask import jsonify, session, current_app

def login_required():
    def decorator(function_to_protect):
        @wraps(function_to_protect)
        def wrapper(*args, **kwargs):
            current_app.logger.debug(f"login_required API call")
            if session.get('name'):
                return function_to_protect(*args, **kwargs)
            else:
                return jsonify({"error":"Try logging in!"}), 401
        return wrapper
    return decorator
