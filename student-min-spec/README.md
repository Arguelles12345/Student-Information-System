# Student Information System (SIS)

## Description
A simple web-based system for managing student records with CRUD operations and search functionality.

## Features
- Add student
- View student list
- Search student
- Update student
- Delete student

## Technologies Used
- NestJS (Backend)
- TypeScript
- HTML/CSS

## How to Run

1. Install dependencies:
npm install

2. Start backend:
npm run start:dev

3. Compile frontend:
tsc -p src/public/tsconfig.frontend.json

4. Open browser:
http://localhost:3000


## Notes
- This system does NOT use a database.
- Data is stored in memory and resets when server restarts.