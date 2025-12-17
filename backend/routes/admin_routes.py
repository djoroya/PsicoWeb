from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt
from bson import ObjectId
from database import users, tasks

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/users', methods=['GET'])
@jwt_required()
def get_all_users():
    """Get all users (admin only)"""
    claims = get_jwt()
    
    # Check if user is admin
    if not claims.get('is_admin'):
        return jsonify({'error': 'Admin access required'}), 403
    
    all_users = list(users.find({}, {'password': 0}))  # Exclude passwords
    for user in all_users:
        user['_id'] = str(user['_id'])
        # Get task count for each user
        user['task_count'] = tasks.count_documents({'user_id': str(user['_id'])})
        # Ensure status field exists (for backward compatibility)
        if 'status' not in user:
            user['status'] = 'approved'
    
    return jsonify(all_users), 200

@admin_bp.route('/tasks', methods=['GET'])
@jwt_required()
def get_all_tasks():
    """Get all tasks from all users (admin only)"""
    claims = get_jwt()
    
    # Check if user is admin
    if not claims.get('is_admin'):
        return jsonify({'error': 'Admin access required'}), 403
    
    all_tasks = list(tasks.find({}))
    for task in all_tasks:
        task['_id'] = str(task['_id'])
        # Get username for each task
        user = users.find_one({'_id': ObjectId(task['user_id'])})
        task['username'] = user['username'] if user else 'Unknown'
    
    return jsonify(all_tasks), 200

@admin_bp.route('/users/<user_id>/approve', methods=['PUT'])
@jwt_required()
def approve_user(user_id):
    """Approve a pending user (admin only)"""
    claims = get_jwt()
    
    # Check if user is admin
    if not claims.get('is_admin'):
        return jsonify({'error': 'Admin access required'}), 403
    
    result = users.update_one(
        {'_id': ObjectId(user_id)},
        {'$set': {'status': 'approved'}}
    )
    
    if result.matched_count == 0:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify({'message': 'User approved successfully'}), 200

@admin_bp.route('/users/<user_id>/reject', methods=['PUT'])
@jwt_required()
def reject_user(user_id):
    """Reject a user (admin only)"""
    claims = get_jwt()
    
    # Check if user is admin
    if not claims.get('is_admin'):
        return jsonify({'error': 'Admin access required'}), 403
    
    result = users.update_one(
        {'_id': ObjectId(user_id)},
        {'$set': {'status': 'rejected'}}
    )
    
    if result.matched_count == 0:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify({'message': 'User rejected successfully'}), 200

@admin_bp.route('/users/<user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    """Delete a user and all their tasks (admin only)"""
    claims = get_jwt()
    
    # Check if user is admin
    if not claims.get('is_admin'):
        return jsonify({'error': 'Admin access required'}), 403
    
    # First, delete all tasks belonging to this user
    tasks.delete_many({'user_id': user_id})
    
    # Then delete the user
    result = users.delete_one({'_id': ObjectId(user_id)})
    
    if result.deleted_count == 0:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify({'message': 'User and all their tasks deleted successfully'}), 200
