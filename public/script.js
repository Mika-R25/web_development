let editId = null;

async function loadData(){

   const response = await fetch("/api/mahasiswa");

   const data = await response.json();

   let html="";

   data.forEach(item=>{

       html+=`

       <tr>

           <td>${item.nama}</td>

           <td>${item.nim}</td>

           <td>${item.prodi}</td>

           <td>

               <button onclick="edit(${item.id})">Edit</button>

               <button onclick="hapus(${item.id})">Delete</button>

           </td>

       </tr>

       `;

   });

   document.getElementById("tabelMahasiswa").innerHTML=html;

}

async function simpan(){

   const mahasiswa={

       nama:document.getElementById("nama").value,

       nim:document.getElementById("nim").value,

       prodi:document.getElementById("prodi").value

   };

   if(editId==null){

       await fetch("/api/mahasiswa",{

           method:"POST",

           headers:{

               "Content-Type":"application/json"

           },

           body:JSON.stringify(mahasiswa)

       });

   }else{

       await fetch("/api/mahasiswa/"+editId,{

           method:"PUT",

           headers:{

               "Content-Type":"application/json"

           },

           body:JSON.stringify(mahasiswa)

       });

       editId=null;

   }

   loadData();

}

async function hapus(id){

   await fetch("/api/mahasiswa/"+id,{

       method:"DELETE"

   });

   loadData();

}

async function edit(id){

   const response=await fetch("/api/mahasiswa/"+id);

   const data=await response.json();

   document.getElementById("nama").value=data.nama;

   document.getElementById("nim").value=data.nim;

   document.getElementById("prodi").value=data.prodi;

   editId=id;

}

loadData();