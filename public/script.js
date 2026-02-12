const API_URL = "http://localhost:3000/api/todos";

// Get all tasks
async function getTasks() {
  try {
    const response = await fetch(API_URL);
    const tasks = await response.json();

    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(task => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${task.text}
        <button id="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
      `;
      list.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    alert("Failed to load tasks");
  }
}

// Add task
async function addTask() {
  const input = document.getElementById("todoInput");
  const text = input.value;

  if (!text) {
    alert("Enter a task");
    return;
  }

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });

  input.value = "";
  getTasks();
}

// Delete task
async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  getTasks();
}

// Load tasks automatically when page opens
window.onload = getTasks;