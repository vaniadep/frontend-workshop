import { initialTodos } from "../data/initialTodos";
import { renderTodos } from "../utils/render";
import { saveTodos, loadTodos } from "../utils/storage";
import type { Todo } from "../types/todo";

const todoInput = document.getElementById("todoInput") as HTMLInputElement;
const addButton = document.getElementById("addBtn") as HTMLButtonElement;
const todoListElement = document.getElementById("todoList") as HTMLUListElement;
const totalCounter = document.getElementById("totalCounter") as HTMLSpanElement;
const completedCounter = document.getElementById("completedCounter") as HTMLSpanElement;

let todos: Todo[] = loadTodos();

if (todos.length === 0) {
  todos = initialTodos;
  saveTodos(todos);
}

function updateCounters(): void {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;

  totalCounter.textContent = total.toString();
  completedCounter.textContent = completed.toString();
}

function toggleTodo(id: number): void {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  saveTodos(todos);
  renderApp();
}

function deleteTodo(id: number): void {
  if (!confirm("Удалить задачу?")) return;

  todos = todos.filter(todo => todo.id !== id);
  saveTodos(todos);
  renderApp();
}

function addTodo(): void {
  const text = todoInput.value.trim();
  if (!text) return;

  const newTodo: Todo = {
    id: Date.now(),
    text,
    completed: false,
  };

  todos.push(newTodo);
  saveTodos(todos);
  renderApp();

  todoInput.value = "";
  todoInput.focus();
}

function renderApp(): void {
  renderTodos(todos, todoListElement, toggleTodo, deleteTodo);
  updateCounters();
}

renderApp();

addButton.addEventListener("click", addTodo);

todoInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    addTodo();
  }
});