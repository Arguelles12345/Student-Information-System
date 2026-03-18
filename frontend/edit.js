const API = "http://localhost:3000/students";

// get ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// load student
async function loadStudent() {
  const res = await fetch(API);
  const data = await res.json();

  const student = data.find(s => s.id == id);

  document.getElementById("studentId").value = student.studentId;
  document.getElementById("name").value = student.name;
  document.getElementById("age").value = student.age;
  document.getElementById("course").value = student.course;
  document.getElementById("email").value = student.email;
  document.getElementById("address").value = student.address;
  document.getElementById("gender").value = student.gender;
  document.getElementById("birthDate").value = student.birthDate;
  document.getElementById("guardian").value = student.guardian;
  document.getElementById("contactNumber").value = student.contactNumber;
}

document.getElementById("editForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const updated = {
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

  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated),
  });

  alert("Updated!");
  window.location.href = "/";
});

loadStudent();