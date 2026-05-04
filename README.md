<p align="center">
  <img src="https://img.icons8.com/color/96/000000/graduation-cap.png" alt="Student Icon" />
</p>

# 📚 Student Information Management System

A modern student dashboard with a clean layout, separated student form, and unified student list area. The app is built with **NestJS** backend and **vanilla JavaScript/HTML/CSS** frontend, using **localStorage** for browser-side persistence.

## ✨ Dashboard Highlights

- ✅ **Dashboard layout** with sidebar navigation and summary cards
- ✅ **Separated student form** and student list for better workflow
- ✅ **Search bar** with real-time filtering
- ✅ **Course dropdown** to filter students by course
- ✅ **Unified table view** for all students and actions
- ✅ **Clean, modern UI** inspired by SchoolHub-style dashboards

## 📋 What the App Includes

- **Dashboard view** with navigation and metrics area
- **Student entry form** separated from the student list
- **Student table** showing all students in one place
- **Search + course filter** working together
- **Edit / delete actions** for each student
- **Responsive design** for desktop and tablet use

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Arguelles12345/Student-Information-System.git
   cd student-info-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run start:dev
   ```

4. **Open the application**
   - Visit `http://localhost:3000` in your browser

## 📁 Project Structure

```
student-info-system/
├── frontend/
│   ├── index.html       # Main HTML file for the dashboard
│   ├── script.js        # Frontend JavaScript logic
│   └── style.css        # Dashboard styling
├── src/
│   ├── app.module.ts    # NestJS App Module
│   ├── main.ts          # Application entry point
│   └── students/        # Students module
│       ├── student.entity.ts      # Student entity/schema
│       ├── students.service.ts    # Business logic
│       ├── students.controller.ts # API endpoints
│       └── students.module.ts     # Students module
├── package.json
└── README.md
```

## 🔧 How to Use

### Add a Student
1. Use the separated student form in the dashboard
2. Fill in the required student fields
3. Click **Add Student** to save
4. The student appears in the unified list immediately

### Search Students
1. Type in the search input
2. Results update in real-time across all fields
3. Use this together with the course filter for better search

### Filter by Course
1. Choose a course from the dropdown menu
2. The student list updates to show only matching results
3. Select **All Courses** to reset the filter

### Edit or Delete
1. Use **Edit** to update student details
2. Use **Delete** to remove a student
3. Changes are saved automatically in localStorage

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: NestJS, Node.js
- **Storage**: localStorage (Browser-based)

## 💡 Notes

- The dashboard separates the form and list into distinct sections for clarity.
- Search and course filter are designed to work together in one unified interface.
- Styling is focused on a clean, modern dashboard experience.


This project is created for educational purposes.

## 👨‍💻 Author

Student Information System - A modern approach to student management

---

**Last Updated**: April 30, 2026  
**Version**: 2.0 (Professional UI Release)
