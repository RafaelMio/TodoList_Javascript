const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    taskList.innerHTML = ''; // Réinitialise la liste

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('box');
        taskItem.textContent = task.text;

        // Applique le style "completed" si la tâche est terminée
        if (task.completed) {
            taskItem.classList.add('completed');
        }

        // Clic pour marquer comme terminée
        taskItem.addEventListener('click', () => {
            toggleCompleteTask(index);
        });

        // Bouton de suppression de la tâche
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTask(index);
        });

        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    });
}

function toggleCompleteTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function addTask() {
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text, completed: false });
        renderTasks();
        taskInput.value = '';
    }
}

addTaskButton.addEventListener('click', addTask);

renderTasks();