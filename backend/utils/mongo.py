from bson import ObjectId
from datetime import datetime


def to_object_id(value):
    if isinstance(value, ObjectId):
        return value
    try:
        return ObjectId(value)
    except Exception:
        return None


def serialize_document(document):
    if not document:
        return None
    serialized = {}
    for key, value in document.items():
        if isinstance(value, ObjectId):
            serialized[key] = str(value)
        elif isinstance(value, datetime):
            serialized[key] = value.isoformat()
        else:
            serialized[key] = value
    return serialized


def serialize_list(cursor):
    return [serialize_document(doc) for doc in cursor]
