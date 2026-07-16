const API="/students";

const form=document.getElementById("studentForm");

const table=document.getElementById("studentTable");

const id=document.getElementById("id");

const npm=document.getElementById("npm");

const nama=document.getElementById("nama");

const jurusan=document.getElementById("jurusan");

const semester=document.getElementById("semester");

const email=document.getElementById("email");

const alamat=document.getElementById("alamat");

async function loadStudents(){

const response=await fetch(API);

const result=await response.json();

table.innerHTML="";

result.data.forEach(student=>{

table.innerHTML+=`

<tr>

<td>${student.id}</td>

<td>${student.npm}</td>

<td>${student.nama}</td>

<td>${student.jurusan}</td>

<td>${student.semester}</td>

<td>${student.email}</td>

<td>${student.alamat}</td>

<td>

<button

class="edit"

onclick="editStudent(${student.id})">

Edit

</button>

<button

class="delete"

onclick="deleteStudent(${student.id})">

Hapus

</button>

</td>

</tr>

`;

});

}

loadStudents();

form.addEventListener("submit",async(e)=>{

e.preventDefault();

const student={

npm:npm.value,

nama:nama.value,

jurusan:jurusan.value,

semester:semester.value,

email:email.value,

alamat:alamat.value

};

if(id.value==""){

await fetch(API,{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(student)

});

}else{

await fetch(API+"/"+id.value,{

method:"PUT",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(student)

});

}

form.reset();

id.value="";

loadStudents();

});

async function editStudent(studentId){

const response=await fetch(API+"/"+studentId);

const result=await response.json();

const data=result.data;

id.value=data.id;

npm.value=data.npm;

nama.value=data.nama;

jurusan.value=data.jurusan;

semester.value=data.semester;

email.value=data.email;

alamat.value=data.alamat;

window.scrollTo({

top:0,

behavior:"smooth"

});

}

async function deleteStudent(studentId){

const konfirmasi=confirm(

"Yakin ingin menghapus data?"

);

if(!konfirmasi) return;

await fetch(API+"/"+studentId,{

method:"DELETE"

});

loadStudents();

}
