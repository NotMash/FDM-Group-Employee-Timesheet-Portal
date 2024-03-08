from datetime import datetime
from timesheets import db

# ========== USERS ==========

class User(db.Model):
    __abstract__ = True
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    firstname = db.Column(db.String(20), nullable=False)
    lastname = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    dob = db.Column(db.DateTime, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    notifications = db.Column(db.Boolean, default=True)
    
    def update_personal_details(self, firstname: db.String, lastname: db.String, dob: db.DateTime):
        pass
    
    def update_account_details(self, username: db.String, password: db.String):
        pass
    
    def turn_on_notifications(self) -> db.Boolean:
        pass
    
    def login(self, username: db.String, password: db.String):
        pass
    
    def logout(self):
        pass


class Consultant(User):
    __tablename__ = "consultant"
    
    working_status = db.Column(db.String(20), nullable=False)
    hourly_rate = db.Column(db.Float, nullable=False)
    line_manager_id = db.Column(db.Integer, db.ForeignKey("line_manager.id"), nullable=False)
    
    def get_working_status(self) -> str:
        return working_status
    
    def get_hourly_rate(self) -> float:
        return hourly_rate
    
    def approve_timesheet(self, timesheet):
        pass

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
        pass
    
    def track_consultant(self):
        pass
    
    def edit_request(self, timesheet):
        pass
    
    def edit_timesheet(self, ITapproval, timesheet):
        pass

class FinanceTeamMember(User):
    __tablename__ = "finance_team_member"
    
    def track_consultant(self):
        pass
    
    def approve_timesheet(self, timesheet):
        pass
    
    def set_hourly_rate(self, consultant, new_rate):
        pass

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
    
    def create_account(self, username, password, firstname, lastname, email):
        pass

# ========== END OF USERS ==========
