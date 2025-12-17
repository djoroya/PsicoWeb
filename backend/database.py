import os
from pymongo import MongoClient

mongo_uri = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/psicoweb')
client = MongoClient(mongo_uri)
db_name = os.environ.get('MONGO_DB', 'psicoweb')
db = client[db_name]

settings = db.settings
psychologists = db.psychologists
services = db.services
treatments = db.treatments
blog_posts = db.blog_posts
bookings = db.bookings
users = db.users

__all__ = [
    'db',
    'settings',
    'psychologists',
    'services',
    'treatments',
    'blog_posts',
    'bookings',
    'users',
]
