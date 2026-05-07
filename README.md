<p align="center">
  <img src="https://img.icons8.com/color/96/000000/graduation-cap.png" alt="Student Icon" />
</p>

# 📚 Student Information Management System

A modern student dashboard with multi-page navigation, featuring a comprehensive student management interface. The app is built with **NestJS** backend and **vanilla JavaScript/HTML/CSS** frontend, using **localStorage** for browser-side persistence.

## ✨ Dashboard Highlights

- ✅ **Multi-page navigation** with clickable sidebar menu
- ✅ **Sidebar Add Student button** that shows the fill-up form when clicked
- ✅ **Dashboard page** with stats cards and student list
- ✅ **Dedicated Students page** for full student management
- ✅ **Functional Courses page** with course management and statistics
- ✅ **Search bar** with real-time filtering across all pages
- ✅ **Course dropdown** to filter students by course
- ✅ **Department filter** for courses by department
- ✅ **Unified table view** for all students and actions
- ✅ **Clean, modern UI** inspired by SchoolHub-style dashboards

## 📋 What the App Includes

- **Dashboard page** with navigation, metrics cards, and student list
- **Students page** with full-width student table and management tools
- **Courses page** with course statistics, add course form, and course management
- **Sidebar navigation** with an Add Student item to reveal the form
- **Student entry form** hidden until Add Student is clicked
- **Course entry form** for adding new courses with department selection
- **Student table** showing all students with search and filter capabilities
- **Course table** showing all courses with department filter and student counts
- **Search + course filter** working together across pages
- **Edit / delete actions** for each student and course
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
│   ├── index.html       # Main HTML file with multi-page layout
│   ├── script.js        # Frontend JavaScript logic with page navigation
│   └── style.css        # Dashboard styling with page transitions
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

### Navigation
- Use the **sidebar menu** to navigate between pages
- **Dashboard**: Overview with stats, student list, and add student form
- **Students**: Dedicated page for comprehensive student management
- **Courses**: Course management with statistics and course administration
- Other pages (Reports, Profile) are placeholders for future features

### Add a Student
1. Click **Add Student** in the sidebar menu
2. The fill-up form will appear on the Dashboard page
3. Fill in all required student fields
4. Click **Add Student** to save
5. The student appears in both the dashboard list and students page immediately

### Add a Course
1. Navigate to the **Courses** page using the sidebar
2. Use the **Add New Course** form on the left
3. Fill in course code, name, department, credits, and description
4. Click **Add Course** to save
5. The course appears in the course list and updates statistics

### Search Students
1. Use the search bar in the top navigation
2. Type to filter students in real-time across all fields
3. Search works on both Dashboard and Students pages
4. Combine with course filter for precise results

### Filter by Course
1. Choose a course from the dropdown menu on any page
2. The student list updates to show only matching results
3. Select **All Courses** to reset the filter
4. Filter works independently on each page

### Filter Courses by Department
1. On the Courses page, use the department dropdown
2. Select a department to show only courses from that department
3. Select **All Departments** to reset the filter

### Edit or Delete Students
1. Click **Edit** next to any student to update their details
2. Click **Delete** to remove a student (with confirmation)
3. Changes are saved automatically in localStorage
4. Actions work on both Dashboard and Students pages

### Edit or Delete Courses
1. On the Courses page, click **Edit** next to any course
2. Click **Delete** to remove a course (with confirmation)
3. Course changes update student course filters automatically

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
