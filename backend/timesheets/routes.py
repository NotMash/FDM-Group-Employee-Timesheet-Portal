from flask import render_template, url_for, flash, redirect, request, jsonify, session
from flask_login import current_user, login_manager, LoginManager, login_user, logout_user, login_required
from flask_cors import cross_origin
from timesheets import *
from timesheets.forms import LoginForm
from timesheets.models import User, Consultant, ITTechnician, FinanceTeamMember, LineManager, Timesheet
from datetime import datetime


@app.route("/")
def home():
    return "Done", 202

@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")
    
    if not user_id:
        return jsonify({"error": "Unauthorised"}), 401
    
    user = Consultant.query.filter_by(id=user_id).first()
    return jsonify({"id": user.id, "email": user.username})

@app.route("/login", methods=["POST"])
def login():
    username = request.json["username"]
    password = request.json["password"]
    technician = ITTechnician.query.filter_by(username=username).first()
    consultant = Consultant.query.filter_by(username=username).first()
    finance_member = FinanceTeamMember.query.filter_by(username=username).first()
    line_manager =  LineManager.query.filter_by(username=username).first()
    
    if consultant is None:
        return jsonify({"Error": "Unauthorised"})
    
    if password != consultant.password:
        return jsonify({"Error": "Password incorrect"})
    
    session["user_id"] = consultant.id
    
    return jsonify(
        {
            "id": consultant.id,
            "username": consultant.username
        }
    )

@app.route("/create_timesheet", methods=["POST"])
def create_timesheet():
    user_id = session.get("user_id")
    consultant = Consultant.query.filter_by(id=user_id).first()
    print(user_id)
    timesheet = Timesheet(
        consultant_name=f"{consultant.firstname} {consultant.lastname}", 
                        week_start_date=datetime.utcnow(),
                        start_work_time_monday=request.json["start_work_time_monday"],
                        end_work_time_monday=request.json["end_work_time_monday"],
                        start_work_time_tuesday=request.json["start_work_time_tuesday"],
                        end_work_time_tuesday=request.json["end_work_time_tuesday"],
                        start_work_time_wednesday=request.json["start_work_time_wednesday"],
                        end_work_time_wednesday=request.json["end_work_time_wednesday"],
                        start_work_time_thursday=request.json["start_work_time_thursday"],
                        end_work_time_thursday=request.json["end_work_time_thursday"],
                        start_work_time_friday=request.json["start_work_time_friday"],
                        end_work_time_friday=request.json["end_work_time_friday"],
                        hours_worked=request.json["hours_worked"],
                        consultant_id=user_id,
                        status="pending",
        )
    db.session.add(timesheet)
    db.session.commit()
    return jsonify({
        "id": timesheet.id
    })

@app.route("/delete_timesheet/{id}")
def delete_timesheet(id):
    pass

@app.route("/view_timesheets", methods=["GET"])
def view_timesheets():
    timesheets = Timesheet.query.filter_by(consultant_id=session.get("user_id"))
    timesheets = [i.id for i in timesheets]
    return jsonify(timesheets)

@app.route("/logout")
def logout():
    session.pop("user_id")
    return "200"

@app.route("/create_user")
def create_user():
    return "<h1>user creation page</h1>"
