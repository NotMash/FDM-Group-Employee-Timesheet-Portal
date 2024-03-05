from datetime import datetime
from timesheets import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    
class Timesheet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    consultant_name = db.Column(db.String(20), nullable=False)