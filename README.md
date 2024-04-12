# Project Setup Instructions

Follow these steps to set up and run the project on your local machine.

## Prerequisites

- Git
- Node.js and npm
- Python (with pip)
- Recommended: Google Chrome browser

## Installation Steps

### 1. Clone the Repository

Start by cloning the repository to your local machine:


git clone https://github.com/NotMash/FDM-Group-Employee-Timesheet-Portal.git


### 2. Install Frontend Dependencies

cd frontend
npm install


### 3. Start the Frontend Server
Still within the frontend directory, start the frontend server:

npm start


This will run the frontend part of the application.



### 4. Install Backend Dependencies
Open a new terminal and change to the backend directory, specifically into the timesheets package:

cd ../backend/timesheets


Install Python dependencies from the requirements.txt file:

pip install -r requirements.txt


### 5. Run the Backend
Run the backend server using the run.py script:

python run.py


### 6. Access the Application
Open a web browser and visit:

localhost:3000

This will load the application in your browser. It is recommended to use Google Chrome for the best experience.













