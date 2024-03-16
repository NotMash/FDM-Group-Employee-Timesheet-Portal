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

@cross_origin
@app.route("/create_timesheet", methods=["POST"])
def create_timesheet():
    user_id = session.get("user_id")
    consultant = Consultant.query.filter_by(id=user_id).first()
    print(user_id)
    timesheet = Timesheet(
        consultant_name=f"{consultant.firstname} {consultant.lastname}", 
                        week_start_date=datetime.utcnow(),
                        start_work_time=request.json["start_work_time"],
                        end_work_time=request.json["end_work_time"],
                        hours_worked=0,
                        consultant_id=user_id,
                        status="pending",
        )
    db.session.add(timesheet)
    db.session.commit()
    return jsonify({
        "timesheet_id": timesheet.id
    })

@app.route("/delete_timesheet")
def delete_timesheet():
    user_id = session.get("user_id")
    timesheet_id = request.json["timesheet_id"]
    consultant = Consultant.query.filter_by(id=user_id).first()
    timesheet = Timesheet.query.filter_by(id=timesheet_id).first()
    if timesheet.consultant_id == consultant.id:
        timesheet.delete()
        return "OK", 202
    return "Unauthorised", 403
    

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
