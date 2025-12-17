from flask import Blueprint, jsonify
from bson import ObjectId
from database import settings, psychologists, services, treatments, blog_posts
from utils.mongo import serialize_document, serialize_list, to_object_id

public_bp = Blueprint('public', __name__)


def get_setting(key, default=None):
    record = settings.find_one({'key': key})
    return record['value'] if record else default


@public_bp.route('/home', methods=['GET'])
def home():
    hero = get_setting('home_hero', {})
    featured_services = serialize_list(services.find().limit(3))
    featured_psychologists = serialize_list(psychologists.find({'active': True}).limit(3))
    latest_posts = serialize_list(blog_posts.find().sort('created_at', -1).limit(3))
    return jsonify({
        'hero': hero,
        'services': featured_services,
        'psychologists': featured_psychologists,
        'blog': latest_posts,
        'booking_url': get_setting('booking_url', ''),
    })


@public_bp.route('/servicios', methods=['GET'])
def list_services():
    data = serialize_list(services.find())
    return jsonify(data), 200


@public_bp.route('/servicios/<service_id>', methods=['GET'])
def service_detail(service_id):
    oid = to_object_id(service_id)
    if not oid:
        return jsonify({'error': 'Invalid id'}), 400
    doc = services.find_one({'_id': oid})
    if not doc:
        return jsonify({'error': 'Service not found'}), 404
    return jsonify(serialize_document(doc)), 200


@public_bp.route('/tratamientos', methods=['GET'])
def list_treatments():
    data = serialize_list(treatments.find())
    return jsonify(data), 200


@public_bp.route('/tratamientos/<treatment_id>', methods=['GET'])
def treatment_detail(treatment_id):
    oid = to_object_id(treatment_id)
    if not oid:
        return jsonify({'error': 'Invalid id'}), 400
    doc = treatments.find_one({'_id': oid})
    if not doc:
        return jsonify({'error': 'Treatment not found'}), 404
    return jsonify(serialize_document(doc)), 200


@public_bp.route('/equipo', methods=['GET'])
def list_psychologists():
    data = serialize_list(psychologists.find({'active': True}))
    return jsonify(data), 200


@public_bp.route('/equipo/<psych_id>', methods=['GET'])
def psychologist_detail(psych_id):
    oid = to_object_id(psych_id)
    if not oid:
        return jsonify({'error': 'Invalid id'}), 400
    doc = psychologists.find_one({'_id': oid})
    if not doc:
        return jsonify({'error': 'Psychologist not found'}), 404
    return jsonify(serialize_document(doc)), 200


@public_bp.route('/blog', methods=['GET'])
def list_posts():
    data = serialize_list(blog_posts.find().sort('created_at', -1))
    return jsonify(data), 200


@public_bp.route('/blog/<slug>', methods=['GET'])
def post_detail(slug):
    doc = blog_posts.find_one({'slug': slug})
    if not doc:
        return jsonify({'error': 'Post not found'}), 404
    return jsonify(serialize_document(doc)), 200


@public_bp.route('/settings/booking', methods=['GET'])
def booking_settings():
    return jsonify({
        'booking_url': get_setting('booking_url', ''),
        'booking_api_key': get_setting('booking_api_key', ''),
    })
