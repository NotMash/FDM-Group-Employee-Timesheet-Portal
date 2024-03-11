from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

app = Flask(__name__)
app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:1234@localhost/timesheets'
db = SQLAlchemy(app)
app.app_context().push()

login_manager = LoginManager(app)
login_manager.login_view = 'login'
login_manager.init_app(app)

from timesheets import routes
