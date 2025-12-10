const add_button = document.getElementById('add-task');
const task = document.getElementById('task');
const toDoList = document.getElementById('To-Do');
const completedList = document.getElementById('Completed');

// Load tasks on refresh
window.addEventListener('load', loadTasks);

// Add new task
add_button.addEventListener('click', () => {
    let taskText = task.value.trim();

    if (taskText === "") return;

    addTask(taskText, false);  // false = not completed
    saveTask(taskText, false);

    task.value = "";
});


// Add Task to UI
function addTask(taskText, isCompleted) {
    let li = document.createElement('li');

    let taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    // Complete Button
    let completeBtn = document.createElement('button');
    completeBtn.textContent = "✔";
    completeBtn.classList.add('complete-btn');

    completeBtn.addEventListener('click', () => {
        li.remove();
        addCompletedTask(taskText);
        markCompleted(taskText);
    });

    // Edit Button
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

    // Delete Button
    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✖';
    deleteBtn.classList.add('delete-btn');

    deleteBtn.addEventListener('click', () => {
        li.remove();
        deleteTask(taskSpan.textContent);
    });

    li.appendChild(taskSpan);
    li.appendChild(completeBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    if (!isCompleted) {
        toDoList.appendChild(li);
    }
}


// Add completed task to UI
function addCompletedTask(taskText) {
    let li = document.createElement('li');

    let span = document.createElement('span');
    span.textContent = taskText;

    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✖';
    deleteBtn.classList.add('delete-btn');

    deleteBtn.addEventListener('click', () => {
        li.remove();
        deleteCompleted(taskText);
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    completedList.appendChild(li);
}


// Save task as string
function saveTask(taskText, isCompleted) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, completed: isCompleted });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Load from localStorage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(t => {
        if (t.completed) {
            addCompletedTask(t.text);
        } else {
            addTask(t.text, false);
        }
    });
}


// Update task text
function updateTask(oldText, newText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    let index = tasks.findIndex(t => t.text === oldText);

    if (index !== -1) {
        tasks[index].text = newText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}


// Delete task (from To-do list)
function deleteTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Delete completed task
function deleteCompleted(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Mark task as completed
function markCompleted(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks = tasks.map(t =>
        t.text === taskText ? { text: t.text, completed: true } : t
    );

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
