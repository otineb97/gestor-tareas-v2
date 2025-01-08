const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const taskSubmitButton = document.getElementById('taskSubmitButton');
    
let tasks = [];
let editTaskId = null;

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const date = document.getElementById('taskDate').value;

    if (editTaskId) {
      const task = tasks.find(t => t.id === editTaskId);
      task.title = title;
      task.description = description;
      task.date = date;
      editTaskId = null;
      taskSubmitButton.textContent = 'Agregar tarea';
    } else {
      const task = {
        id: Date.now(),
        title,
        description,
        date,
        completed: false
      };
      tasks.push(task);
    }

    renderTasks();
    taskForm.reset();
});

function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach(task => {
      const taskElement = document.createElement('div');
      taskElement.classList.add('card', 'mb-3', 'task-card');
      if (task.completed) {
        taskElement.classList.add('completed');
      }

      taskElement.innerHTML = `
        <div class="card-body">
          <h5 class="card-title task-title">${task.title}</h5>
          ${task.description ? `<p class="card-text">${task.description}</p>` : ''}
          <p class="card-text task-date">Fecha de vencimiento: ${dayjs(task.date).format('DD/MM/YYYY')}</p>
          <div class="d-flex justify-content-end">
            <button class="btn btn-success btn-sm btn-action me-2" onclick="completeTask(${task.id})" title="Completar">
              <i class="bi bi-check-circle"></i>
            </button>
            <button class="btn btn-success btn-sm btn-action me-2" onclick="editTask(${task.id})" title="Editar">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-success btn-sm btn-action me-2" onclick="deleteTask(${task.id})" title="Eliminar">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      `;

      taskList.appendChild(taskElement);
    });
}

function completeTask(id) {
    const task = tasks.find(t => t.id === id);
    task.completed = !task.completed;
    renderTasks();
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);

    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskDescription').value = task.description;
    document.getElementById('taskDate').value = task.date;

    editTaskId = id;
    taskSubmitButton.textContent = 'Editar tarea';
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

new Sortable(taskList, {
    animation: 150,
    onEnd: (event) => {
      const [movedTask] = tasks.splice(event.oldIndex, 1);
      tasks.splice(event.newIndex, 0, movedTask);
      renderTasks();
    }
});
