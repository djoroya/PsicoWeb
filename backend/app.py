from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import os

# Import blueprints
from routes.auth_routes import auth_bp
from routes.task_routes import task_bp
from routes.admin_routes import admin_bp

app = Flask(__name__)
CORS(app)

# Configuration
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET', 'dev-secret-key')
jwt = JWTManager(app)

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api')
app.register_blueprint(task_bp, url_prefix='/api/tasks')
app.register_blueprint(admin_bp, url_prefix='/api/admin')

# Health check endpoint
@app.route('/')
def health():
    return jsonify({'status': 'ok'}), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
