import os
import time
import uuid
from flask import Blueprint, request, jsonify, url_for, current_app
from werkzeug.utils import secure_filename
from flask_jwt_extended import jwt_required

upload_bp = Blueprint('upload', __name__)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@upload_bp.route('/', methods=['POST'])
@jwt_required()
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
        
    if file and allowed_file(file.filename):
        # Generate unique filename
        ext = file.filename.rsplit('.', 1)[1].lower()
        unique_filename = f"{int(time.time())}_{str(uuid.uuid4())[:8]}.{ext}"
        filename = secure_filename(unique_filename)
        
        # Save file
        upload_folder = os.path.join(current_app.root_path, 'uploads')
        if not os.path.exists(upload_folder):
            os.makedirs(upload_folder)
            
        file.save(os.path.join(upload_folder, filename))
        
        # Construct URL
        # We serve static files from /static/uploads
        # Note: In production with Nginx, Nginx should serve this.
        # But for this setup, Flask serving static files or Docker mapping helps.
        # We will return a relative path that the frontend can use.
        # Assuming the backend is proxied via /api, but static files might be at root /static
        # Actually, simpler to return the full relative path from domain root if Nginx is configured,
        # or just the path for the API to serve. 
        # For now, let's assume we serve it via Flask static for development simplicity.
        
        file_url = f"/api/static/uploads/{filename}"
        
        return jsonify({'url': file_url}), 201
        
    return jsonify({'error': 'File type not allowed'}), 400
