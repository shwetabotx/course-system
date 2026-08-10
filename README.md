# Student Course Enrollment System

A full-stack web application for managing students and their enrolled courses.

## Tech Stack

**Frontend:** React, Vite, React Router, Axios, Bootstrap  
**Backend:** Node.js, Express.js, MongoDB, Mongoose, dotenv, cors

## Features

- Dashboard with student statistics
- Add, edit and delete students
- Search by name or email
- Course and status filters
- Sorting by name and enrollment date
- Pagination (5 records per page)
- Frontend and backend validation
- Duplicate email handling
- Delete confirmation
- Responsive Bootstrap UI

## Installation

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd course-system
```

### 2. Install dependencies

Backend:

```bash
cd server
npm install
```

Frontend:

```bash
cd ../client
npm install
```

### 3. Environment Variables

Create `server/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Do not commit `.env` to GitHub.

### 4. Run the project

Backend:

```bash
cd server
npm run dev
```

Frontend:

```bash
cd client
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/students` | Create student |
| GET | `/api/students` | Get students |
| GET | `/api/students/:id` | Get student by ID |
| PUT | `/api/students/:id` | Update student |
| DELETE | `/api/students/:id` | Delete student |

### GET Query Parameters

```text
?page=1&limit=5&search=john&course=React&status=Active&sort=name
```

Supports **search, filtering, sorting and pagination**.

## Folder Structure

```text
course-system/
├── client/
│   └── src/
│       ├── pages/
│       │   ├── Dashboard.jsx
│       │   ├── AddStudent.jsx
│       │   └── EditStudent.jsx
│       ├── services/
│       │   └── studentService.js
│       ├── App.jsx
│       └── main.jsx
│
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── studentController.js
│   ├── models/
│   │   └── Student.js
│   ├── routes/
│   │   └── studentRoutes.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Validation

- Name: alphabets and spaces only
- Email: valid format and unique
- Phone: exactly 10 digits
- Course: React, Node, Java, Python
- Status: Active, Completed, Dropped

## API Response

Success:

```json
{
  "success": true,
  "message": "Student created successfully",
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "Email already exists"
}
```

## Author

Student Course Enrollment System
