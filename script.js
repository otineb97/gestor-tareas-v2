// Function to add a task
function addTask(task, description, dueDate) {
  const taskList = document.getElementById("task-list");
  const li = document.createElement("li");
  li.className = "list-group-item";
  li.innerHTML = `
      <div class="d-flex justify-content-between align-items-center my-2">
        <div>
          <h5 class="card-title">${task}</h5>
          <p class="card-text">${description}</p>
          <p class="card-text"><small class="text-body-secondary">Fecha de Vencimiento: ${dueDate}</small></p>
          <button type="button" class="btn btn-success btn-sm mr-2" onclick="completeTask(this)">
            <i class="bi bi-check-lg"></i>
          </button>
          <button type="button" class="btn btn-primary btn-sm mr-2" onclick="editTask(this)">
            <i class="bi bi-pencil-square"></i>
          </button>
          <button type="button" class="btn btn-danger btn-sm" onclick="deleteTask(this)">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    `;
  taskList.appendChild(li);

  taskList.style.display = "block";

}

// Function to complete a task
function completeTask(button) {
  const taskItem = button.parentElement.parentElement;
  const taskTextElement = taskItem.querySelector("h5");
  taskTextElement.classList.toggle("text-decoration-line-through");
  const descriptionElement = taskItem.querySelector(".card-text");
  descriptionElement.classList.toggle("text-decoration-line-through");
  const editButton = taskItem.querySelector(".btn-primary");
  if (taskTextElement.classList.contains("text-decoration-line-through")) {
    editButton.setAttribute("disabled", "disabled");
  } else {
    editButton.removeAttribute("disabled");
  }
}

// Function to edit a task
function editTask(button) {
  const taskItem = button.parentElement.parentElement;
  const taskText = taskItem.querySelector("h5").textContent;
  const description = taskItem.querySelector("p").textContent;
  const dueDate = taskItem.querySelector("small").textContent.split(":")[1].trim();
  const taskInput = document.getElementById("task");
  const descriptionInput = document.getElementById("description");
  const dueDateInput = document.getElementById("due-date");
  taskInput.value = taskText;
  descriptionInput.value = description;
  dueDateInput.value = dueDate;
  taskItem.remove();
  adjustListHeight();
}

// Function to delete a task
function deleteTask(button) {
  const taskItem = button.parentElement.parentElement;
  taskItem.remove();
  adjustListHeight();

  if (document.querySelectorAll("#task-list li").length === 0) {
    document.getElementById("task-list").style.display = "none";
  }
}

// List size adjustment function
function adjustListHeight() {
  const taskList = document.getElementById("task-list");
  if (taskList.childElementCount === 0) {
    taskList.style.minHeight = "0";
  } else {
    taskList.querySelectorAll("li").forEach((li) => {
      if (li.textContent.trim() === "") {
        li.remove();
      }
    });
  }
}

// Event to add a task
document.getElementById("task-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const taskInput = document.getElementById("task");
  const descriptionInput = document.getElementById("description");
  const dueDateInput = document.getElementById("due-date");
  const task = taskInput.value;
  const description = descriptionInput.value;
  const dueDate = dueDateInput.value;

  // Get the current date in UTC format
  const currentDate = new Date().toISOString().split('T')[0];

  // Validate if the expiration date is before the current date
  if (dueDate < currentDate) {
    alert("La fecha de vencimiento debe ser igual o posterior a la fecha actual.");
    return;
  }

  if (task.trim() === "") {
    alert("Por favor, introduce una tarea");
  } else {
    addTask(task, description, dueDate);
    taskInput.value = "";
    descriptionInput.value = "";
    dueDateInput.valueAsDate = new Date();
  }
});

// Current date as default
document.getElementById("due-date").valueAsDate = new Date();
