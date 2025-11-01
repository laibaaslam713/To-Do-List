let task = document.getElementById('task')
let add_button = document.getElementById('add-task')
let toDoList = document.getElementById('To-Do');

add_button.addEventListener('click', ()=>{
    let taskText = task.value

    let li = document.createElement('li');
    li.textContent = taskText;

    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';

    deleteBtn.addEventListener('click', ()=>{
        li.remove();
    })

    li.appendChild(deleteBtn);

    toDoList.appendChild(li);

    task.value = "";
})