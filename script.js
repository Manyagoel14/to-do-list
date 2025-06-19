const listContainer = document.getElementById("list-group");

function createTaskElement(taskData, index) {
    const container = document.createElement("div");
    container.className = "list-group-item d-flex justify-content-between align-items-center gap-3 mb-2";

    // Set background color based on priority
    const priorityColors = {
        low: "#808cfd",
        moderate: "#ffd700",
        high: "#ff6b6b"
    };
    const diamondColor = priorityColors[taskData.priority] || '#808cfd';

    // Effort level indicators
    const effortDiamonds = {
        easy: `<i class="bi bi-diamond-fill ps-2" style="color: ${diamondColor}"></i>
               <i class="bi bi-diamond" style="color: ${diamondColor}"></i>
               <i class="bi bi-diamond" style="color: ${diamondColor}"></i>`,

        medium: `<i class="bi bi-diamond-fill ps-2" style="color: ${diamondColor}"></i>
                 <i class="bi bi-diamond-fill" style="color: ${diamondColor}"></i>
                 <i class="bi bi-diamond" style="color: ${diamondColor}"></i>`,

        hard: `<i class="bi bi-diamond-fill ps-2" style="color: ${diamondColor}"></i>
               <i class="bi bi-diamond-fill" style="color: ${diamondColor}"></i>
               <i class="bi bi-diamond-fill" style="color: ${diamondColor}"></i>`
    };

    if (taskData.completed) {
        container.classList.add("completed");
        container.style.opacity = "0.4";
    }

    // HTML inside container
    container.innerHTML = `
        <div class="col-3 d-flex gap-3 align-items-center">
            <input class="form-check-input flex-shrink-0" type="checkbox"
                ${taskData.completed ? "checked" : ""}
                style="font-size: 1.375em;"
                onchange="toggleTask(${index})">
            <span class="form-checked-content pt-1">${taskData.text[0].toUpperCase()+taskData.text.slice(1).toLowerCase()}
            </span>
        </div>
        <div class="col-4">
            <small class="text-body-secondary">
                ${effortDiamonds[taskData.effort] || effortDiamonds.medium}
            </small>
        </div>
        <div class="d-flex gap-3 align-items-end">
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
    newText=prompt("Enter new task name");
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

    const priorities = ["high", "moderate", "low"];
    priorities.forEach(priority => {
        tasks.forEach((task, index) => {
            if (task.priority === priority) {
                const taskElement = createTaskElement(task, index);
                listContainer.appendChild(taskElement);
            }
        });
    });
}

function initSampleTasks() {
    // Only initialize if there are no tasks
    if (!localStorage.getItem("tasks")) {
        const sampleTasks = [
            {
                text: "Complete project proposal",
                priority: "high",
                effort: "medium",
                completed: false
            },
            {
                text: "Review pull requests",
                priority: "moderate",
                effort: "easy",
                completed: false
            }
        ];
        localStorage.setItem("tasks", JSON.stringify(sampleTasks));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initSampleTasks();
    loadTasks();
});

function toggleDropdown() {
    const dropdown = document.getElementById("myDropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
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
    if (activeBox.checked){
        priorities.forEach(priority => {
            tasks.forEach((task, index) => {
                if (task.priority==priority && !task.completed) {
                    const taskElement = createTaskElement(task, index);
                    listContainer.appendChild(taskElement);
                }
            });
        });
    }
    if (completeBox.checked){
        priorities.forEach(priority => {
            tasks.forEach((task, index) => {
                if (task.priority==priority && task.completed) {
                    const taskElement = createTaskElement(task, index);
                    listContainer.appendChild(taskElement);
                }
            });
        });
    }
}
