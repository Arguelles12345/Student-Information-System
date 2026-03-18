const API = "http://localhost:3000/students";

const table = document.getElementById("studentTable");
const form = document.getElementById("studentForm");

async function loadStudents() {
  const res = await fetch(API);
  const data = await res.json();

  table.innerHTML = "";

  data.forEach(student => {
    const row = `
<tr>
  <td>${student.id}</td>
  <td>${student.studentId}</td>
  <td onclick='showCard(${JSON.stringify(student)})' style="cursor:pointer;color:#ff2e2e;">
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
    <button onclick="goToEdit(${student.id})">Edit</button>
    <button onclick="deleteStudent(${student.id})">Delete</button>
  </td>
</tr>
`;
    table.innerHTML += row;
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

 

  let base64 = "";

  if (file) {
    const reader = new FileReader();

    reader.onload = async function () {
      base64 = reader.result;
      await saveStudent(base64);
    };

    reader.readAsDataURL(file);
  } else {
    await saveStudent("");
  }
});

async function deleteStudent(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  loadStudents();
}

async function editStudent(id) {
  const name = prompt("Enter new name:");
  const age = prompt("Enter new age:");
  const course = prompt("Enter new course:");

  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, age, course }),
  });

  loadStudents();
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

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });

  form.reset();
  loadStudents();
});
function goToEdit(id) {
  window.location.href = `edit.html?id=${id}`;
}
loadStudents();