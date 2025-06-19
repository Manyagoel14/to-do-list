function addTask() {
    const task = document.getElementById("floatingInput").value;
    if (task.trim()) {
        // Get selected priority
        const priorityInputs = document.getElementsByName("priority");
        let selectedPriority = "";
        for (let input of priorityInputs) {
            if (input.checked) {
                selectedPriority = input.value;
                break;
            }
        }

        // Get selected effort level
        const effortInputs = document.getElementsByName("effort");
        let selectedEffort = "";
        for (let input of effortInputs) {
            if (input.checked) {
                selectedEffort = input.value;
                break;
            }
        }

        // Create task object with all information
        const taskData = {
            text: task,
            priority: selectedPriority || "low", // default to low if none selected
            effort: selectedEffort || "medium"
        };

        // Get existing tasks or initialize empty array
        const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        
        // Add new task to array
        existingTasks.push(taskData);
        
        // Save updated array back to localStorage
        localStorage.setItem("tasks", JSON.stringify(existingTasks));
        window.location.href = "./index.html";
    }
}

function toggleDropdown() {
  const dropdown = document.getElementById("myDropdown");
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}