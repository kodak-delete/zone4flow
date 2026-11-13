// ============================================================================
// Zone4Flow - Empty State Display Component
// ============================================================================

import React from 'react';
import { useTasks } from '../../context/TaskContext';
import { SparklesIcon, PlusIcon, XIcon } from '../common/Icons';

export default function EmptyTasksState({ onOpenNewTaskModal }) {
  const { tasks, searchQuery, statusFilter, priorityFilter, clearFilters } = useTasks();

  const isFiltering =
    searchQuery.trim() !== '' || statusFilter !== 'all' || priorityFilter !== 'all';

  return (
    <div className="empty-state animate-fade-in">
      <div className="empty-icon-wrapper">
        <SparklesIcon size={32} />
      </div>

      <h3 className="empty-title">
        {isFiltering ? 'No se encontraron tareas con estos filtros' : '¡Tu lista de tareas está despejada!'}
      </h3>

      <p className="empty-desc">
        {isFiltering
          ? 'Intenta cambiar el término de búsqueda o restablecer los filtros de estado y prioridad.'
          : 'Comienza a organizar tu jornada laboral registrando tu primera tarea en Zone4Flow.'}
      </p>

      {isFiltering ? (
        <button type="button" className="btn btn-secondary" onClick={clearFilters}>
          <XIcon size={16} />
          Restablecer Filtros
        </button>
      ) : (
        <button type="button" className="btn btn-primary" onClick={onOpenNewTaskModal}>
          <PlusIcon size={18} />
          Crear Primera Tarea
        </button>
      )}
    </div>
  );
}
