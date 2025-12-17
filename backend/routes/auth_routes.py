from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token
from database import users
from utils.auth import hash_password, check_password
import os

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    """Register a new user with pending status"""
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({'error': 'Username and password required'}), 400
    
    if users.find_one({'username': username}):
        return jsonify({'error': 'Username already exists'}), 400
    
    hashed = hash_password(password)
    users.insert_one({
        'username': username, 
        'password': hashed,
        'status': 'pending'  # New users are pending by default
    })
    
    return jsonify({'message': 'User registered successfully. Waiting for admin approval.'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    """Login user or admin"""
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    # Check if it's admin login
    if username == 'admin':
        admin_password = os.environ.get('ADMIN_PASSWORD')
        if not admin_password:
            return jsonify({'error': 'Admin password not configured'}), 500
        
        if password == admin_password:
            # Create a special token for admin
            token = create_access_token(identity='admin', additional_claims={'is_admin': True})
            return jsonify({'token': token, 'username': 'admin', 'isAdmin': True}), 200
        else:
            return jsonify({'error': 'Invalid credentials'}), 401
    
    # Regular user login
    user = users.find_one({'username': username})
    
    if not user or not check_password(password, user['password']):
        return jsonify({'error': 'Invalid credentials'}), 401
    
    # Check user status
    user_status = user.get('status', 'approved')  # Default to approved for existing users
    if user_status == 'pending':
        return jsonify({'error': 'Your account is pending admin approval'}), 403
    elif user_status == 'rejected':
        return jsonify({'error': 'Your account has been rejected'}), 403
    
    token = create_access_token(identity=str(user['_id']), additional_claims={'is_admin': False})
    return jsonify({'token': token, 'username': username, 'isAdmin': False}), 200
