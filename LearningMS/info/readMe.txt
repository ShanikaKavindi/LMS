Frontend app setting


https://code.visualstudio.com/docs/?dv=win64user

NVM     
https://sourceforge.net/projects/nvm-for-windows.mirror/

Node
https://nodejs.org/en   ( no need NVM recommended )
nvm install latest
nvm list
nvm use <>

Install
prettier
python
Django
react
javascript

// create a app
npx create-react-app .
Get-ExecutionPolicy
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned


npx create-react-app app
cd app
npm install react react-dom
npm install web-vitals

npm install react-router-dom
https://mui.com/material-ui/           npm install @mui/material @emotion/react @emotion/styled
https://mui.com/material-ui/material-icons/?srsltid=AfmBOorxptjXTsX0uDjYGHqKU1-c0wscTvMMN5UNrGCvOrcv1y-i5W2y  npm install @mui/icons-material @mui/material @emotion/styled @emotion/react


# Install react-hook-form
npm install react-hook-form

# Install dayjs (for date manipulation)
npm install dayjs

# Install yup (for schema validation)
npm install yup

# Install @hookform/resolvers (for integrating yup with react-hook-form)
npm install @hookform/resolvers

# Install material-react-table (if required)
npm install material-react-table

Backend

// create a virtual enviroenemtn for the back-end
python -m pip install virtualenv   ---- py
python -m virtualenv <name>
<name>\Scripts\activate   
python -m pip install django
npm i -g npm

pip install djangorestframework

// create django app
django-admin startproject curd
django-admin startapp api

// migrations for DB
python manage.py makemigrations
python manage.py migrate
python manage.py runserver

// communications
pip install django-cors-headers

https://pypi.org/project/django-cors-headers/


rm db.sqlite3
rm api/migrations/*.py
python manage.py makemigrations
python manage.py migrate

// Fetch all tables
python manage.py shell
from django.db import connection
cursor = connection.cursor()
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
print(cursor.fetchall())

from api.models import CustomUser
users = CustomUser.objects.all()
for user in users:
    print(user.username, user.email)
users = CustomUser.objects.all()
for user in users:
    print(user.username, user.email)


//Remove all non-admin users
from django.db import connection
cursor = connection.cursor()

# Execute the SQL query to delete all users except 'admin'
cursor.execute("DELETE FROM auth_user WHERE username != 'admin';")

# Commit the changes to the database
connection.commit()

print("All non-admin users have been removed.")


// Get all not amdin users
from api.models import CustomUser

# Fetch all users where the username is not 'admin'
users = CustomUser.objects.exclude(username='admin')

# Print the fetched users
for user in users:
    print(user.username)




// Create a supper username
python manage.py createsuperuser


curl -Method POST -Uri "http://127.0.0.1:8000/api/login/" -Headers @{"Content-Type"="application/json"} -Body '{"username": "malitha", "password": "malitha123"}'

curl -Method POST -Uri "http://127.0.0.1:8000/api/register/" -Headers @{"Content-Type"="application/json"} -Body '{"username": "testuser", "email": "testuser@example.com", "password": "testpassword123"}'

-----------------------------------------------------------------------------------------------------------
// add courses manually
from api.models import Course  # Replace `api` with your app name if it's different

# Add a course
Course.objects.create(
    name="Introduction to Python",
    code="PY101",
    description="Learn the basics of Python programming, including syntax, data types, and control structures.",
    duration=40,  # Duration in hours
    instructor="John Doe"
)

# Add another course
Course.objects.create(
    name="Advanced React",
    code="RE201",
    description="Dive deeper into React development with hooks, context API, and performance optimization techniques.",
    duration=50,
    instructor="Jane Smith"
)

# Add another course
Course.objects.create(
    name="Data Science with Pandas",
    code="DS301",
    description="Learn how to manipulate, analyze, and visualize data using Python and Pandas.",
    duration=60,
    instructor="Alice Johnson"
)

Course.objects.create(
    name="Machine Learning and Data Science",
    code="ML107",
    description="Learn the basics of Python programming, Machine Leanring concepts and Data Science",
    duration=100,  # Duration in hours
    instructor="Jake Smith"
)

Course.objects.all()


curl -Method GET -Uri "http://127.0.0.1:8000/api/courses/" `
-Headers @{"Content-Type"="application/json"}
-----------------------------------------------------------------------------------------------------------


// Instructor details
from api.models import Instructor

Instructor.objects.create(
    name="John Doe",
    designation="Senior Lecturer",
    phone="123-456-7890",
    email="johndoe@example.com",
    bio="John has over 10 years of experience in teaching advanced programming and data analysis."
)

Instructor.objects.create(
    name="Jane Smith",
    designation="Assistant Professor",
    phone="987-654-3210",
    email="janesmith@example.com",
    bio="Jane specializes in AI and machine learning, with numerous publications in leading journals."
)

Instructor.objects.create(
    name="Michael Brown",
    designation="Visiting Faculty",
    phone="456-789-1234",
    email="michaelbrown@example.com",
    bio="Michael brings real-world industry experience, having worked at top tech firms for over a decade."
)

curl -Method GET -Uri "http://127.0.0.1:8000/api/instructors/"
