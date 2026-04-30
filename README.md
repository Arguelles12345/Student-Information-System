<p align="center">
  <img src="https://img.icons8.com/color/96/000000/graduation-cap.png" alt="Student Icon" />
</p>

# 📚 Student Information Management System

A modern, professional web-based student information management system built with **NestJS** backend and vanilla **JavaScript/HTML/CSS** frontend. The system uses **localStorage** for data persistence and provides a clean, intuitive user interface.

## ✨ Features

### 1. **Student Management**
- ✅ **Add Students** - Create new student records with complete information
- ✅ **View Student Details** - Click on student name to view complete ID card
- ✅ **Edit Students** - Update student information in a scrollable modal
- ✅ **Delete Students** - Remove students from the system
- ✅ **Data Persistence** - All data stored in browser's localStorage

### 2. **Search & Filter**
- 🔍 **Real-time Search** - Search students by any field (Name, ID, Course, Email, etc.)
- 📊 **Course Filter** - Filter students by their course
- 🎯 **Combined Filtering** - Use search and course filter together

### 3. **User Interface**
- 🎨 **Professional Design** - Clean, modern interface with smooth animations
- 📱 **Responsive Layout** - Works on desktop and tablet devices
- ⚡ **Smooth Interactions** - Hover effects, transitions, and visual feedback
- 🖱️ **Intuitive Navigation** - Easy-to-use modals and forms

## 📋 Student Information Fields

Each student record contains:
- **Student ID** - Unique identifier (format: 2023-00000)
- **Name** - Full name
- **Age** - Student's age
- **Course** - Academic course/program
- **Email** - Email address
- **Address** - Residential address
- **Gender** - Gender
- **Birthdate** - Date of birth
- **Guardian** - Parent/Guardian name
- **Contact Number** - Phone number

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

4. **Access the application**
   - Open your browser and navigate to: `http://localhost:3000`

## 📁 Project Structure

```
student-info-system/
├── frontend/
│   ├── index.html       # Main HTML file
│   ├── script.js        # Frontend JavaScript logic
│   └── style.css        # Professional styling
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

### Adding a Student
1. Fill in all student information in the form at the top
2. Click "Add Student" button
3. Student will be added and visible in the table below

### Viewing Student Details
1. Click on any student's **Name** in the table
2. A modal will appear showing the complete student ID card
3. Click "Close" to dismiss the modal

### Editing a Student
1. Click the **Edit** button in the Actions column
2. A scrollable modal with all fields will appear
3. Modify the information as needed
4. Click "Save Changes" to update
5. Click "Cancel" to discard changes

### Deleting a Student
1. Click the **Delete** button in the Actions column
2. Confirm the deletion when prompted
3. Student will be removed from the system

### Searching for Students
1. Use the search box to find students by any field
2. Type to filter results in real-time

### Filtering by Course
1. Select a course from the dropdown filter
2. Table will show only students from that course
3. Select "All Courses" to show all students again

## 🎨 Professional Design Features

- **Modern UI** - Clean, professional appearance with blue color scheme
- **Smooth Animations** - Fade-in modals and slide-up effects
- **Responsive Forms** - Grid-based layout that adapts to screen size
- **Professional Typography** - Segoe UI font for readability
- **Interactive Elements** - Hover effects and visual feedback on all buttons
- **Scrollable Modals** - Long forms and content are scrollable within modals
- **Custom Scrollbars** - Styled scrollbars matching the design

## 💾 Data Storage

- **No Database Required** - Uses browser's localStorage for data persistence
- **Client-Side Storage** - All data stored locally in your browser
- **Automatic Saving** - Changes are saved immediately
- **Cross-Session Persistence** - Data persists even after closing the browser

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: NestJS, Node.js
- **Database**: localStorage (Browser-based)
- **Styling**: Professional CSS with gradients and animations
- **Architecture**: MVC pattern with separation of concerns

## 📝 Features Implementation Details

### Feature 1: Student ID Card View
- Click on student name to display detailed information
- Beautiful modal design with professional styling
- Displays all student information in a card format
- Scrollable for long content

### Feature 2: Edit Student Modal
- Inline editing without page navigation
- Scrollable form for all fields
- Form validation before submission
- Success confirmation message

### Feature 3: Add Student Functionality
- Simple form-based student creation
- All fields are required
- Automatic data persistence
- Success message upon addition

### Feature 4: Course Filter
- Dynamically populated dropdown
- Filters table in real-time
- Works alongside search functionality
- Easy switching between courses

### Feature 5: Real-time Search
- Search across all student fields
- Immediate results as you type
- Case-insensitive search
- Combined with course filter

## 📊 Recent Updates

- ✅ Removed database dependency - switched to localStorage
- ✅ Added student creation form
- ✅ Implemented course filter dropdown
- ✅ Made edit modal scrollable with custom styling
- ✅ Upgraded to professional UI design
- ✅ Added smooth animations and transitions
- ✅ Improved form validation and user feedback

## 🚧 Future Enhancements

- Export student data to CSV/PDF
- Student image uploads
- Advanced search filters
- Batch operations
- Student groups/sections
- Database integration option
- Mobile app version

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Author

Student Information System - A modern approach to student management

---

**Last Updated**: April 30, 2026  
**Version**: 2.0 (Professional UI Release)
