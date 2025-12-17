import os
import json
import urllib.request
import urllib.error
import urllib.parse
import sys

# Configuration
API_URL = os.environ.get('API_URL') or os.environ.get('VITE_API_URL', 'http://localhost:5000/api')
if API_URL.endswith('/'):
    API_URL = API_URL[:-1]
if not API_URL.endswith('/api'):
    # Try to append /api if it doesn't look like a full api path, 
    # unless user intends the root to be the api.
    # But usually VITE_API_URL is root. Let's assume standard flask blueprint prefix.
    # Actually, keep it simple: just strip slash. If user provided root, we might need /api.
    # Let's assume the user provided the base URL.
    if not API_URL.endswith('/api'):
        API_URL += '/api'

ADMIN_PASSWORD = os.environ.get('SEED_ADMIN_PASSWORD') or os.environ.get('ADMIN_PASSWORD')
if not ADMIN_PASSWORD:
    print("Error: ADMIN_PASSWORD or SEED_ADMIN_PASSWORD must be set.")
    sys.exit(1)

def api_request(endpoint, method='GET', data=None, token=None):
    url = f"{API_URL}{endpoint}"
    headers = {'Content-Type': 'application/json'}
    if token:
        headers['Authorization'] = f"Bearer {token}"
    
    body = json.dumps(data).encode('utf-8') if data else None
    req = urllib.request.Request(url, data=body, headers=headers, method=method)
    
    try:
        with urllib.request.urlopen(req) as response:
            if response.status == 204:
                return None
            return json.loads(response.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        print(f"HTTP Error {e.code} for {url}")
        try:
             print(f"Response: {e.read().decode('utf-8')}")
        except:
             pass
        raise e
    except urllib.error.URLError as e:
        print(f"URL Error: {e.reason}")
        raise e

def login():
    print("Authenticating as admin...")
    try:
        resp = api_request('/login', method='POST', data={
            'username': 'admin',
            'password': ADMIN_PASSWORD
        })
        return resp['token']
    except urllib.error.HTTPError as e:
        print("Failed to authenticate. Check your password.")
        sys.exit(1)

def seed_api():
    print(f"Targeting API: {API_URL}")
    token = login()
    print("Authentication successful.")

    # Load initial data
    json_path = os.path.join(os.path.dirname(__file__), 'initial_data.json')
    with open(json_path, 'r') as f:
        data = json.load(f)

    # 1. Settings
    if 'settings' in data:
        print("\nSeeding Settings...")
        for item in data['settings']:
            try:
                # Backend settings endpoint handles upsert via POST with key/value
                print(f"  - Upserting setting: {item['key']}")
                api_request('/admin/settings', method='POST', data=item, token=token)
            except Exception as e:
                print(f"    Failed: {e}")

    # Helper for CRUD collections
    # collection_key: (endpoint, match_field)
    collections = {
        'services': ('/admin/services', 'title'),
        'treatments': ('/admin/treatments', 'title'),
        'psychologists': ('/admin/psychologists', 'name'),
        'blog_posts': ('/admin/blog', 'slug')
    }

    for key, (endpoint, match_field) in collections.items():
        if key not in data:
            continue
            
        print(f"\nSeeding {key.title()}...")
        
        # Get existing items to check for updates
        try:
            existing_items = api_request(endpoint, token=token)
        except Exception as e:
            print(f"  Error fetching existing {key}: {e}")
            continue

        for item in data[key]:
            match_val = item.get(match_field)
            
            # Find existing
            found = next((x for x in existing_items if x.get(match_field) == match_val), None)
            
            # Use 'blog' endpoint correctly for slugs but '_id' for updates
            
            try:
                if found:
                    print(f"  - Updating {match_field}: {match_val}")
                    # Update
                    api_request(f"{endpoint}/{found['_id']}", method='PUT', data=item, token=token)
                else:
                    print(f"  - Creating {match_field}: {match_val}")
                    # Create
                    api_request(endpoint, method='POST', data=item, token=token)
            except Exception as e:
                print(f"    Failed: {e}")

    print("\nAPI Seeding completed.")

if __name__ == "__main__":
    seed_api()
