import { useState, useEffect } from 'react';
import { Todo, FilterType } from '@/types';

function loadFromStorage(): Todo[] {
  try {
    const raw = localStorage.getItem('todos');
    if (raw) return JSON.parse(raw) as Todo[];
  } catch {
    // ignore
  }
  return [];
}

function saveToStorage(todos: Todo[]): void {
  localStorage.setItem('todos', JSON.stringify(todos));
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadFromStorage);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    saveToStorage(todos);
  }, [todos]);

  function addTodo(text: string): void {
    if (!text.trim()) return;
    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: text.trim(), completed: false, createdAt: Date.now() },
    ]);
  }

  function toggleTodo(id: string): void {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTodo(id: string): void {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function editTodo(id: string, text: string): void {
    if (!text.trim()) return;
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: text.trim() } : t))
    );
  }

  function clearCompleted(): void {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }

  function toggleAll(): void {
    const allCompleted = todos.every((t) => t.completed);
    setTodos((prev) => prev.map((t) => ({ ...t, completed: !allCompleted })));
  }

  const filtered = todos.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return {
    todos,
    filtered,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    toggleAll,
    activeCount,
    completedCount,
  };
}
