import { initialTodos } from "./data/initialTodos";
import { renderTodos } from "./utils/render";
import { saveTodos, loadTodos } from "./utils/storage";
import type { Todo } from "./types/todo";

const input = document.getElementById("todoInput") as HTMLInputElement;
const button = document.getElementById("addBtn") as HTMLButtonElement;
const list = document.getElementById("todoList") as HTMLUListElement;

let todos: Todo[] = loadTodos();

if (todos.length === 0) {
  todos = initialTodos;
  saveTodos(todos);
}

renderTodos(todos, list);

// Добавление задачи
button.addEventListener("click", addTodo);
input.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    addTodo();
  }
});

function addTodo(): void {
  const text = input.value.trim();
  if (!text) return;

  const newTodo: Todo = {
    id: Date.now(),
    text,
    completed: false
  };

  todos.push(newTodo);
  saveTodos(todos);
  renderTodos(todos, list);

  input.value = "";
}

// Делегирование событий
list.addEventListener("click", e => {
  const target = e.target as HTMLElement;
  const button = target.closest("button");

  if (!button) return;

  const id = Number(button.dataset.id);

  if (button.classList.contains("toggle-btn")) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  if (button.classList.contains("delete-btn")) {
    todos = todos.filter(t => t.id !== id);
  }

  saveTodos(todos);
  renderTodos(todos, list);
});
