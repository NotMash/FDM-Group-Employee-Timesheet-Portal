from datetime import datetime, timedelta
from timesheets import db
from flask_login import UserMixin
from uuid import uuid4
from sqlalchemy.sql import text


def get_uuid():
    return uuid4().hex


# ========== USERS ==========

class User(UserMixin, db.Model):
    __abstract__ = True

    id = db.Column(db.String(32), primary_key=True, default=get_uuid)
    username = db.Column(db.String(20), unique=True, nullable=False)
    firstname = db.Column(db.String(20), nullable=False)
    lastname = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    # dob = db.Column(db.DateTime, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    notifications = db.Column(db.Boolean, default=True)

    def update_personal_details(self, firstname: db.String, lastname: db.String, dob: db.DateTime):
        self.firstname = firstname
        self.lastname = lastname
        self.dob = dob

    def update_account_details(self, username: db.String, password: db.String):
        self.username = username
        self.password = password

    def turn_on_notifications(self) -> db.Boolean:
        self.notifications = True

    def login(self, username: db.String, password: db.String):
        if username == self.username and password == self.password:
            session_id = self.id
            # Set session ID in cookie
            return "Login Successful"
        else:
            return "Unauthorized Access: Invalid Username or Password."
          
    def logout(self):
        session_id = self.id
        if session_id: 
            # Deletes the session ID from the db
            # Clears cookie with session data
            return "Logout Successful"
        else:
            return "No Active Session for this user."
        pass

    def get_all_users():
        # use cross-table query to get retrieve a user searching through all tables
        # use SQL INNER JOIN
        return db.session.execute(text(f"""

                                    SELECT id, username, password FROM "ITTechnician"
                                    UNION
                                    SELECT id, username, password FROM "finance_team_member"
                                    UNION
                                    SELECT id, username, password FROM "line_manager"
                                    UNION
                                    SELECT id, username, password FROM "consultant"
            """))

class Consultant(User):
    __tablename__ = "consultant"
    
    consultant_id = db.Column(db.String(32), db.ForeignKey("consultant.id"), nullable=False) #consultant should have id????
    working_status = db.Column(db.String(20), nullable=False)
    hourly_rate = db.Column(db.Float, nullable=False)
    line_manager_id = db.Column(db.String(32), db.ForeignKey("line_manager.id"), nullable=False)
    timesheets = db.relationship("Timesheet", backref="timesheet", lazy=True)

    def get_working_status(self) -> str:
        return self.working_status
    
    def get_hourly_rate(self) -> float:
        return self.hourly_rate

    def approve_timesheet(self, timesheet):
        timesheet.consultant_approval = True

    def submit_timesheet(self, timesheet):
        if timesheet.consultant_approval:
            timesheet.status = "Pending"

    def submit_timesheet(self, timesheet, approval):
        pass

    def view_timesheet(self):
        pass

    def edit_request(self, timesheet):
        pass

    def edit_timesheet(self, ITapproval, timesheet):
        pass

class LineManager(User):
    __tablename__ = "line_manager"
    
    consultants = db.relationship("Consultant", backref="line_manager", lazy=True)

    def approve_timesheet(self, timesheet):
        if timesheet.status == "Pending":
            timesheet.status = "approved"


    def disapprove_timesheet(self, timesheet):
        if timesheet.status == "Pending":
            timesheet.status = "disapproved"
    
    def track_consultant(self):
        pass #??
    
    def edit_request(self, timesheet):
        pass

    def edit_timesheet(self, ITapproval, timesheet):
        pass


class FinanceTeamMember(User):
    __tablename__ = "finance_team_member"

    def track_consultant(self):
        pass #???
    
    def approve_timesheet(self, timesheet):
        pass #copy code from LineManager.approve_timesheet
      
    def set_hourly_rate(self, consultant, new_rate):
        if isinstance(consultant, Consultant):
                consultant.hourly_rate = new_rate
        else:
            raise ValueError("Invalid user. Please provide a valid Consultant")
        


class ITTechnician(User):
    __tablename__ = "ITTechnician"

    def edit_timesheet(self, timesheet):
        pass

    def delete_timesheet(self, timesheet):
        pass

    def resolve_difficulty(self, difficulty):
        pass

    def approve_edit_request(self):
        pass

    def dissaprove_edit_request(self):
        pass
    
    def create_account(self, username, password, firstname, lastname, email):
        pass


# ========== END OF USERS ==========

class Timesheet(db.Model):
    __tablename__ = "timesheet"

    id = db.Column(db.Integer, primary_key=True)
    consultant_name = db.Column(db.String(30), nullable=False)
    consultant_approval = db.Column(db.Boolean, default=False, nullable=False)
    week_start_date = db.Column(db.DateTime, nullable=False)
    start_work_time = db.Column(db.String(20), nullable=True)
    end_work_time = db.Column(db.String(20), nullable=True)
    hours_worked = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(20), nullable=False)
    edited = db.Column(db.Boolean, default=False, nullable=False)
    consultant_id = db.Column(db.String(32), db.ForeignKey("consultant.id"), nullable=False)

    def calculate_hours_worked(self):
        time_worked = self.end_work_time - self.start_work_time

        # Extract hours and minutes from the time difference
        hours, remainder = divmod(time_worked.seconds, 3600)
        minutes = remainder // 60

        self.hours_worked = hours + minutes / 60
    
    def change_status(self, status):
        self.status = status

    def start_work(self):
        self.start_work_time = datetime.now()

    def end_work(self):
        self.end_work_time = datetime.now()
    
    def start_break(self):
        self.start_break_time = datetime.now()
    
    def end_break(self):
        self.end_break_time = datetime.now()
    
    def get_hours_worked(self):
        return self.hours_worked
   

    def get_timesheet_status(self):
        return self.status

    def edit_info(self, edited):
        pass #???

class Difficulty(db.Model):
    __tablename__ = "difficulty"

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(60), nullable=False)


class Salaries(db.Model):
    __tablename__ = "salaries"

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False)
    consultant = db.Column(db.String(20), nullable=False)

    def calculate_salary(self, consultant, timesheet):
        hourlyRate = consultant.get_hourly_rate()
        hoursWorked = timesheet.get_hours_worked()
        return round(float(hourlyRate*hoursWorked), 2)


