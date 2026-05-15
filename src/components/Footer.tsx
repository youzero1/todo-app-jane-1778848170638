import clsx from 'clsx';
import { FilterType } from '@/types';
import styles from './Footer.module.css';

type FooterProps = {
  activeCount: number;
  completedCount: number;
  filter: FilterType;
  onFilterChange: (f: FilterType) => void;
  onClearCompleted: () => void;
};

export default function Footer({
  activeCount,
  completedCount,
  filter,
  onFilterChange,
  onClearCompleted,
}: FooterProps) {
  const filters: FilterType[] = ['all', 'active', 'completed'];

  return (
    <div className={styles.footer}>
      <span className={styles.count}>
        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
      </span>
      <div className={styles.filters}>
        {filters.map((f) => (
          <button
            key={f}
            className={clsx(styles.filterBtn, filter === f && styles.active)}
            onClick={() => onFilterChange(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      {completedCount > 0 && (
        <button className={styles.clearBtn} onClick={onClearCompleted}>
          Clear completed
        </button>
      )}
    </div>
  );
}
