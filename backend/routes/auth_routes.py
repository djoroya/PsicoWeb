from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token
from utils.auth import hash_password, check_password
from database import users
import os

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json or {}
    username = data.get('username', '')
    password = data.get('password', '')

    if username == 'admin':
        admin_password = os.environ.get('ADMIN_PASSWORD')
        if not admin_password:
            return jsonify({'error': 'Admin password not configured'}), 500
        if password != admin_password:
            return jsonify({'error': 'Invalid credentials'}), 401
        token = create_access_token(identity='admin', additional_claims={'is_admin': True})
        return jsonify({'token': token, 'username': 'admin', 'isAdmin': True}), 200

    user = users.find_one({'username': username})
    if not user or not check_password(password, user['password']):
        return jsonify({'error': 'Invalid credentials'}), 401

    token = create_access_token(identity=str(user['_id']), additional_claims={'is_admin': False})
    return jsonify({'token': token, 'username': username, 'isAdmin': False}), 200


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json or {}
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
        'status': 'approved'
    })
    return jsonify({'message': 'User created'}), 201
