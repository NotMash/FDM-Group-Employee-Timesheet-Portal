from datetime import datetime, timedelta
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
    timesheets = db.relationship("Timesheet", backref="timesheet", lazy=True)
    
    def get_working_status(self) -> str:
        return self.working_status
    
    def get_hourly_rate(self) -> float:
        return self.hourly_rate
    
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
    
class LineManager(User): #linemanager should not have editRequest or editTimesheet, consultant should
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
    
    def create_account(self, username, password, firstname, lastname, email):
        pass

# ========== END OF USERS ==========

class Timesheet(db.Model):
    __tablename__ = "timesheet"
    
    id = db.Column(db.Integer, primary_key=True)
    consultant_name = db.Column(db.String(30), nullable=False)
    consultant_approval = db.Column(db.Boolean, default=False, nullable=False)
    week_start_date = db.Column(db.DateTime, nullable=False)
    start_work_time = db.Column(db.DateTime, nullable=False)
    end_work_time = db.Column(db.DateTime, nullable=False)
    start_break_time = db.Column(db.DateTime, nullable=False)
    end_break_time = db.Column(db.DateTime, nullable=False)
    hours_worked = db.Column(db.Integer, nullable=False)
    status = db.Column(db.Boolean, default= False, nullable=False) #changed to boolean from string
    edited = db.Column(db.Boolean, default=False, nullable=False)
    consultant_id = db.Column(db.Integer, db.ForeignKey("consultant.id"), nullable=False)
    
    
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



