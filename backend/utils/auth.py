import bcrypt

def hash_password(password):
    """Hash a password using bcrypt"""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

def check_password(password, hashed):
    """Check if password matches hashed password"""
    return bcrypt.checkpw(password.encode('utf-8'), hashed)
