const STORAGE_KEY = "students";

const table = document.getElementById("studentTable");
const table2 = document.getElementById("studentTable2");
const form = document.getElementById("studentForm");
let allStudents = [];
let currentPage = "dashboard";

// PAGE NAVIGATION
function navigateTo(page) {
  // Hide all pages
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  
  // Show selected page
  const pageEl = document.getElementById(page + "Page");
  if (pageEl) {
    pageEl.classList.add("active");
  }
  
  // Hide add student form when navigating away or when using Dashboard link
  const formSection = document.getElementById("studentFormSection");
  if (formSection) {
    formSection.classList.add("hidden");
  }
  
  // Update menu active state
  document.querySelectorAll(".menu-item").forEach(item => {
    item.classList.remove("active");
  });
  
  // Find and activate the clicked menu item
  const menuItems = document.querySelectorAll(".menu-item");
  const menuTexts = {
    "dashboard": "Dashboard",
    "students": "Students",
    "courses": "Courses",
    "reports": "Reports",
    "profile": "Profile"
  };
  
  menuItems.forEach(item => {
    if (item.textContent.includes(menuTexts[page])) {
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

// Initialize from localStorage
function initStudents() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    allStudents = JSON.parse(stored);
  } else {
    allStudents = [];
  }
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
  const averageAge = totalStudents > 0 ? Math.round(allStudents.reduce((sum, s) => sum + parseInt(s.age || 0), 0) / totalStudents) : 0;
  const totalRecords = allStudents.length;

  document.getElementById("totalStudents").innerText = totalStudents;
  document.getElementById("totalCourses").innerText = totalCourses;
  document.getElementById("averageAge").innerText = averageAge;
  document.getElementById("totalRecords").innerText = totalRecords;
}

async function loadStudents() {
  // Clear both tables
  if (table) table.innerHTML = "";
  if (table2) table2.innerHTML = "";

  allStudents.forEach((student, index) => {
    const row = `
<tr>
  <td>${index + 1}</td>
  <td>${student.studentId}</td>
  <td onclick='showCard(${JSON.stringify(student).replace(/'/g, "&apos;")})' style="cursor:pointer;color:#667eea;font-weight:600;">
    ${student.name}
  </td>
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
  card.innerHTML = cardHtml + '<button class="btn-primary" onclick="closeCard()" style="width: 100%; margin-top: 20px;">Close</button>';
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
  const index = document.getElementById("editId").value;
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
  updateCourseFilters();
  updateStats();
  alert("✅ Student updated successfully!");
});

function updateCourseFilters() {
  const courseFilter = document.getElementById("courseFilter");
  const courseFilter2 = document.getElementById("courseFilter2");
  const courses = [...new Set(allStudents.map(s => s.course).filter(c => c))];
  
  // Update first filter
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
  
  // Update second filter
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
      row.style.display = courseCell.textContent === selectedCourse ? "" : "none";
    }
  });
}

// Close modal when clicking outside
document.addEventListener("click", (e) => {
  const cardModal = document.getElementById("idCardModal");
  const editModal = document.getElementById("editModal");
  
  if (e.target === cardModal) {
    cardModal.classList.remove("show");
  }
  if (e.target === editModal) {
    editModal.classList.remove("show");
  }
});

initStudents();

async function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this student?")) {
    allStudents.splice(index, 1);
    saveToStorage();
    loadStudents();
    updateCourseFilter();
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
  card.innerHTML = cardHtml + '<button class="btn-primary" onclick="closeCard()" style="width: 100%; margin-top: 20px;">Close</button>';
  modal.classList.add("show");
}

function closeCard() {
  document.getElementById("idCardModal").classList.remove("show");
}

function searchStudent() {
  const input = document.getElementById("search").value.toLowerCase();
  const rows = document.querySelectorAll("#studentTable tr");

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
  updateCourseFilter();
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
  const index = document.getElementById("editId").value;
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
  updateCourseFilter();
  updateStats();
  alert("✅ Student updated successfully!");
});

function updateCourseFilter() {
  const courseFilter = document.getElementById("courseFilter");
  const courses = [...new Set(allStudents.map(s => s.course).filter(c => c))];
  
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

function filterByCourse() {
  const selectedCourse = document.getElementById("courseFilter").value;
  const rows = document.querySelectorAll("#studentTable tr");

  rows.forEach(row => {
    if (!selectedCourse) {
      row.style.display = "";
    } else {
      const courseCell = row.cells[3];
      row.style.display = courseCell.textContent === selectedCourse ? "" : "none";
    }
  });
}

// Close modal when clicking outside
document.addEventListener("click", (e) => {
  const cardModal = document.getElementById("idCardModal");
  const editModal = document.getElementById("editModal");
  
  if (e.target === cardModal) {
    cardModal.classList.remove("show");
  }
  if (e.target === editModal) {
    editModal.classList.remove("show");
  }
});

initStudents();