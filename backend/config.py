from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_cors import CORS

# create shared instances of each extension
# these get initialized with the app inside create_app()
db = SQLAlchemy()
bcrypt = Bcrypt()

def create_app():
    # create the Flask application instance
    app = Flask(__name__)
    
    # point to a local SQLite database file for development
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///real_standard.db"
    
    # turn off modification tracking
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    
    # secret key used to sign session cookies
    app.config["SECRET_KEY"] = "real-food-only-secret-key"
    
    # allow the React frontend (runs on a different port) to make requests
    # supports_credentials=True allows session cookies to be sent cross-origin
    CORS(app, supports_credentials=True)
    
    # connect each extension to the app
    db.init_app(app)
    bcrypt.init_app(app)
    Migrate(app, db)
    
    return app