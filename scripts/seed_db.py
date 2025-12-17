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

    for collection_name, records in data.items():
        if not records:
            continue
            
        print(f"Seeding collection: {collection_name}")
        collection = db[collection_name]
        
        # Clear existing data
        collection.delete_many({})
        print(f"  - Cleared existing data")

        # Process records before insertion
        formatted_records = []
        for record in records:
            # Hash password for users collection
            if collection_name == 'users' and 'password' in record:
                hashed = bcrypt.hashpw(record['password'].encode('utf-8'), bcrypt.gensalt())
                record['password'] = hashed.decode('utf-8')
            
            formatted_records.append(record)

        # Insert new data
        if formatted_records:
            collection.insert_many(formatted_records)
            print(f"  - Inserted {len(formatted_records)} records")

    print("Database seeding completed successfully.")

if __name__ == "__main__":
    seed_db()
