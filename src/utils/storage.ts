import type {Todo} from "../types/todo";

const STORAGE_KEY = "todos_app"

export function saveTodos(todos: Todo[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function loadTodos(): Todo[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}