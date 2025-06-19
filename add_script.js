function addTask() {
  const task = document.getElementById("floatingInput").value;
  if (task.trim()) {
    const priorityInputs = document.getElementsByName("priority");
    let selectedPriority = "";
    for (let input of priorityInputs) {
      if (input.checked) {
        selectedPriority = input.value;
        break;
      }
    }

    const effortInputs = document.getElementsByName("effort");
    let selectedEffort = "";
    for (let input of effortInputs) {
      if (input.checked) {
        selectedEffort = input.value;
        break;
      }
    }

    const taskData = {
      text: task,
      priority: selectedPriority || "low",
      effort: selectedEffort || "medium",
    };

    const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    existingTasks.push(taskData);

    localStorage.setItem("tasks", JSON.stringify(existingTasks));
    window.location.href = "./index.html";
  }
}

function toggleDropdown() {
  const dropdown = document.getElementById("myDropdown");
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
}
