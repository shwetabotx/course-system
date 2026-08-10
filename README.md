Student Course Enrollment System

A full-stack web application for managing students and their enrolled courses. The project demonstrates React components, state management, REST API integration, MongoDB CRUD operations, Mongoose validation, search, filtering, sorting, pagination, and responsive Bootstrap UI.

Technology Stack

Frontend

React

Vite

React Router

Axios

Bootstrap

Backend

Node.js

Express.js

MongoDB

Mongoose

dotenv

cors

Features

Dashboard with student statistics

Total Students

Active Students

Completed Students

Dropped Students

Add student

View all students

Edit student

Delete student with confirmation

Live search by student name or email

Course filtering

Status filtering

Combined course and status filters

Sorting by name and enrollment date

Pagination with 5 records per page

Frontend validation

Backend validation

Duplicate email handling

Loading states

Error handling

Responsive Bootstrap UI

Email cannot be changed while editing

Student Fields

Field

Description

Name

Student name

Email

Unique student email

Phone

10-digit phone number

Course

React, Node, Java, or Python

Enrollment Date

Automatically stored for the student

Status

Active, Completed, or Dropped

Installation

1. Clone the repository

git clone <your-github-repository-url>
cd course-system

2. Install backend dependencies

cd server
npm install

3. Install frontend dependencies

Open another terminal:

cd client
npm install

Environment Variables

Create a .env file inside the server folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string

Example:

PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/course-system

Do not commit the .env file to GitHub.

The .gitignore should include:

node_modules/
.env

Running the Application

Start the backend

From the server directory:

npm run dev

The backend runs on:

http://localhost:5000

Start the frontend

From the client directory:

npm run dev

Vite will display the local frontend URL, normally:

http://localhost:5173

Open the displayed URL in your browser.

API Endpoints

Base URL:

http://localhost:5000/api

Create Student

POST /api/students

Request body:

{
  "name": "Shweta Patel",
  "email": "shweta@gmail.com",
  "phone": "9876543210",
  "course": "React",
  "status": "Active"
}

Get All Students

GET /api/students

Supported query parameters:

Parameter

Description

page

Page number

limit

Number of records per page

search

Search by name or email

course

Filter by course

status

Filter by status

sort

Sort by name or enrollment date

Example:

GET /api/students?page=1&limit=5&search=john&course=React&status=Active&sort=name

Get Student By ID

GET /api/students/:id

Update Student

PUT /api/students/:id

Editable fields:

Name

Phone

Course

Status

Email cannot be changed.

Example request:

{
  "name": "Shweta Patel",
  "phone": "9876543210",
  "course": "Node",
  "status": "Completed"
}

Delete Student

DELETE /api/students/:id

API Response Format

Success

{
  "success": true,
  "message": "Student created successfully",
  "data": {}
}

Error

{
  "success": false,
  "message": "Email already exists"
}

Validation

Name

Required

Only alphabets and spaces are allowed

Examples:

Shweta Patel    -> Valid
Shweta123       -> Invalid
12345           -> Invalid
Shweta@Patel    -> Invalid

Email

Required

Must contain a valid email format

Must be unique

Examples:

shweta@gmail.com -> Valid
shweta@gmail     -> Invalid
shweta@gmailcom  -> Invalid

Phone

Required

Must contain exactly 10 digits

Examples:

9876543210 -> Valid
98765432   -> Invalid
98765abc10 -> Invalid

Search, Filtering, Sorting and Pagination

Live Search

The search field allows searching by:

Student name

Student email

The frontend uses a short debounce delay before requesting filtered results from the backend, reducing unnecessary API requests while the user types.

Filtering

Students can be filtered by:

Course

Status

Course and status filters can be applied together.

Sorting

Available sorting options:

Name

Enrollment Date

Pagination

The API supports pagination using page and limit.

The application displays 5 students per page.

Example:

Previous | Page 1 of 3 | Next

Folder Structure

course-system/
│
├── client/
│   ├── public/
│   │
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AddStudent.jsx
│   │   │   └── EditStudent.jsx
│   │   │
│   │   ├── services/
│   │   │   └── studentService.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── ...
│   │
│   ├── package.json
│   └── ...
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── studentController.js
│   │
│   ├── models/
│   │   └── Student.js
│   │
│   ├── routes/
│   │   └── studentRoutes.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── server.js
│   └── package.json
│
└── README.md

Application Architecture

React Frontend
      │
      │ Axios
      ▼
Express REST API
      │
      ▼
Student Controller
      │
      ▼
Mongoose Model
      │
      ▼
MongoDB

Example: Creating a Student

Add Student Form
      ↓
Frontend Validation
      ↓
Axios POST Request
      ↓
Express Route
      ↓
Student Controller
      ↓
Mongoose Validation
      ↓
MongoDB
      ↓
Success / Error Response
      ↓
Dashboard

Error Handling

The application handles:

Required fields

Invalid email

Invalid phone number

Invalid name

Duplicate email

Student not found

Invalid student ID

MongoDB/Mongoose validation errors

Server errors

Bonus Features

Delete confirmation popup

Loading indicators

Responsive design

Empty state

Error messages

Bootstrap-based UI

Project Status

The Student Course Enrollment System is developed as a full-stack project using React, Express.js, MongoDB, and Mongoose.

Author

Student Course Enrollment System
