from flask import render_template, url_for, flash, redirect, request, jsonify
from flask_login import current_user, login_manager, LoginManager, login_user, logout_user, login_required
from timesheets import app
from timesheets.forms import LoginForm
from timesheets.models import User, Consultant, ITTechnician

@app.route("/")
def home():
    return "Done", 202

@app.route("/login", methods=["POST"])
def login():
    username = request.json["username"]
    password = request.json["password"]
    technician = ITTechnician.query.filter_by(username=username).first()
    
    if technician is None:
        return jsonify({"Error": "Unauthorised"})
    
    return jsonify(
        {
            "id": technician.id,
            "username": technician.username
        }
    )

@app.route("/create_user")
def create_user():
    return "<h1>user creation page</h1>"
