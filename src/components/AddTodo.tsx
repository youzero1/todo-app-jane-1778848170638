import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import styles from './AddTodo.module.css';

type AddTodoProps = {
  onAdd: (text: string) => void;
  onToggleAll: () => void;
  hasItems: boolean;
};

export default function AddTodo({ onAdd, onToggleAll, hasItems }: AddTodoProps) {
  const [value, setValue] = useState('');

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      onAdd(value);
      setValue('');
    }
  }

  return (
    <div className={styles.wrapper}>
      {hasItems && (
        <button
          className={styles.toggleAll}
          onClick={onToggleAll}
          aria-label="Toggle all todos"
        >
          <ChevronDown size={20} />
        </button>
      )}
      <input
        className={clsx(styles.input, hasItems && styles.inputWithToggle)}
        type="text"
        placeholder="What needs to be done?"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    </div>
  );
}
