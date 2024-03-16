from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_cors import CORS
from flask_session import Session
from flask_migrate import Migrate




app = Flask(__name__)
app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///timesheets.db"

app.config["SESSION_TYPE"] = "filesystem"  # Use the server's filesystem
  # Optional: Customize the location
app.config["SESSION_COOKIE_SAMESITE"] = 'None'  # Set SameSite attribute of session cookie to 'None'
app.config["SESSION_COOKIE_SECURE"] = True  # Requires HTTPS

CORS(app, supports_credentials=True)

db = SQLAlchemy(app)
migrate = Migrate(app, db)
app.app_context().push()

login_manager = LoginManager(app)
login_manager.login_view = 'login'
login_manager.init_app(app)

server_session = Session(app)  # Initialize session after all configurations

from timesheets import routes
