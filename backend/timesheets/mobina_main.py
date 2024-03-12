class requestedEdit:
    def __init__(self, timesheet, userName):
        self.timesheet = timesheet
        self.userName = userName


    def getTimesheet(self):
        return self.timesheet
    
    def getUser(self):
        return self.userName
    

class DifficultiesList:

    instance = None

    def __init__(self):
        self.instance = [] 


    def getInstance(self):
        return self.instance




class Difficulty(DifficultiesList):
    def __init__(self, description):
        self.descrption = description



class ITTechnician(User, requestedEdit, Difficulty):
    

    def editTimesheet(self, timesheet):

        return 


    def deleteTimesheet(self, timesheet):

        return 
    


    def resolveDifficulty(self, difficulty):
        print(difficulty.description)

        answer = input("Is the difficulty resolved?")

        if answer == "yes" | answer == "Yes":
            note = input ("Any notes?")
            result = list(answer, note)
            return result
        
        else:
            note = input ("Any notes?")
            result = list(answer, note)
            return result

    

    def approveEditRequest(self, editRequest):
        print(editRequest.timesheet)
        print(editRequest.userName)

        answer = input("Do you approve the edit request?")

        if answer == "yes":
            return True
        
        else:
            return False
        
    

    def createAccount(self, userName, password):

        User.__init__(userName, password)

        return 
