from flask import render_template, url_for, flash, redirect
from timesheets import app
from timesheets.forms import LoginForm
from timesheets.models import User

@app.route("/")
def home():
    return render_template("info.html")