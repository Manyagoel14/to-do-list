const listContainer = document.getElementById("list-group");

function createTaskElement(taskData, index) {
  const container = document.createElement("div");
  container.className =
    "list-group-item d-flex justify-content-between align-items-center mb-2  px-3 py-2";

  // Set background color based on priority
  const priorityColors = {
    low: "#59d434",
    moderate: "#ffd700",
    high: "#ff6b6b",
  };
  const pencilColor = priorityColors[taskData.priority] || "#808cfd";

  // Effort level indicators
  const effortPencil = {
    easy: `<i class="bi bi-pencil-fill ps-2" style="color: ${pencilColor}"></i>
               <i class="bi bi-pencil-fill" style="color: ${pencilColor}"></i>
               <i class="bi bi-pencil" style="color: ${pencilColor}"></i>`,

    medium: `<i class="bi bi-pencil-fill ps-2" style="color: ${pencilColor}"></i>
                 <i class="bi bi-pencil-fill" style="color: ${pencilColor}"></i>
                 <i class="bi bi-pencil" style="color: ${pencilColor}"></i>`,

    hard: `<i class="bi bi-pencil-fill ps-2" style="color: ${pencilColor}"></i>
               <i class="bi bi-pencil-fill" style="color: ${pencilColor}"></i>
               <i class="bi bi-pencil-fill" style="color: ${pencilColor}"></i>`,
  };

  if (taskData.completed) {
    container.classList.add("completed");
    container.style.opacity = "0.4";
  }

  // HTML inside container
  container.innerHTML = `
        <div class="col-6 d-flex gap-2 align-items-center">
            <input class="form-check-input flex-shrink-0" type="checkbox"
                ${taskData.completed ? "checked" : ""}
                style="font-size: 1.375em;"
                onchange="toggleTask(${index})">
            <span class="form-checked-content pt-1">${
              taskData.text[0].toUpperCase() +
              taskData.text.slice(1).toLowerCase()
            }
            </span>
        </div>
        <div class="col-4">
            <small class="text-body-secondary">
                ${effortPencil[taskData.effort] || effortPencil.medium}
            </small>
        </div>
        <div class="d-flex align-items-center justify-content-end">
            <i class="bi bi-pencil-square text-warning me-2" style="cursor: pointer; font-size: 1.2rem;" onclick="editTask(${index})"></i>
            <i class="bi bi-x-circle-fill text-danger" style="cursor: pointer; font-size: 1.2rem;" onclick="deleteTask(${index})"></i>
        </div>
    `;

  return container;
}

function toggleTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function editTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  const task = tasks[index];
  newText = prompt("Enter new task name");
  if (newText !== null && newText.trim() !== "") {
    task.text = newText.trim();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }
}

function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function loadTasks() {
  listContainer.innerHTML = "";
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  if (tasks.length === 0) {
    const label = document.createElement("div");
    label.innerHTML = `<p class="text-secondary text-center">No tasks found. Create one now</p>`;
    listContainer.appendChild(label);
    return;
  }

  const priorities = ["high", "moderate", "low"];
  priorities.forEach((priority) => {
    tasks.forEach((task, index) => {
      if (task.priority === priority) {
        const taskElement = createTaskElement(task, index);
        listContainer.appendChild(taskElement);
      }
    });
  });
}

function initSampleTasks() {
  if (!localStorage.getItem("tasks")) {
    const label = document.createElement("div");
    label.innerHTML = `<p class="text-muted">No tasks found. Create one now</p>`;

    if (listContainer) {
      listContainer.appendChild(label);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initSampleTasks();
  if (localStorage.getItem("tasks")) {
    loadTasks();
  }
});


function toggleDropdown() {
  const dropdown = document.getElementById("myDropdown");
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
}

// Optional: Close if clicked outside
window.addEventListener("click", function (e) {
  const filterBtn = document.querySelector(".filter-btn");
  const dropdown = document.getElementById("myDropdown");
  if (!filterBtn.contains(e.target)) {
    dropdown.style.display = "none";
  }
});

function applyFilters() {
  const activeBox = document.getElementById("active");
  const completeBox = document.getElementById("complete");

  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  const priorities = ["high", "moderate", "low"];
  listContainer.innerHTML = "";
  if (activeBox.checked) {
    priorities.forEach((priority) => {
      tasks.forEach((task, index) => {
        if (task.priority == priority && !task.completed) {
          const taskElement = createTaskElement(task, index);
          listContainer.appendChild(taskElement);
        }
      });
    });
  }
  if (completeBox.checked) {
    priorities.forEach((priority) => {
      tasks.forEach((task, index) => {
        if (task.priority == priority && task.completed) {
          const taskElement = createTaskElement(task, index);
          listContainer.appendChild(taskElement);
        }
      });
    });
  }
}
