import Header from '@/components/Header';
import AddTodo from '@/components/AddTodo';
import TodoList from '@/components/TodoList';
import Footer from '@/components/Footer';
import { useTodos } from '@/hooks/useTodos';
import styles from './TodoPage.module.css';

export default function TodoPage() {
  const todoState = useTodos();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Header />
        <div className={styles.card}>
          <AddTodo onAdd={todoState.addTodo} onToggleAll={todoState.toggleAll} hasItems={todoState.todos.length > 0} />
          {todoState.todos.length > 0 && (
            <>
              <TodoList
                todos={todoState.filtered}
                onToggle={todoState.toggleTodo}
                onDelete={todoState.deleteTodo}
                onEdit={todoState.editTodo}
              />
              <Footer
                activeCount={todoState.activeCount}
                completedCount={todoState.completedCount}
                filter={todoState.filter}
                onFilterChange={todoState.setFilter}
                onClearCompleted={todoState.clearCompleted}
              />
            </>
          )}
          {todoState.todos.length === 0 && (
            <div className={styles.empty}>
              <span>No todos yet. Add one above!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
