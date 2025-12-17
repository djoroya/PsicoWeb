from datetime import datetime
from flask import Blueprint, jsonify, request
from database import bookings
from utils.mongo import serialize_document, to_object_id

webhook_bp = Blueprint('webhooks', __name__)


@webhook_bp.route('/bookings', methods=['POST'])
def booking_webhook():
    payload = request.json or {}
    booking = {
        'external_id': payload.get('external_id'),
        'psychologist_id': to_object_id(payload.get('psychologist_id')),
        'service_id': to_object_id(payload.get('service_id')),
        'date': datetime.fromisoformat(payload['date']) if payload.get('date') else datetime.utcnow(),
        'status': payload.get('status', 'pending'),
    }
    result = bookings.insert_one(booking)
    saved = bookings.find_one({'_id': result.inserted_id})
    return jsonify(serialize_document(saved)), 201
