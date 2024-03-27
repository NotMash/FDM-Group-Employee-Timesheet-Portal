from flask import render_template, url_for, flash, redirect, request, jsonify, session
from flask.views import MethodView
from flask_login import current_user, login_manager, LoginManager, login_user, logout_user, login_required
from flask_cors import cross_origin
from timesheets import app, db
from timesheets.forms import LoginForm
from timesheets.models import User, Consultant, ITTechnician, FinanceTeamMember, LineManager, Timesheet
from datetime import datetime


class HomeView(MethodView):
    def get(self):
        return "Done", 202


class CurrentUserView(MethodView):
    def get(self):
        user_id = session.get("user_id")
        if not user_id:
            return jsonify({"error": "Unauthorised"}), 401
        user = Consultant.query.filter_by(id=user_id).first()
        return jsonify({"id": user.id, "email": user.username})


class LoginView(MethodView):
    def post(self):
        username = request.json["username"]
        password = request.json["password"]
        
        consultant = Consultant.query.filter_by(username=username).first()
        line_manager = LineManager.query.filter_by(username=username).first()
        techy = ITTechnician.query.filter_by(username=username).first()
        finance_member = FinanceTeamMember.query.filter_by(username=username).first()
        
        if consultant != None:
            user = consultant
        elif line_manager != None:
            user = line_manager
        elif techy != None:
            user = techy
        elif finance_member != None:
            user = finance_member
        else:
            return jsonify({"Error": "User does not exist"})
        

        if password != user.password:
            return jsonify({"Error": "Password incorrect"})

        session["user_id"] = user.id

        print("Logged in: ", session.get("user_id"))

        return jsonify({"id": user.id, "username": user.username})


class TimesheetView(MethodView):
    def get(self, timesheet_id):
        user_id = session.get("user_id")
        timesheet = Timesheet.query.filter_by(id=timesheet_id, consultant_id=user_id).first()
        if timesheet is None:
            return jsonify({"Error": "Unauthorized"}), 403
        return jsonify({"id": timesheet.id, "start_work_time": timesheet.start_work_time, "end_work_time": timesheet.end_work_time})
    
    def post(self):
        user_id = session.get("user_id")

        print("Creating timesheet: ", user_id)

        if not user_id:
            return jsonify({"Error": "Unauthorised"}), 401

        consultant = Consultant.query.filter_by(id=user_id).first()
        if consultant is None:
            return jsonify({"Error": "Consultant not found"}), 404

        timesheet = Timesheet(
            consultant_name=f"{consultant.firstname} {consultant.lastname}",
            start_work_time=request.json["start_time"],
            end_work_time=request.json["end_time"],
            hours_worked=0,
            week_start_date=datetime.utcnow(),
            consultant_id=user_id,
            status="pending",
        )
        db.session.add(timesheet)
        db.session.commit()
        return jsonify({"id": timesheet.id})
    
    def put(self, timesheet_id):
        pass
    
    def delete(self, timesheet_id):
        user_id = session.get("user_id")
        Timesheet.query.filter_by(id=timesheet_id, consultant_id=user_id).delete()
        db.session.commit()
        return jsonify("Timesheet deleted"), 200

class ListTimesheetsView(MethodView):
    def get(self):
        user_id = session.get("user_id")
        if not user_id:
            return jsonify({"Error": "Unauthorised"}), 401
        timesheets = Timesheet.query.filter_by(consultant_id=user_id).all()
        json_dict = {}
        timesheet_ids = [timesheet.id for timesheet in timesheets]
        for timesheet in timesheets:
            json_dict[timesheet.id] = {"name": timesheet.consultant_name, "status": timesheet.status}
        return jsonify(json_dict)

class ListConsultantsView(MethodView):
    def get(self):
        user_id = session.get("user_id")
        consultants = Consultant.query.filter_by(line_manager_id=user_id)
        json_dict = {}
        for consultant in consultants:
            json_dict[consultant.id] = consultant.username 
        return jsonify(json_dict)

class ListConsultantTimesheetsView(MethodView):
    def get(self, consultant_id):
        user_id = session.get("user_id")
        line_manager = LineManager.query.filter_by(id=user_id).first()
        consultant = Consultant.query.filter_by(id=consultant_id).first()
        if consultant.line_manager_id != user_id:
            return jsonify({"Error": "Unauthorized"})
        timesheets = Timesheet.query.filter_by(consultant_id=consultant_id)
        json_dict = {}
        
        for timesheet in timesheets:
            json_dict[timesheet.id] = {"name": timesheet.consultant_name, 
                                       "status": timesheet.status, "Work Start": timesheet.start_work_time, 
                                       "End Work": timesheet.end_work_time}
        
        return jsonify(json_dict)
        

class LogoutView(MethodView):
    def get(self):
        print("Logged before outtt: ", session.get("user_id"))
        session.pop("user_id", None)


        print("Logged out aftererrererer: ", session.get("user_id"))


        return "Logged out successfully", 200


class CreateUserView(MethodView):
    def get(self):
        # Your user creation logic here
        return "<h1>User creation page</h1>"


# Registering the views
timesheets_view = TimesheetView.as_view("timesheet_view")
app.add_url_rule("/", view_func=HomeView.as_view("home_view"))
app.add_url_rule("/@me", view_func=CurrentUserView.as_view("current_user_view"))
app.add_url_rule("/login", view_func=LoginView.as_view("login_view"), methods=["POST"])
app.add_url_rule("/create_timesheet", view_func=timesheets_view, methods=["POST"])
app.add_url_rule("/view_timesheet/<timesheet_id>", view_func=timesheets_view, methods=["GET"])
app.add_url_rule("/delete_timesheet/<timesheet_id>", view_func=timesheets_view, methods=["DELETE"])
app.add_url_rule("/list_timesheets", view_func=ListTimesheetsView.as_view("list_timesheets_view"), methods=["GET"])
app.add_url_rule("/list_timesheets/<consultant_id>", view_func=ListConsultantTimesheetsView.as_view("list_consultant_timesheets_view"), methods=["GET"])
app.add_url_rule("/list_consultants", view_func=ListConsultantsView.as_view("list_consultants_view"), methods=["GET"])
app.add_url_rule("/logout", view_func=LogoutView.as_view("logout_view"))
app.add_url_rule("/create_user", view_func=CreateUserView.as_view("create_user_view"))