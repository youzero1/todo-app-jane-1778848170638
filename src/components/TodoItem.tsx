import { useState, useRef, useEffect } from 'react';
import { Trash2, Check } from 'lucide-react';
import clsx from 'clsx';
import { Todo } from '@/types';
import styles from './TodoItem.module.css';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  function handleDoubleClick() {
    setEditing(true);
    setEditValue(todo.text);
  }

  function handleEditKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      commitEdit();
    } else if (e.key === 'Escape') {
      setEditing(false);
      setEditValue(todo.text);
    }
  }

  function commitEdit() {
    if (editValue.trim()) {
      onEdit(todo.id, editValue);
    }
    setEditing(false);
  }

  return (
    <li className={clsx(styles.item, todo.completed && styles.completed, editing && styles.editing)}>
      {editing ? (
        <input
          ref={inputRef}
          className={styles.editInput}
          value={editValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditValue(e.target.value)}
          onKeyDown={handleEditKeyDown}
          onBlur={commitEdit}
        />
      ) : (
        <>
          <button
            className={clsx(styles.checkbox, todo.completed && styles.checkboxChecked)}
            onClick={() => onToggle(todo.id)}
            aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {todo.completed && <Check size={14} strokeWidth={3} />}
          </button>
          <span
            className={styles.text}
            onDoubleClick={handleDoubleClick}
            title="Double-click to edit"
          >
            {todo.text}
          </span>
          <button
            className={styles.deleteBtn}
            onClick={() => onDelete(todo.id)}
            aria-label="Delete todo"
          >
            <Trash2 size={16} />
          </button>
        </>
      )}
    </li>
  );
}
