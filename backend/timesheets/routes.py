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
        return "Done", 200


class CurrentUserView(MethodView):
    def get(self):
        user_id = session.get("user_id")
        if not user_id:
            return jsonify({"error": "Unauthorised"}), 401
        user = Consultant.query.filter_by(id=user_id).first()
        return jsonify({"id": user.id, "email": user.username}), 200


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
            user_type = "consultant"
        elif line_manager != None:
            user = line_manager
            user_type = "line_manager"
        elif techy != None:
            user = techy
            user_type = "ittechnician"
        elif finance_member != None:
            user = finance_member
            user_type = "finance_member"
        else:
            return jsonify({"Error": "User does not exist"}), 400
        

        if password != user.password:
            return jsonify({"Error": "Password incorrect"}), 400

        session["user_id"] = user.id

        print("Logged in: ", session.get("user_id"))

        return jsonify({"id": user.id, "username": user.username, "user_type": user_type}), 200


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
        return jsonify({"id": timesheet.id}), 200
    
    def put(self, timesheet_id):
        timesheet = Timesheet.query.filter_by(id=timesheet_id).first()
        if timesheet.status in ["pending", "approved"]:
            return jsonify({"Error": "Unauthorized"}), 400
        
        start_time = request.json["start_time"]
        end_time = request.json["end_time"]
        timesheet.start_work_time = start_time
        timesheet.end_work_time = end_time
        db.session.commit()
        return jsonify("Timesheet updated"), 200
        
    
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
        return jsonify(json_dict), 200

class ListConsultantsView(MethodView):
    def get(self):
        user_id = session.get("user_id")
        consultants = Consultant.query.filter_by(line_manager_id=user_id)
        json_dict = {}
        for consultant in consultants:
            json_dict[consultant.id] = consultant.username 
        return jsonify(json_dict), 200

class ListConsultantTimesheetsView(MethodView):
    def get(self, consultant_id):
        user_id = session.get("user_id")
        line_manager = LineManager.query.filter_by(id=user_id).first()
        consultant = Consultant.query.filter_by(id=consultant_id).first()
        if consultant.line_manager_id != user_id:
            return jsonify({"Error": "Unauthorized"}), 400
        timesheets = Timesheet.query.filter_by(consultant_id=consultant_id)
        json_dict = {}
        
        for timesheet in timesheets:
            json_dict[timesheet.id] = {"name": timesheet.consultant_name, 
                                       "status": timesheet.status, "Work Start": timesheet.start_work_time, 
                                       "End Work": timesheet.end_work_time}
        
        return jsonify(json_dict), 200

class TimesheetApprovalView(MethodView):
    def post(self, timesheet_id):
        timesheet = Timesheet.query.filter_by(id=timesheet_id).first()
        if timesheet == None:
            return jsonify({"Error: Timesheet does not exist"}), 400
        timesheet.status = "approved"
        db.session.commit()
        return jsonify("Timesheet Approved"), 200

class TimesheetDisapprovalView(MethodView):
    def post(self, timesheet_id):
        timesheet = Timesheet.query.filter_by(id=timesheet_id).first()
        if timesheet == None:
            return jsonify({"Error: Timesheet does not exist"}), 400
        timesheet.status = "disapproved"
        db.session.commit()
        return jsonify("Timesheet Disapproved"), 200


class LogoutView(MethodView):
    def get(self):
        print("Logged before outtt: ", session.get("user_id"))
        session.pop("user_id", None)


        print("Logged out aftererrererer: ", session.get("user_id"))


        return jsonify("Logged out successfully"), 200


class CreateUserView(MethodView):
    def post(self):
        current_user_id = session.get("user_id")
        current_user = ITTechnician.query.filter_by(id=current_user_id).first()
        
        if current_user == None:
            return jsonify({"Error": "Unauthorized bumbaclaat"}), 400
        
        user_type = request.json["user_type"]
        if user_type.lower() == "consultant":
            firstname = request.json["firstname"]
            lastname = request.json["lastname"]
            username = request.json["username"]
            password = request.json["password"]
            line_manager_username = request.json["line_manager_username"]
            email = request.json["email"]
            line_manager = LineManager.query.filter_by(username=line_manager_username).first()
            user = Consultant(firstname=firstname, lastname=lastname, username=username,
                                    password=password, email=email, line_manager_id=line_manager.id, 
                                    working_status="working", hourly_rate=0)
            db.session.add(user)
            db.session.commit()  
        elif user_type.lower() in ["finance_member", "ittechnician", "line_manager"]:
            firstname = request.json["firstname"]
            lastname = request.json["lastname"]
            username = request.json["username"]
            password = request.json["password"]
            email = request.json["email"]
            
            errors = False
            if user_type.lower() == "finance_member":
                user = FinanceTeamMember(firstname=firstname, lastname=lastname, username=username,
                                password=password, email=email)
               
            elif user_type.lower() == "ittechnician":
                user = ITTechnician(firstname=firstname, lastname=lastname, username=username,
                                password=password, email=email)
            elif user_type.lower() == "line_manager":
                user = LineManager(firstname=firstname, lastname=lastname, username=username,
                                password=password, email=email)
            else:
                return jsonify({"Error": "User type does not exist"}), 400
            
            db.session.add(user)
            db.session.commit()  
        else:
            return jsonify({"Error": "Invalid user type"}), 400
        
        return jsonify("User created successfully"), 200




# Registering the views
timesheets_view = TimesheetView.as_view("timesheet_view")
app.add_url_rule("/", view_func=HomeView.as_view("home_view"))
app.add_url_rule("/@me", view_func=CurrentUserView.as_view("current_user_view"))

app.add_url_rule("/login", view_func=LoginView.as_view("login_view"), methods=["POST"])
app.add_url_rule("/logout", view_func=LogoutView.as_view("logout_view"))
app.add_url_rule("/create_user", view_func=CreateUserView.as_view("create_user_view"), methods=["POST"])

app.add_url_rule("/create_timesheet", view_func=timesheets_view, methods=["POST"])
app.add_url_rule("/view_timesheet/<timesheet_id>", view_func=timesheets_view, methods=["GET"])
app.add_url_rule("/update_timesheet/<timesheet_id>", view_func=timesheets_view, methods=["PUT"])
app.add_url_rule("/delete_timesheet/<timesheet_id>", view_func=timesheets_view, methods=["DELETE"])
app.add_url_rule("/list_timesheets", view_func=ListTimesheetsView.as_view("list_timesheets_view"), methods=["GET"])
app.add_url_rule("/list_timesheets/<consultant_id>", view_func=ListConsultantTimesheetsView.as_view("list_consultant_timesheets_view"), methods=["GET"])
app.add_url_rule("/approve_timesheet/<timesheet_id>", view_func=TimesheetApprovalView.as_view("timesheet_approval_view"), methods=["POST"])
app.add_url_rule("/disapprove_timesheet/<timesheet_id>", view_func=TimesheetDisapprovalView.as_view("timesheet_disapproval_view"), methods=["POST"])


app.add_url_rule("/list_consultants", view_func=ListConsultantsView.as_view("list_consultants_view"), methods=["GET"])


