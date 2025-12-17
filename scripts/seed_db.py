import os
import json
import bcrypt
from pymongo import MongoClient

def seed_db():
    mongo_uri = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/psicoweb')
    db_name = os.environ.get('MONGO_DB', 'psicoweb')
    
    print(f"Connecting to database: {db_name} at {mongo_uri}")
    client = MongoClient(mongo_uri)
    db = client[db_name]

    # Load initial data
    json_path = os.path.join(os.path.dirname(__file__), 'initial_data.json')
    with open(json_path, 'r') as f:
        data = json.load(f)

    # Define unique keys for upsert operations
    unique_keys = {
        'users': 'username',
        'settings': 'key',
        'services': 'title',
        'treatments': 'title',
        'psychologists': 'name',
        'blog_posts': 'slug'
    }

    for collection_name, records in data.items():
        if not records:
            continue
            
        print(f"Seeding collection: {collection_name}")
        collection = db[collection_name]
        
        # Get unique key for this collection
        key_field = unique_keys.get(collection_name)
        if not key_field:
            print(f"  - Warning: No unique key defined for {collection_name}, skipping upsert.")
            continue

        upserted_count = 0
        for record in records:
            # Hash password for users collection
            if collection_name == 'users' and 'password' in record:
                # Override admin password if env var is set
                if record.get('username') == 'admin' and os.environ.get('SEED_ADMIN_PASSWORD'):
                    print(f"  - Overriding admin password from environment variable")
                    password_to_hash = os.environ.get('SEED_ADMIN_PASSWORD')
                else:
                    password_to_hash = record['password']
                
                hashed = bcrypt.hashpw(password_to_hash.encode('utf-8'), bcrypt.gensalt())
                record['password'] = hashed.decode('utf-8')
            
            # Perform Upsert
            filter_query = {key_field: record[key_field]}
            result = collection.update_one(filter_query, {'$set': record}, upsert=True)
            if result.upserted_id:
                upserted_count += 1
        
        print(f"  - Upserted/Updated {len(records)} records")

    print("Database seeding completed successfully.")

if __name__ == "__main__":
    seed_db()
