

const add_button = document.getElementById('add-task');
const task = document.getElementById('task');
const toDoList = document.getElementById('To-Do');


window.addEventListener('load', loadTasks);


add_button.addEventListener('click', () => {
    let taskText = task.value.trim();

    if (taskText === "") return;

    addTask(taskText);
    saveTask(taskText);

    task.value = "";
});


function addTask(taskText) {
    let li = document.createElement('li');


    let taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;


    let editBtn = document.createElement('button');
    editBtn.textContent = '✎';
    editBtn.classList.add('edit-btn');


    editBtn.addEventListener('click', () => {
        let newTask = prompt("Edit your task:", taskSpan.textContent);
        if (newTask !== null && newTask.trim() !== "") {
            updateTask(taskSpan.textContent, newTask.trim());
            taskSpan.textContent = newTask.trim();
        }
    });


    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✖';
    deleteBtn.classList.add('delete-btn');


    deleteBtn.addEventListener('click', () => {
        li.remove();
        deleteTask(taskSpan.textContent);
    });


    li.appendChild(taskSpan);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    toDoList.appendChild(li);
}


function saveTask(taskText) {

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function loadTasks() {

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskText => addTask(taskText));

}


function deleteTask(taskText) {

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}


function updateTask(oldText, newText) {

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let index = tasks.indexOf(oldText);

    if (index !== -1) {
        tasks[index] = newText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
}
