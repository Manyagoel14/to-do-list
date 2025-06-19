const listContainer = document.getElementById("list-group");

function createTaskElement(taskData, index) {
    const label = document.createElement("label");
    label.className = "list-group-item d-flex gap-3";
    label.style = "background-color: #808cfd";
    label.style.opacity = "0.6"; // Make completed tasks appear faded
    
    // Set background color based on priority
    const priorityColors = {
        low: "#808cfd",
        moderate: "#ffd700",
        high: "#ff6b6b"
    };
    const diamondColor = priorityColors[taskData.priority] || '#808cfd';

    // Create effort level indicators
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

    label.innerHTML = `
        <input class="form-check-input flex-shrink-0" type="checkbox" value="" 
            checked
            style="font-size: 1.375em;"
            onchange="toggleTask(${index})">
        <span class="pt-1 form-checked-content flex-grow-1">
            <strong>${taskData.text}</strong>
            <small class="d-block text-body-secondary">
                ${effortDiamonds[taskData.effort] || effortDiamonds.medium}
                <span>${taskData.effort.charAt(0).toUpperCase() + taskData.effort.slice(1)}</span>
            </small>
        </span>
        <i class="bi bi-x-circle-fill text-danger" style="cursor: pointer; font-size: 1.2rem;" onclick="removeTask(${index})"></i>
    `;

    return label;
}

function toggleTask(index) {
    // Get current tasks
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    
    // Toggle completed status
    tasks[index].completed = !tasks[index].completed;
    
    // Save back to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    // Redirect to main page if task is uncompleted
    if (!tasks[index].completed) {
        window.location.href = "./index.html";
    } else {
        // Reload tasks to update UI
        loadTasks();
    }
}

function removeTask(index) {
    // Get current tasks
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    
    // Remove the task at the specified index
    tasks.splice(index, 1);
    
    // Save back to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    // Reload tasks to update UI
    loadTasks();
}

function loadTasks() {
    // Clear existing tasks
    listContainer.innerHTML = "";
    
    // Get tasks from localStorage
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    
    // Filter to show only completed tasks
    const completedTasks = tasks.filter(task => task.completed);
    
    if (completedTasks.length === 0) {
        const emptyMessage = document.createElement("div");
        emptyMessage.className = "text-center text-muted py-3";
        emptyMessage.textContent = "No completed tasks yet!";
        listContainer.appendChild(emptyMessage);
        return;
    }
    
    // Add each completed task to the container
    completedTasks.forEach((task, index) => {
        const taskElement = createTaskElement(task, index);
        listContainer.appendChild(taskElement);
    });
}

// Load tasks when the page loads
document.addEventListener("DOMContentLoaded", loadTasks); 