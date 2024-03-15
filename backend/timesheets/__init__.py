from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_cors import CORS
from flask_session import Session
import redis

app = Flask(__name__)
app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:1234@localhost/timesheets'
app.config["SESSION_TYPE"] = "redis"
CORS(app, supports_credentials=True)
SESSION_TYPE = "redis"
SESSION_PERMANENT = False
SESSION_USE_SIGNER = False
SESSION_REDIS = redis.from_url("redis://127.0.0.1:6379")
server_session = Session(app)

db = SQLAlchemy(app)
app.app_context().push()

login_manager = LoginManager(app)
login_manager.login_view = 'login'
login_manager.init_app(app)

from timesheets import routes
