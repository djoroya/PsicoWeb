from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import os

from routes.auth_routes import auth_bp
from routes.public_routes import public_bp
from routes.admin_routes import admin_bp
from routes.webhook_routes import webhook_bp
from routes.upload_routes import upload_bp

app = Flask(__name__)
# Configure upload folder
app.config['UPLOAD_FOLDER'] = os.path.join(app.root_path, 'uploads')
CORS(app)

app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET', 'dev-secret-key')
jwt = JWTManager(app)

app.register_blueprint(auth_bp, url_prefix='/api')
app.register_blueprint(public_bp, url_prefix='/api/public')
app.register_blueprint(admin_bp, url_prefix='/api/admin')
app.register_blueprint(webhook_bp, url_prefix='/api/webhooks')
app.register_blueprint(upload_bp, url_prefix='/api/upload')

# Serve static uploads (for development/simple deployment)
from flask import send_from_directory

@app.route('/api/static/uploads/<path:filename>')
def serve_uploads(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


@app.route('/')
def health():
    return jsonify({'status': 'ok'}), 200


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
