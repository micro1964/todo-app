const API_URL = "/api/todos";

async function fetchTodos() {
  const res = await fetch(API_URL);
  const todos = await res.json();

  const list = document.getElementById("todoList");
  list.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${todo.text}
      <button onclick="deleteTodo(${todo.id})">❌</button>
    `;
    list.appendChild(li);
  });
}

async function addTodo() {
  const input = document.getElementById("todoInput");
  const text = input.value;

  if (text === "") return alert("Enter a task");

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text })
  });

  input.value = "";
  fetchTodos();
}

async function deleteTodo(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  fetchTodos();
}

// Load todos on page load
fetchTodos();
