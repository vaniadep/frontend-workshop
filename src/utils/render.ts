import type { Todo } from "../types/todo";

export function renderTodos(
  todos: Todo[],
  listElement: HTMLUListElement,
  onToggle: (id: number) => void,
  onDelete: (id: number) => void
): void {
  listElement.innerHTML = "";

  if (todos.length === 0) {
    const emptyContainer = document.createElement("div");
    emptyContainer.className = "empty-state";

    emptyContainer.innerHTML = `
      <i class="fas fa-list-ul fa-3x"></i>
      <h3>Список задач пуст</h3>
      <p>Добавьте свою первую задачу с помощью поля выше</p>
    `;

    listElement.appendChild(emptyContainer);
    return;
  }

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo-item";
    if (todo.completed) li.classList.add("completed");

    const label = document.createElement("label");
    label.className = "todo-checkbox-label";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.className = "todo-checkbox";
    checkbox.id = `todo-${todo.id}`;

    const customCheckmark = document.createElement("span");
    customCheckmark.className = "checkmark";

    label.appendChild(checkbox);
    label.appendChild(customCheckmark);

    const textDiv = document.createElement("div");
    textDiv.className = "todo-text";
    textDiv.textContent = todo.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteBtn.setAttribute("aria-label", "Удалить задачу");

    li.appendChild(label);
    li.appendChild(textDiv);
    li.appendChild(deleteBtn);

    listElement.appendChild(li);
  });
}