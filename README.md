<p align="center">
  <img src="https://img.icons8.com/color/96/000000/graduation-cap.png" alt="Student Icon" />
</p>

# 📚 Student Information Management System

A modern student dashboard with multi-page navigation, featuring a comprehensive student management interface. The app is built with **NestJS** backend and **vanilla JavaScript/HTML/CSS** frontend, using **localStorage** for browser-side persistence.

## ✨ Dashboard Highlights

- ✅ **Multi-page navigation** with clickable sidebar menu
- ✅ **Dashboard page** with stats cards, student list, and add student form
- ✅ **Dedicated Students page** for full student management
- ✅ **Search bar** with real-time filtering across all pages
- ✅ **Course dropdown** to filter students by course
- ✅ **Unified table view** for all students and actions
- ✅ **Clean, modern UI** inspired by SchoolHub-style dashboards

## 📋 What the App Includes

- **Dashboard page** with navigation, metrics cards, student list, and add student form at bottom
- **Students page** with full-width student table and management tools
- **Sidebar navigation** for easy page switching (Dashboard, Students, Courses, Reports, Profile)
- **Student entry form** integrated into the dashboard
- **Student table** showing all students with search and filter capabilities
- **Search + course filter** working together across pages
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
- Other pages (Courses, Reports, Profile) are placeholders for future features

### Add a Student
1. Navigate to the **Dashboard** page
2. Scroll to the bottom to find the **Add New Student** form
3. Fill in all required student fields
4. Click **Add Student** to save
5. The student appears in both the dashboard list and students page immediately

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

### Edit or Delete Students
1. Click **Edit** next to any student to update their details
2. Click **Delete** to remove a student (with confirmation)
3. Changes are saved automatically in localStorage
4. Actions work on both Dashboard and Students pages

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
