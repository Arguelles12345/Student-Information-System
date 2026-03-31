# API Documentation

## Base URL
http://localhost:3000

---

## GET /students
Retrieve all students or search students.

Query:
- search (optional)

Response:
```json
[
  {
    "id": 1,
    "name": "Nikko Rey L. Arguelles",
    "age": "21",
    "course": "BSIT",
    "YearLevel": "3b1",
    "email": "john@gmail.com",
    "address": "kaskag surigao city",
    "gender": "male",
    "birthdate": "12/06/2004",
    "guardian": "Rie B. Arguelles",
    "contact": "09515192101",
  }
]

GET /students/:id

Retrieve a single student.


POST /students

Create a new student.
Body:
{
    "id": 1,
    "name": "Nikko Rey L. Arguelles",
    "age": "21",
    "course": "BSIT",
    "YearLevel": "3b1",
    "email": "john@gmail.com",
    "address": "kaskag surigao city",
    "gender": "male",
    "birthdate": "12/06/2004",
    "guardian": "Rie B. Arguelles",
    "contact": "09515192101",
  }

  PUT /students/:id

Update a student.
