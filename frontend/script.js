const STORAGE_KEY = "students";
const COURSES_STORAGE_KEY = "courses";

const table = document.getElementById("studentTable");
const table2 = document.getElementById("studentTable2");
const form = document.getElementById("studentForm");
let allStudents = [];
let allCourses = [];
let currentPage = "dashboard";
let sortColumn = "studentId";
let sortDirection = "asc";

function navigateTo(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const pageEl = document.getElementById(page + "Page");
  if (pageEl) {
    pageEl.classList.add("active");
  }

  const formSection = document.getElementById("studentFormSection");
  if (formSection && page !== 'dashboard') {
    formSection.classList.add("hidden");
  }

  document.querySelectorAll(".menu-item").forEach(item => item.classList.remove("active"));
  document.querySelectorAll(".menu-item").forEach(item => {
    if (item.textContent.includes(page.charAt(0).toUpperCase() + page.slice(1))) {
      item.classList.add("active");
    }
  });

  currentPage = page;
}

function showAddStudentForm() {
  navigateTo('dashboard');
  const formSection = document.getElementById("studentFormSection");
  if (formSection) {
    formSection.classList.remove("hidden");
  }
  document.querySelectorAll(".menu-item").forEach(item => item.classList.remove("active"));
  const addItem = document.getElementById("menuAddStudent");
  if (addItem) {
    addItem.classList.add("active");
  }
}

function initStudents() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    allStudents = JSON.parse(stored);
  } else {
    allStudents = [];
  }
  updateSortIndicators();
  loadStudents();
  updateCourseFilters();
  updateStats();
}

function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allStudents));
}

function updateStats() {
  const totalStudents = allStudents.length;
  const courses = [...new Set(allStudents.map(s => s.course).filter(c => c))];
  const totalCourses = courses.length;
  const averageAge = totalStudents > 0 ? Math.round(allStudents.reduce((sum, s) => sum + parseInt(s.age || 0, 10), 0) / totalStudents) : 0;
  const totalRecords = totalStudents;

  const totalStudentsEl = document.getElementById("totalStudents");
  const totalCoursesEl = document.getElementById("totalCourses");
  const averageAgeEl = document.getElementById("averageAge");
  const totalRecordsEl = document.getElementById("totalRecords");

  if (totalStudentsEl) totalStudentsEl.innerText = totalStudents;
  if (totalCoursesEl) totalCoursesEl.innerText = totalCourses;
  if (averageAgeEl) averageAgeEl.innerText = averageAge;
  if (totalRecordsEl) totalRecordsEl.innerText = totalRecords;
}

function sortStudents(column) {
  if (sortColumn === column) {
    sortDirection = sortDirection === "asc" ? "desc" : "asc";
  } else {
    sortColumn = column;
    sortDirection = "asc";
  }
  
  allStudents.sort((a, b) => {
    let aVal = a[column];
    let bVal = b[column];
    
    if (column === "age") {
      aVal = parseInt(aVal, 10) || 0;
      bVal = parseInt(bVal, 10) || 0;
    } else {
      aVal = String(aVal || "").toLowerCase();
      bVal = String(bVal || "").toLowerCase();
    }
    
    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });
  
  updateSortIndicators();
  loadStudents();
}

function updateSortIndicators() {
  const columns = ["studentId", "name", "course", "email", "contactNumber"];
  const columnIds = { studentId: "sortStudentId", name: "sortName", course: "sortCourse", email: "sortEmail", contactNumber: "sortContact" };
  
  columns.forEach(col => {
    const span = document.getElementById(columnIds[col]);
    const span2 = document.getElementById(columnIds[col] + "2");
    if (sortColumn === col) {
      const indicator = sortDirection === "asc" ? "▲" : "▼";
      if (span) span.innerText = indicator;
      if (span2) span2.innerText = indicator;
    } else {
      if (span) span.innerText = "";
      if (span2) span2.innerText = "";
    }
  });
}

function loadStudents() {
  if (table) table.innerHTML = "";
  if (table2) table2.innerHTML = "";

  allStudents.forEach((student, index) => {
    const row = `
<tr>
  <td>${index + 1}</td>
  <td>${student.studentId}</td>
  <td onclick='showCard(${JSON.stringify(student).replace(/'/g, "&apos;")})' style="cursor:pointer;color:#667eea;font-weight:600;">${student.name}</td>
  <td>${student.course}</td>
  <td>${student.email}</td>
  <td>${student.contactNumber}</td>
  <td>
    <button class="edit" onclick="openEditModal(${index})">Edit</button>
    <button class="delete" onclick="deleteStudent(${index})">Delete</button>
  </td>
</tr>
`;
    if (table) table.innerHTML += row;
    if (table2) table2.innerHTML += row;
  });
}

async function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this student?")) {
    allStudents.splice(index, 1);
    saveToStorage();
    loadStudents();
    updateSortIndicators();
    updateCourseFilters();
    updateStats();
  }
}

function showCard(student) {
  const cardHtml = `
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 12px; margin-bottom: 20px;">
      <h2 style="margin-bottom: 5px;">🎓 ${student.name}</h2>
      <p style="opacity: 0.9; font-size: 14px;">Student ID: ${student.studentId}</p>
    </div>
    <div style="display: grid; gap: 15px;">
      <div>
        <label style="font-size: 12px; color: #95a5a6; font-weight: 600;">Course</label>
        <p>${student.course}</p>
      </div>
      <div>
        <label style="font-size: 12px; color: #95a5a6; font-weight: 600;">Email</label>
        <p>${student.email}</p>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
        <div>
          <label style="font-size: 12px; color: #95a5a6; font-weight: 600;">Age</label>
          <p>${student.age}</p>
        </div>
        <div>
          <label style="font-size: 12px; color: #95a5a6; font-weight: 600;">Gender</label>
          <p>${student.gender}</p>
        </div>
      </div>
      <div>
        <label style="font-size: 12px; color: #95a5a6; font-weight: 600;">Address</label>
        <p>${student.address}</p>
      </div>
      <div>
        <label style="font-size: 12px; color: #95a5a6; font-weight: 600;">Birth Date</label>
        <p>${student.birthDate}</p>
      </div>
      <div>
        <label style="font-size: 12px; color: #95a5a6; font-weight: 600;">Guardian</label>
        <p>${student.guardian}</p>
      </div>
      <div>
        <label style="font-size: 12px; color: #95a5a6; font-weight: 600;">Contact Number</label>
        <p>${student.contactNumber}</p>
      </div>
    </div>
  `;
  const modal = document.getElementById("idCardModal");
  const card = modal.querySelector(".card");
  if (card) {
    card.innerHTML = cardHtml + '<button class="btn-primary" onclick="closeCard()" style="width: 100%; margin-top: 20px;">Close</button>';
  }
  modal.classList.add("show");
}

function closeCard() {
  document.getElementById("idCardModal").classList.remove("show");
}

function searchStudent() {
  const input = document.getElementById("search").value.toLowerCase();
  const rows = document.querySelectorAll("#studentTable tr, #studentTable2 tr");
  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    row.style.display = text.includes(input) ? "" : "none";
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const student = {
    studentId: document.getElementById("studentId").value,
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    course: document.getElementById("course").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value,
    gender: document.getElementById("gender").value,
    birthDate: document.getElementById("birthDate").value,
    guardian: document.getElementById("guardian").value,
    contactNumber: document.getElementById("contactNumber").value,
  };

  allStudents.push(student);
  saveToStorage();
  form.reset();
  loadStudents();
  updateSortIndicators();
  updateCourseFilters();
  updateStats();
  alert("✅ Student added successfully!");
});

function openEditModal(index) {
  const student = allStudents[index];
  document.getElementById("editId").value = index;
  document.getElementById("editStudentId").value = student.studentId;
  document.getElementById("editName").value = student.name;
  document.getElementById("editAge").value = student.age;
  document.getElementById("editCourse").value = student.course;
  document.getElementById("editEmail").value = student.email;
  document.getElementById("editAddress").value = student.address;
  document.getElementById("editGender").value = student.gender;
  document.getElementById("editBirthDate").value = student.birthDate;
  document.getElementById("editGuardian").value = student.guardian;
  document.getElementById("editContactNumber").value = student.contactNumber;
  document.getElementById("editModal").classList.add("show");
}

function closeEditModal() {
  document.getElementById("editModal").classList.remove("show");
}

document.getElementById("editForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const index = parseInt(document.getElementById("editId").value, 10);
  const updated = {
    studentId: document.getElementById("editStudentId").value,
    name: document.getElementById("editName").value,
    age: document.getElementById("editAge").value,
    course: document.getElementById("editCourse").value,
    email: document.getElementById("editEmail").value,
    address: document.getElementById("editAddress").value,
    gender: document.getElementById("editGender").value,
    birthDate: document.getElementById("editBirthDate").value,
    guardian: document.getElementById("editGuardian").value,
    contactNumber: document.getElementById("editContactNumber").value,
  };
  allStudents[index] = updated;
  saveToStorage();
  closeEditModal();
  loadStudents();
  updateSortIndicators();
  updateCourseFilters();
  updateStats();
  alert("✅ Student updated successfully!");
});

function updateCourseFilters() {
  const courseFilter = document.getElementById("courseFilter");
  const courseFilter2 = document.getElementById("courseFilter2");
  const courses = [...new Set(allStudents.map(s => s.course).filter(c => c))];

  if (courseFilter) {
    const currentValue = courseFilter.value;
    courseFilter.innerHTML = '<option value="">All Courses</option>';
    courses.forEach(course => {
      const option = document.createElement("option");
      option.value = course;
      option.textContent = course;
      courseFilter.appendChild(option);
    });
    courseFilter.value = currentValue;
  }

  if (courseFilter2) {
    const currentValue2 = courseFilter2.value;
    courseFilter2.innerHTML = '<option value="">All Courses</option>';
    courses.forEach(course => {
      const option = document.createElement("option");
      option.value = course;
      option.textContent = course;
      courseFilter2.appendChild(option);
    });
    courseFilter2.value = currentValue2;
  }
}

function filterByCourse() {
  const selectedCourse = document.getElementById("courseFilter")?.value || document.getElementById("courseFilter2")?.value;
  const rows = document.querySelectorAll("#studentTable tr, #studentTable2 tr");
  rows.forEach(row => {
    if (!selectedCourse) {
      row.style.display = "";
    } else {
      const courseCell = row.cells[3];
      row.style.display = courseCell && courseCell.textContent === selectedCourse ? "" : "none";
    }
  });
}

function initCourses() {
  const stored = localStorage.getItem(COURSES_STORAGE_KEY);
  if (stored) {
    allCourses = JSON.parse(stored);
  } else {
    allCourses = [
      {
        code: 'CS101',
        name: 'Introduction to Computer Science',
        department: 'Computer Science',
        credits: 3,
        description: 'Basic concepts of programming and computer science'
      },
      {
        code: 'IT201',
        name: 'Database Management',
        department: 'Information Technology',
        credits: 3,
        description: 'SQL and database design principles'
      },
      {
        code: 'BUS301',
        name: 'Business Administration',
        department: 'Business',
        credits: 3,
        description: 'Fundamentals of business management'
      }
    ];
    saveCoursesToStorage();
  }
  loadCourses();
  updateDepartmentFilter();
  updateCourseStats();
}

function saveCoursesToStorage() {
  localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(allCourses));
}

function updateCourseStats() {
  const totalCourses = allCourses.length;
  const activeCourses = allCourses.length;
  const totalEnrollments = allStudents.length;
  const avgStudentsPerCourse = totalCourses > 0 ? Math.round(totalEnrollments / totalCourses) : 0;

  const totalCoursesEl = document.getElementById('totalCoursesCount');
  const activeCoursesEl = document.getElementById('activeCourses');
  const totalEnrollmentsEl = document.getElementById('totalEnrollments');
  const avgStudentsEl = document.getElementById('avgStudentsPerCourse');

  if (totalCoursesEl) totalCoursesEl.innerText = totalCourses;
  if (activeCoursesEl) activeCoursesEl.innerText = activeCourses;
  if (totalEnrollmentsEl) totalEnrollmentsEl.innerText = totalEnrollments;
  if (avgStudentsEl) avgStudentsEl.innerText = avgStudentsPerCourse;
}

function loadCourses() {
  const coursesTable = document.getElementById('coursesTable');
  if (!coursesTable) return;
  coursesTable.innerHTML = '';

  allCourses.forEach((course, index) => {
    const studentCount = allStudents.filter(s => s.course === course.name).length;
    const row = `
<tr>
  <td>${index + 1}</td>
  <td>${course.code}</td>
  <td>${course.name}</td>
  <td>${course.department}</td>
  <td>${course.credits}</td>
  <td>${studentCount}</td>
  <td>
    <button class='edit' onclick='editCourse(${index})'>Edit</button>
    <button class='delete' onclick='deleteCourse(${index})'>Delete</button>
  </td>
</tr>
`;
    coursesTable.innerHTML += row;
  });
}

function deleteCourse(index) {
  if (confirm('Are you sure you want to delete this course?')) {
    allCourses.splice(index, 1);
    saveCoursesToStorage();
    loadCourses();
    updateDepartmentFilter();
    updateCourseStats();
    updateCourseFilters();
    updateStats();
  }
}

function editCourse(index) {
  const course = allCourses[index];
  alert(`Edit course: ${course.name}\n\nFeature coming soon!`);
}

function updateDepartmentFilter() {
  const departmentFilter = document.getElementById('departmentFilter');
  if (!departmentFilter) return;
  const departments = [...new Set(allCourses.map(c => c.department).filter(d => d))];
  const currentValue = departmentFilter.value;
  departmentFilter.innerHTML = '<option value="">All Departments</option>';
  departments.forEach(department => {
    const option = document.createElement('option');
    option.value = department;
    option.textContent = department;
    departmentFilter.appendChild(option);
  });
  departmentFilter.value = currentValue;
}

function filterCoursesByDepartment() {
  const selectedDepartment = document.getElementById('departmentFilter').value;
  const rows = document.querySelectorAll('#coursesTable tr');
  rows.forEach(row => {
    if (!selectedDepartment) {
      row.style.display = '';
    } else {
      const departmentCell = row.cells[3];
      row.style.display = departmentCell && departmentCell.textContent === selectedDepartment ? '' : 'none';
    }
  });
}

const courseForm = document.getElementById('courseForm');
if (courseForm) {
  courseForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const course = {
      code: document.getElementById('courseCode').value,
      name: document.getElementById('courseName').value,
      department: document.getElementById('courseDepartment').value,
      credits: parseInt(document.getElementById('courseCredits').value, 10),
      description: document.getElementById('courseDescription').value,
    };
    allCourses.push(course);
    saveCoursesToStorage();
    courseForm.reset();
    loadCourses();
    updateDepartmentFilter();
    updateCourseStats();
    updateCourseFilters();
    updateStats();
    alert('✅ Course added successfully!');
  });
}

function closeModalsOnOutsideClick(e) {
  const cardModal = document.getElementById("idCardModal");
  const editModal = document.getElementById("editModal");
  if (e.target === cardModal) {
    cardModal.classList.remove("show");
  }
  if (e.target === editModal) {
    editModal.classList.remove("show");
  }
}

document.addEventListener("click", closeModalsOnOutsideClick);

initStudents();
initCourses();
