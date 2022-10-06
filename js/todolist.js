let userTask = document.querySelector('#task');// Reach element whose id is task ("<input>"" part in HTML)
userTask.addEventListener('submit', newElement);

let userList = document.querySelector('#list'); // Reach element whose id is list (<ul> part in HTML)
userList.addEventListener('click', checkedList, false);

let list = document.getElementsByTagName("li"); // reach the "li"

let close = document.getElementsByClassName("close"); //close button

let tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : []; //localStorage 

let counter = 0; //for the tasks id

// Instance sentences.
const defaultTasks = [
    "Ders calis",
    "Spora git",
    "Bol Bol su ic",
    "Kitap oku",
    
]

// Add new sentences to the list. (newElement Function) Controlling the input part and if it is eligible, adds the list.//
function newElement(event) {
    const USER_TASK = document.querySelector('#task');
    if (USER_TASK.value) {
        $(".success").toast("show");
        counter = tasks?.length > 0 ? Math.max(...tasks.map(o => o.id)) : 1
        counter++
        const task = {
            id: counter,
            content: USER_TASK.value,
            checked: false
        }
        tasks.push(task)
        addItem(task);
        localStorage.setItem("tasks", JSON.stringify(tasks))
        USER_TASK.value = "";
    } else {
        $(".error").toast("show");
    }
}

// add the instance sentences (defaultTasks) on the list. If it is the first visit to the website, the instance sentences add to the list, but if not, it does not.//
window.onload = (event) => {
    if (!localStorage.getItem("hasVisited")) {
        defaultTasks.forEach((task, index) => {
            tasks.push({
                id: index,
                content: task,
                checked: false
            })
        })
        localStorage.setItem("hasVisited", true)
    }
    if (tasks)
        tasks.map(element => {
            addItem(element)
        })
};

// It adds the input part to the list (addItem function) , addItem function in newElement Function  //
const addItem = (userTask) => {
    let liDOM = document.createElement('li')
    liDOM.innerHTML = userTask.content
    liDOM.setAttribute("data-id", userTask.id)
    userList.append(liDOM)
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    liDOM.appendChild(span);
    for (let i = 0; i < close.length; i++) {
        close[i].onclick = function (event) {
            deleteItem(this, event)
            console.log(this)
        }
    }
    if (userTask.checked) {
        liDOM.classList.add("checked")
    }
    localStorage.setItem("tasks", JSON.stringify(tasks))
}


// Add a "checked" symbol when clicking on a list item (checkedList Function) //
function checkedList(event) {
    if (event.target.tagName === 'LI') {
        event.target.classList.toggle('checked')
        let taskID = Number(event.target.getAttribute("data-id"))
        let taskIndex = taskID;
        let isChecked = tasks[taskIndex].checked
        tasks[taskIndex].checked = !isChecked
        console.log(taskID)
        console.log(taskIndex);
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }
}


// When Clicking on close button to hide the list item, this function works. It deletes the items which are clicked (deleteItem Function)
function deleteItem(obj) {
    let div = obj.parentElement;
    div.style.display = "none";
    if (obj.nodeName === "SPAN") {
        const taskID = obj.parentNode.getAttribute("data-id")
        tasks = tasks.filter(t => t.id !== Number(taskID))
        localStorage.setItem("tasks", JSON.stringify(tasks))
        obj.parentNode.remove()
    }

}
