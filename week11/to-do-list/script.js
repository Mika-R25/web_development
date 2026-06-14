function tambahTask(){

let task =
document.getElementById("task").value;

let li =
document.createElement("li");

li.innerHTML = task;

document.getElementById("list")
.appendChild(li);

}
