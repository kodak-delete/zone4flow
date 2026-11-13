// ============================================================================
// Zone4Flow - Kanban Board View (Columns by Status)
// ============================================================================

import React from 'react';
import { useTasks } from '../../context/TaskContext';
import TaskCard from './TaskCard';

export default function TaskBoardView({ onEditTask, onDeleteTask }) {
  const { filteredTasks } = useTasks();

  const columns = [
    {
      id: 'pending',
      title: 'Pendiente',
      indicatorColor: 'var(--status-pending)'
    },
    {
      id: 'in-progress',
      title: 'En Progreso',
      indicatorColor: 'var(--status-progress)'
    },
    {
      id: 'completed',
      title: 'Completada',
      indicatorColor: 'var(--status-completed)'
    }
  ];

  return (
    <div className="kanban-board">
      {columns.map((col) => {
        const columnTasks = filteredTasks.filter((t) => t.status === col.id);

        return (
          <section key={col.id} className="kanban-column" aria-label={`Columna ${col.title}`}>
            <header className="column-header">
              <div className="column-title">
                <span 
                  className="column-indicator" 
                  style={{ backgroundColor: col.indicatorColor }} 
                />
                <span>{col.title}</span>
              </div>
              <span className="column-count">{columnTasks.length}</span>
            </header>

            <div className="column-tasks-container">
              {columnTasks.length > 0 ? (
                columnTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={onEditTask}
                    onDelete={onDeleteTask}
                  />
                ))
              ) : (
                <div 
                  style={{
                    padding: '2rem 1rem',
                    textAlign: 'center',
                    color: 'var(--text-dim)',
                    fontSize: '0.85rem',
                    border: '1px dashed rgba(255, 255, 255, 0.08)',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  Sin tareas en este estado
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
