// ============================================================================
// Zone4Flow - Task Card Component
// ============================================================================

import React from 'react';
import { useTasks } from '../../context/TaskContext';
import { formatDate, isOverdue, isDueToday } from '../../utils/dateUtils';
import {
  CheckIcon,
  CalendarIcon,
  AlertTriangleIcon,
  EditIcon,
  TrashIcon,
  TagIcon
} from '../common/Icons';

export default function TaskCard({ task, onEdit, onDelete }) {
  const { toggleTaskComplete, updateTaskStatus } = useTasks();

  const isCompleted = task.status === 'completed';
  const overdue = isOverdue(task.dueDate, task.status);
  const dueToday = isDueToday(task.dueDate) && !isCompleted;

  const priorityLabels = {
    alta: 'Alta',
    media: 'Media',
    baja: 'Baja'
  };

  const statusLabels = {
    pending: 'Pendiente',
    'in-progress': 'En Progreso',
    completed: 'Completada'
  };

  const handleStatusChange = (e) => {
    updateTaskStatus(task.id, e.target.value);
  };

  return (
    <article className={`task-card animate-fade-in ${isCompleted ? 'is-completed' : ''}`}>
      <div className="task-card-top">
        {/* Toggle complete checkbox */}
        <div className="task-checkbox-container">
          <button
            type="button"
            className={`custom-checkbox ${isCompleted ? 'checked' : ''}`}
            onClick={() => toggleTaskComplete(task.id)}
            aria-label={isCompleted ? 'Marcar como pendiente' : 'Marcar como completada'}
            title={isCompleted ? 'Reabrir tarea' : 'Completar tarea'}
          >
            {isCompleted && <CheckIcon size={13} />}
          </button>
        </div>

        {/* Title & Priority Badge */}
        <div className="task-title-area">
          <h3 className="task-title">{task.title}</h3>
        </div>

        {/* Priority Badge */}
        <span className={`badge badge-priority-${task.priority}`}>
          {priorityLabels[task.priority] || task.priority}
        </span>
      </div>

      {/* Task Description */}
      {task.description && (
        <p className="task-desc">{task.description}</p>
      )}

      {/* Meta info & actions footer */}
      <div className="task-meta">
        <div className="task-tags">
          {/* Due date badge */}
          {task.dueDate && (
            <div 
              className={`task-due-date ${overdue ? 'is-overdue' : ''} ${dueToday ? 'is-today' : ''}`}
              title={overdue ? '¡Tarea vencida!' : dueToday ? 'Vence hoy' : 'Fecha límite'}
            >
              {overdue ? <AlertTriangleIcon size={13} /> : <CalendarIcon size={13} />}
              <span>{formatDate(task.dueDate)}</span>
              {overdue && <span style={{ fontSize: '0.7rem' }}>(Vencida)</span>}
              {dueToday && <span style={{ fontSize: '0.7rem' }}>(Hoy)</span>}
            </div>
          )}

          {/* Category tag */}
          {task.category && (
            <span 
              style={{
                fontSize: '0.72rem',
                color: 'var(--text-dim)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                background: 'rgba(255, 255, 255, 0.04)',
                padding: '0.15rem 0.5rem',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <TagIcon size={11} />
              {task.category}
            </span>
          )}
        </div>

        {/* Actions & Status Selector */}
        <div className="task-actions">
          {/* Quick status mover */}
          <select
            className="status-shift-select"
            value={task.status}
            onChange={handleStatusChange}
            aria-label="Cambiar estado de la tarea"
            title="Cambiar estado"
          >
            <option value="pending">⏳ Pendiente</option>
            <option value="in-progress">⚡ En Progreso</option>
            <option value="completed">✅ Completada</option>
          </select>

          {/* Edit Button */}
          <button
            type="button"
            className="task-action-btn"
            onClick={() => onEdit(task)}
            title="Editar contenido de la tarea"
            aria-label="Editar tarea"
          >
            <EditIcon size={15} />
          </button>

          {/* Delete Button */}
          <button
            type="button"
            className="task-action-btn delete"
            onClick={() => onDelete(task)}
            title="Eliminar tarea"
            aria-label="Eliminar tarea"
          >
            <TrashIcon size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}
