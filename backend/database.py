from pymongo import MongoClient
import os

# MongoDB connection
mongo_uri = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/todoapp')
client = MongoClient(mongo_uri)
db = client.todoapp

# Collections
users = db.users
tasks = db.tasks
