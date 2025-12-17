from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId
from database import tasks

task_bp = Blueprint('tasks', __name__)

@task_bp.route('', methods=['GET'])
@jwt_required()
def get_tasks():
    """Get all tasks for the current user"""
    user_id = get_jwt_identity()
    user_tasks = list(tasks.find({'user_id': user_id}))
    
    for task in user_tasks:
        task['_id'] = str(task['_id'])
    
    return jsonify(user_tasks), 200

@task_bp.route('', methods=['POST'])
@jwt_required()
def create_task():
    """Create a new task"""
    user_id = get_jwt_identity()
    data = request.json
    title = data.get('title')
    
    if not title:
        return jsonify({'error': 'Title required'}), 400
    
    task = {
        'title': title,
        'completed': False,
        'user_id': user_id
    }
    
    result = tasks.insert_one(task)
    task['_id'] = str(result.inserted_id)
    
    return jsonify(task), 201

@task_bp.route('/<task_id>', methods=['PUT'])
@jwt_required()
def update_task(task_id):
    """Update a task"""
    user_id = get_jwt_identity()
    data = request.json
    
    task = tasks.find_one({'_id': ObjectId(task_id), 'user_id': user_id})
    
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    
    update_data = {}
    if 'title' in data:
        update_data['title'] = data['title']
    if 'completed' in data:
        update_data['completed'] = data['completed']
    
    tasks.update_one({'_id': ObjectId(task_id)}, {'$set': update_data})
    
    updated_task = tasks.find_one({'_id': ObjectId(task_id)})
    updated_task['_id'] = str(updated_task['_id'])
    
    return jsonify(updated_task), 200

@task_bp.route('/<task_id>', methods=['DELETE'])
@jwt_required()
def delete_task(task_id):
    """Delete a task"""
    user_id = get_jwt_identity()
    
    result = tasks.delete_one({'_id': ObjectId(task_id), 'user_id': user_id})
    
    if result.deleted_count == 0:
        return jsonify({'error': 'Task not found'}), 404
    
    return jsonify({'message': 'Task deleted'}), 200
