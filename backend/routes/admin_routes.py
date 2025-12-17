from datetime import datetime
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt

from database import settings, psychologists, services, treatments, blog_posts, bookings
from utils.mongo import serialize_document, serialize_list, to_object_id

admin_bp = Blueprint('admin', __name__)


def require_admin():
    claims = get_jwt()
    if not claims.get('is_admin'):
        return jsonify({'error': 'Admin access required'}), 403
    return None


def upsert_setting(key, value):
    settings.update_one({'key': key}, {'$set': {'value': value}}, upsert=True)


@admin_bp.route('/settings', methods=['GET', 'POST'])
@jwt_required()
def manage_settings():
    if (resp := require_admin()) is not None:
        return resp
    if request.method == 'GET':
        data = serialize_list(settings.find())
        return jsonify(data), 200
    payload = request.json or {}
    key = payload.get('key')
    value = payload.get('value')
    if not key:
        return jsonify({'error': 'key required'}), 400
    upsert_setting(key, value)
    return jsonify({'message': 'Setting saved'}), 200


@admin_bp.route('/settings/<setting_id>', methods=['DELETE'])
@jwt_required()
def delete_setting(setting_id):
    if (resp := require_admin()) is not None:
        return resp
    result = settings.delete_one({'_id': to_object_id(setting_id)})
    if result.deleted_count == 0:
        return jsonify({'error': 'Setting not found'}), 404
    return jsonify({'message': 'Setting deleted'}), 200


@admin_bp.route('/psychologists', methods=['GET', 'POST'])
@jwt_required()
def psychologists_collection():
    if (resp := require_admin()) is not None:
        return resp
    if request.method == 'GET':
        data = serialize_list(psychologists.find())
        return jsonify(data), 200
    payload = request.json or {}
    doc = {
        'name': payload.get('name'),
        'bio': payload.get('bio', ''),
        'specialty': payload.get('specialty', ''),
        'photo_url': payload.get('photo_url', ''),
        'active': payload.get('active', True),
    }
    result = psychologists.insert_one(doc)
    return jsonify({'_id': str(result.inserted_id), **doc}), 201


@admin_bp.route('/psychologists/<psych_id>', methods=['PUT', 'DELETE'])
@jwt_required()
def psychologist_detail(psych_id):
    if (resp := require_admin()) is not None:
        return resp
    oid = to_object_id(psych_id)
    if not oid:
        return jsonify({'error': 'Invalid id'}), 400
    if request.method == 'DELETE':
        result = psychologists.delete_one({'_id': oid})
        if result.deleted_count == 0:
            return jsonify({'error': 'Psychologist not found'}), 404
        return jsonify({'message': 'Psychologist deleted'}), 200
    payload = request.json or {}
    update = {k: v for k, v in payload.items() if k in {'name', 'bio', 'specialty', 'photo_url', 'active'}}
    psychologists.update_one({'_id': oid}, {'$set': update})
    updated = psychologists.find_one({'_id': oid})
    return jsonify(serialize_document(updated)), 200


@admin_bp.route('/services', methods=['GET', 'POST'])
@jwt_required()
def services_collection():
    if (resp := require_admin()) is not None:
        return resp
    if request.method == 'GET':
        data = serialize_list(services.find())
        return jsonify(data), 200
    payload = request.json or {}
    doc = {
        'title': payload.get('title'),
        'description': payload.get('description', ''),
        'price': payload.get('price', 0),
        'duration': payload.get('duration', 0),
        'image_url': payload.get('image_url', ''),
    }
    result = services.insert_one(doc)
    return jsonify({'_id': str(result.inserted_id), **doc}), 201


@admin_bp.route('/services/<service_id>', methods=['PUT', 'DELETE'])
@jwt_required()
def service_detail(service_id):
    if (resp := require_admin()) is not None:
        return resp
    oid = to_object_id(service_id)
    if not oid:
        return jsonify({'error': 'Invalid id'}), 400
    if request.method == 'DELETE':
        result = services.delete_one({'_id': oid})
        if result.deleted_count == 0:
            return jsonify({'error': 'Service not found'}), 404
        return jsonify({'message': 'Service deleted'}), 200
    payload = request.json or {}
    update = {k: v for k, v in payload.items() if k in {'title', 'description', 'price', 'duration', 'image_url'}}
    services.update_one({'_id': oid}, {'$set': update})
    updated = services.find_one({'_id': oid})
    return jsonify(serialize_document(updated)), 200


@admin_bp.route('/treatments', methods=['GET', 'POST'])
@jwt_required()
def treatments_collection():
    if (resp := require_admin()) is not None:
        return resp
    if request.method == 'GET':
        data = serialize_list(treatments.find())
        return jsonify(data), 200
    payload = request.json or {}
    doc = {
        'title': payload.get('title'),
        'content': payload.get('content', ''),
        'image_url': payload.get('image_url', ''),
    }
    result = treatments.insert_one(doc)
    return jsonify({'_id': str(result.inserted_id), **doc}), 201


@admin_bp.route('/treatments/<treatment_id>', methods=['PUT', 'DELETE'])
@jwt_required()
def treatment_detail(treatment_id):
    if (resp := require_admin()) is not None:
        return resp
    oid = to_object_id(treatment_id)
    if not oid:
        return jsonify({'error': 'Invalid id'}), 400
    if request.method == 'DELETE':
        result = treatments.delete_one({'_id': oid})
        if result.deleted_count == 0:
            return jsonify({'error': 'Treatment not found'}), 404
        return jsonify({'message': 'Treatment deleted'}), 200
    payload = request.json or {}
    update = {k: v for k, v in payload.items() if k in {'title', 'content', 'image_url'}}
    treatments.update_one({'_id': oid}, {'$set': update})
    updated = treatments.find_one({'_id': oid})
    return jsonify(serialize_document(updated)), 200


@admin_bp.route('/blog', methods=['GET', 'POST'])
@jwt_required()
def blog_collection():
    if (resp := require_admin()) is not None:
        return resp
    if request.method == 'GET':
        data = serialize_list(blog_posts.find().sort('created_at', -1))
        return jsonify(data), 200
    payload = request.json or {}
    doc = {
        'title': payload.get('title'),
        'slug': payload.get('slug'),
        'content': payload.get('content', ''),
        'cover_image': payload.get('cover_image', ''),
        'created_at': datetime.utcnow(),
    }
    if blog_posts.find_one({'slug': doc['slug']}):
        return jsonify({'error': 'Slug must be unique'}), 400
    result = blog_posts.insert_one(doc)
    return jsonify({'_id': str(result.inserted_id), **{k: v if not isinstance(v, datetime) else v.isoformat() for k, v in doc.items()}}), 201


@admin_bp.route('/blog/<post_id>', methods=['PUT', 'DELETE'])
@jwt_required()
def blog_detail(post_id):
    if (resp := require_admin()) is not None:
        return resp
    oid = to_object_id(post_id)
    if not oid:
        return jsonify({'error': 'Invalid id'}), 400
    if request.method == 'DELETE':
        result = blog_posts.delete_one({'_id': oid})
        if result.deleted_count == 0:
            return jsonify({'error': 'Post not found'}), 404
        return jsonify({'message': 'Post deleted'}), 200
    payload = request.json or {}
    update = {k: v for k, v in payload.items() if k in {'title', 'slug', 'content', 'cover_image'}}
    blog_posts.update_one({'_id': oid}, {'$set': update})
    updated = blog_posts.find_one({'_id': oid})
    return jsonify(serialize_document(updated)), 200


@admin_bp.route('/bookings', methods=['GET'])
@jwt_required()
def bookings_collection():
    if (resp := require_admin()) is not None:
        return resp
    data = serialize_list(bookings.find().sort('date', -1))
    return jsonify(data), 200


@admin_bp.route('/booking-config', methods=['GET', 'POST'])
@jwt_required()
def booking_config():
    if (resp := require_admin()) is not None:
        return resp
    if request.method == 'GET':
        config_keys = ['booking_url', 'booking_api_key']
        stored = {item['key']: item['value'] for item in settings.find({'key': {'$in': config_keys}})}
        return jsonify(stored), 200
    payload = request.json or {}
    upsert_setting('booking_url', payload.get('booking_url', ''))
    upsert_setting('booking_api_key', payload.get('booking_api_key', ''))
    return jsonify({'message': 'Booking configuration saved'}), 200
