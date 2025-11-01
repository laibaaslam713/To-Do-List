let task = document.getElementById('task')
let add_button = document.getElementById('add-task')
let toDoList = document.getElementById('To-Do');

add_button.addEventListener('click', () => {
    let taskText = task.value.trim();


    let li = document.createElement('li');

    let taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    let editBtn = document.createElement('button');
    editBtn.textContent = '✎';
    editBtn.classList.add('edit-btn');

    editBtn.addEventListener('click', () => {
        let newTask = prompt("Edit your task:", taskSpan.textContent);
        if (newTask !== null && newTask.trim() !== "") {
            taskSpan.textContent = newTask.trim();
        }
    });

    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✖';
    deleteBtn.classList.add('delete-btn');

    deleteBtn.addEventListener('click', () => {
        li.remove();
    });

    li.appendChild(taskSpan);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    toDoList.appendChild(li);

    task.value = "";
});
