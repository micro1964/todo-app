const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

let todos = [];

// Get all todos
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// Add a todo
app.post("/api/todos", (req, res) => {
  const todo = {
    id: Date.now(),
    text: req.body.text
  };
  todos.push(todo);
  res.json(todo);
});

// Delete a todo
app.delete("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  res.json({ message: "Todo deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
