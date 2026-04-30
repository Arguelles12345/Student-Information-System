const STORAGE_KEY = "students";

const table = document.getElementById("studentTable");
const form = document.getElementById("studentForm");
let allStudents = [];

// Initialize from localStorage
function initStudents() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    allStudents = JSON.parse(stored);
  } else {
    allStudents = [];
  }
  loadStudents();
  updateCourseFilter();
}

function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allStudents));
}

async function loadStudents() {
  table.innerHTML = "";

  allStudents.forEach((student, index) => {
    const row = `
<tr>
  <td>${index + 1}</td>
  <td>${student.studentId}</td>
  <td onclick='showCard(${JSON.stringify(student).replace(/'/g, "&apos;")})' style="cursor:pointer;color:#ff2e2e;">
    ${student.name}
  </td>
  <td>${student.age}</td>
  <td>${student.course}</td>
  <td>${student.email}</td>
  <td>${student.address}</td>
  <td>${student.gender}</td>
  <td>${student.birthDate}</td>
  <td>${student.guardian}</td>
  <td>${student.contactNumber}</td>
  <td>
    <button onclick="openEditModal(${index})">Edit</button>
    <button onclick="deleteStudent(${index})">Delete</button>
  </td>
</tr>
`;
    table.innerHTML += row;
  });
}

async function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this student?")) {
    allStudents.splice(index, 1);
    saveToStorage();
    loadStudents();
    updateCourseFilter();
  }
}
function showCard(student) {
  document.getElementById("cardStudentId").innerText = student.studentId;
  document.getElementById("cardName").innerText = student.name;
  document.getElementById("cardCourse").innerText = student.course;
  document.getElementById("cardEmail").innerText = student.email;
  document.getElementById("cardAddress").innerText = student.address;
  document.getElementById("cardGender").innerText = student.gender;
  document.getElementById("cardBirthDate").innerText = student.birthDate;
  document.getElementById("cardGuardian").innerText = student.guardian;
  document.getElementById("cardContact").innerText = student.contactNumber;

  document.getElementById("idCardModal").style.display = "flex";
}

function closeCard() {
  document.getElementById("idCardModal").style.display = "none";
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
  alert("Student added successfully!");
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
  document.getElementById("editModal").style.display = "flex";
}

function closeEditModal() {
  document.getElementById("editModal").style.display = "none";
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
  alert("Student updated successfully!");
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
      const courseCell = row.cells[4];
      row.style.display = courseCell.textContent === selectedCourse ? "" : "none";
    }
  });
}

initStudents();