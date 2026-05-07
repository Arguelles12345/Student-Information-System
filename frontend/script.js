const STORAGE_KEY = "students";
const COURSES_STORAGE_KEY = "courses";

const table = document.getElementById("studentTable");
const table2 = document.getElementById("studentTable2");
const form = document.getElementById("studentForm");
let allStudents = [];
let allCourses = [];
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

initStudents();/ /   C O U R S E S   M A N A G E M E N T   F U N C T I O N S 
 f u n c t i o n   i n i t C o u r s e s ( )   { 
     c o n s t   s t o r e d   =   l o c a l S t o r a g e . g e t I t e m ( C O U R S E S _ S T O R A G E _ K E Y ) ; 
     i f   ( s t o r e d )   { 
         a l l C o u r s e s   =   J S O N . p a r s e ( s t o r e d ) ; 
     }   e l s e   { 
         / /   A d d   s o m e   d e f a u l t   c o u r s e s 
         a l l C o u r s e s   =   [ 
             { 
                 c o d e :   ' C S 1 0 1 ' , 
                 n a m e :   ' I n t r o d u c t i o n   t o   C o m p u t e r   S c i e n c e ' , 
                 d e p a r t m e n t :   ' C o m p u t e r   S c i e n c e ' , 
                 c r e d i t s :   3 , 
                 d e s c r i p t i o n :   ' B a s i c   c o n c e p t s   o f   p r o g r a m m i n g   a n d   c o m p u t e r   s c i e n c e ' 
             } , 
             { 
                 c o d e :   ' I T 2 0 1 ' , 
                 n a m e :   ' D a t a b a s e   M a n a g e m e n t ' , 
                 d e p a r t m e n t :   ' I n f o r m a t i o n   T e c h n o l o g y ' , 
                 c r e d i t s :   3 , 
                 d e s c r i p t i o n :   ' S Q L   a n d   d a t a b a s e   d e s i g n   p r i n c i p l e s ' 
             } , 
             { 
                 c o d e :   ' B U S 3 0 1 ' , 
                 n a m e :   ' B u s i n e s s   A d m i n i s t r a t i o n ' , 
                 d e p a r t m e n t :   ' B u s i n e s s ' , 
                 c r e d i t s :   3 , 
                 d e s c r i p t i o n :   ' F u n d a m e n t a l s   o f   b u s i n e s s   m a n a g e m e n t ' 
             } 
         ] ; 
         s a v e C o u r s e s T o S t o r a g e ( ) ; 
     } 
     l o a d C o u r s e s ( ) ; 
     u p d a t e D e p a r t m e n t F i l t e r ( ) ; 
     u p d a t e C o u r s e S t a t s ( ) ; 
 } 
 
 f u n c t i o n   s a v e C o u r s e s T o S t o r a g e ( )   { 
     l o c a l S t o r a g e . s e t I t e m ( C O U R S E S _ S T O R A G E _ K E Y ,   J S O N . s t r i n g i f y ( a l l C o u r s e s ) ) ; 
 } 
 
 f u n c t i o n   u p d a t e C o u r s e S t a t s ( )   { 
     c o n s t   t o t a l C o u r s e s   =   a l l C o u r s e s . l e n g t h ; 
     c o n s t   a c t i v e C o u r s e s   =   a l l C o u r s e s . l e n g t h ;   / /   A l l   c o u r s e s   a r e   a c t i v e   f o r   n o w 
     c o n s t   t o t a l E n r o l l m e n t s   =   a l l S t u d e n t s . l e n g t h ; 
     c o n s t   a v g S t u d e n t s P e r C o u r s e   =   t o t a l C o u r s e s   >   0   ?   M a t h . r o u n d ( t o t a l E n r o l l m e n t s   /   t o t a l C o u r s e s )   :   0 ; 
 
     c o n s t   t o t a l C o u r s e s E l   =   d o c u m e n t . g e t E l e m e n t B y I d ( ' t o t a l C o u r s e s C o u n t ' ) ; 
     c o n s t   a c t i v e C o u r s e s E l   =   d o c u m e n t . g e t E l e m e n t B y I d ( ' a c t i v e C o u r s e s ' ) ; 
     c o n s t   t o t a l E n r o l l m e n t s E l   =   d o c u m e n t . g e t E l e m e n t B y I d ( ' t o t a l E n r o l l m e n t s ' ) ; 
     c o n s t   a v g S t u d e n t s E l   =   d o c u m e n t . g e t E l e m e n t B y I d ( ' a v g S t u d e n t s P e r C o u r s e ' ) ; 
 
     i f   ( t o t a l C o u r s e s E l )   t o t a l C o u r s e s E l . i n n e r T e x t   =   t o t a l C o u r s e s ; 
     i f   ( a c t i v e C o u r s e s E l )   a c t i v e C o u r s e s E l . i n n e r T e x t   =   a c t i v e C o u r s e s ; 
     i f   ( t o t a l E n r o l l m e n t s E l )   t o t a l E n r o l l m e n t s E l . i n n e r T e x t   =   t o t a l E n r o l l m e n t s ; 
     i f   ( a v g S t u d e n t s E l )   a v g S t u d e n t s E l . i n n e r T e x t   =   a v g S t u d e n t s P e r C o u r s e ; 
 } 
 
 f u n c t i o n   l o a d C o u r s e s ( )   { 
     c o n s t   c o u r s e s T a b l e   =   d o c u m e n t . g e t E l e m e n t B y I d ( ' c o u r s e s T a b l e ' ) ; 
     i f   ( ! c o u r s e s T a b l e )   r e t u r n ; 
 
     c o u r s e s T a b l e . i n n e r H T M L   =   ' ' ; 
 
     a l l C o u r s e s . f o r E a c h ( ( c o u r s e ,   i n d e x )   = >   { 
         c o n s t   s t u d e n t C o u n t   =   a l l S t u d e n t s . f i l t e r ( s   = >   s . c o u r s e   = = =   c o u r s e . n a m e ) . l e n g t h ; 
         c o n s t   r o w   =   \ 
 < t r > 
     < t d > \ < / t d > 
     < t d > \ < / t d > 
     < t d > \ < / t d > 
     < t d > \ < / t d > 
     < t d > \ < / t d > 
     < t d > \ < / t d > 
     < t d > 
         < b u t t o n   c l a s s = ' e d i t '   o n c l i c k = ' e d i t C o u r s e ( \ ) ' > E d i t < / b u t t o n > 
         < b u t t o n   c l a s s = ' d e l e t e '   o n c l i c k = ' d e l e t e C o u r s e ( \ ) ' > D e l e t e < / b u t t o n > 
     < / t d > 
 < / t r > 
 \ ; 
         c o u r s e s T a b l e . i n n e r H T M L   + =   r o w ; 
     } ) ; 
 } 
 
 f u n c t i o n   d e l e t e C o u r s e ( i n d e x )   { 
     i f   ( c o n f i r m ( ' A r e   y o u   s u r e   y o u   w a n t   t o   d e l e t e   t h i s   c o u r s e ? ' ) )   { 
         a l l C o u r s e s . s p l i c e ( i n d e x ,   1 ) ; 
         s a v e C o u r s e s T o S t o r a g e ( ) ; 
         l o a d C o u r s e s ( ) ; 
         u p d a t e D e p a r t m e n t F i l t e r ( ) ; 
         u p d a t e C o u r s e S t a t s ( ) ; 
         u p d a t e C o u r s e F i l t e r ( ) ;   / /   U p d a t e   s t u d e n t   c o u r s e   f i l t e r s   t o o 
         u p d a t e S t a t s ( ) ;   / /   U p d a t e   s t u d e n t   s t a t s 
     } 
 } 
 
 f u n c t i o n   e d i t C o u r s e ( i n d e x )   { 
     c o n s t   c o u r s e   =   a l l C o u r s e s [ i n d e x ] ; 
     / /   F o r   n o w ,   j u s t   s h o w   a n   a l e r t .   C o u l d   i m p l e m e n t   a   f u l l   e d i t   m o d a l   l a t e r 
     a l e r t ( \ E d i t   c o u r s e :   \ \ \ n \ \ n F e a t u r e   c o m i n g   s o o n ! \ ) ; 
 } 
 
 f u n c t i o n   u p d a t e D e p a r t m e n t F i l t e r ( )   { 
     c o n s t   d e p a r t m e n t F i l t e r   =   d o c u m e n t . g e t E l e m e n t B y I d ( ' d e p a r t m e n t F i l t e r ' ) ; 
     i f   ( ! d e p a r t m e n t F i l t e r )   r e t u r n ; 
 
     c o n s t   d e p a r t m e n t s   =   [ . . . n e w   S e t ( a l l C o u r s e s . m a p ( c   = >   c . d e p a r t m e n t ) . f i l t e r ( d   = >   d ) ) ] ; 
 
     c o n s t   c u r r e n t V a l u e   =   d e p a r t m e n t F i l t e r . v a l u e ; 
     d e p a r t m e n t F i l t e r . i n n e r H T M L   =   ' < o p t i o n   v a l u e = \  
 \ > A l l   D e p a r t m e n t s < / o p t i o n > ' ; 
 
     d e p a r t m e n t s . f o r E a c h ( d e p a r t m e n t   = >   { 
         c o n s t   o p t i o n   =   d o c u m e n t . c r e a t e E l e m e n t ( ' o p t i o n ' ) ; 
         o p t i o n . v a l u e   =   d e p a r t m e n t ; 
         o p t i o n . t e x t C o n t e n t   =   d e p a r t m e n t ; 
         d e p a r t m e n t F i l t e r . a p p e n d C h i l d ( o p t i o n ) ; 
     } ) ; 
 
     d e p a r t m e n t F i l t e r . v a l u e   =   c u r r e n t V a l u e ; 
 } 
 
 f u n c t i o n   f i l t e r C o u r s e s B y D e p a r t m e n t ( )   { 
     c o n s t   s e l e c t e d D e p a r t m e n t   =   d o c u m e n t . g e t E l e m e n t B y I d ( ' d e p a r t m e n t F i l t e r ' ) . v a l u e ; 
     c o n s t   r o w s   =   d o c u m e n t . q u e r y S e l e c t o r A l l ( ' # c o u r s e s T a b l e   t r ' ) ; 
 
     r o w s . f o r E a c h ( r o w   = >   { 
         i f   ( ! s e l e c t e d D e p a r t m e n t )   { 
             r o w . s t y l e . d i s p l a y   =   ' ' ; 
         }   e l s e   { 
             c o n s t   d e p a r t m e n t C e l l   =   r o w . c e l l s [ 3 ] ; 
             r o w . s t y l e . d i s p l a y   =   d e p a r t m e n t C e l l . t e x t C o n t e n t   = = =   s e l e c t e d D e p a r t m e n t   ?   ' '   :   ' n o n e ' ; 
         } 
     } ) ; 
 } 
 
 / /   C o u r s e   f o r m   s u b m i s s i o n 
 c o n s t   c o u r s e F o r m   =   d o c u m e n t . g e t E l e m e n t B y I d ( ' c o u r s e F o r m ' ) ; 
 i f   ( c o u r s e F o r m )   { 
     c o u r s e F o r m . a d d E v e n t L i s t e n e r ( ' s u b m i t ' ,   a s y n c   ( e )   = >   { 
         e . p r e v e n t D e f a u l t ( ) ; 
 
         c o n s t   c o u r s e   =   { 
             c o d e :   d o c u m e n t . g e t E l e m e n t B y I d ( ' c o u r s e C o d e ' ) . v a l u e , 
             n a m e :   d o c u m e n t . g e t E l e m e n t B y I d ( ' c o u r s e N a m e ' ) . v a l u e , 
             d e p a r t m e n t :   d o c u m e n t . g e t E l e m e n t B y I d ( ' c o u r s e D e p a r t m e n t ' ) . v a l u e , 
             c r e d i t s :   p a r s e I n t ( d o c u m e n t . g e t E l e m e n t B y I d ( ' c o u r s e C r e d i t s ' ) . v a l u e ) , 
             d e s c r i p t i o n :   d o c u m e n t . g e t E l e m e n t B y I d ( ' c o u r s e D e s c r i p t i o n ' ) . v a l u e , 
         } ; 
 
         a l l C o u r s e s . p u s h ( c o u r s e ) ; 
         s a v e C o u r s e s T o S t o r a g e ( ) ; 
         c o u r s e F o r m . r e s e t ( ) ; 
         l o a d C o u r s e s ( ) ; 
         u p d a t e D e p a r t m e n t F i l t e r ( ) ; 
         u p d a t e C o u r s e S t a t s ( ) ; 
         u p d a t e C o u r s e F i l t e r ( ) ;   / /   U p d a t e   s t u d e n t   c o u r s e   f i l t e r s 
         u p d a t e S t a t s ( ) ;   / /   U p d a t e   s t u d e n t   s t a t s 
         a l e r t ( ' '  C o u r s e   a d d e d   s u c c e s s f u l l y ! ' ) ; 
     } ) ; 
 } 
 
 i n i t C o u r s e s ( ) ;  
 