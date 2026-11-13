// ============================================================================
// Zone4Flow - Search, Filter, Sort & View Mode Toolbar
// ============================================================================

import React from 'react';
import { useTasks } from '../../context/TaskContext';
import { SearchIcon, XIcon, KanbanIcon, ListIcon, FilterIcon, ArrowUpDownIcon } from '../common/Icons';

export default function TaskFilterBar() {
  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    clearFilters
  } = useTasks();

  const isFilteringActive =
    searchQuery.trim() !== '' ||
    statusFilter !== 'all' ||
    priorityFilter !== 'all' ||
    sortBy !== 'dueDate-asc';

  return (
    <div className="toolbar-section">
      <div className="toolbar-header">
        <div className="toolbar-title">
          <h2>
            <FilterIcon size={20} style={{ color: '#818cf8' }} />
            Explorador de Tareas
          </h2>
        </div>

        {/* View Mode Switcher */}
        <div className="view-toggle">
          <button
            type="button"
            className={`view-toggle-btn ${viewMode === 'board' ? 'active' : ''}`}
            onClick={() => setViewMode('board')}
            title="Vista de Tablero (Kanban)"
          >
            <KanbanIcon size={16} />
            <span>Tablero</span>
          </button>
          <button
            type="button"
            className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            title="Vista de Lista"
          >
            <ListIcon size={16} />
            <span>Lista</span>
          </button>
        </div>
      </div>

      <div className="toolbar-controls">
        {/* Search Input */}
        <div className="search-box">
          <span className="search-icon-wrapper">
            <SearchIcon size={18} />
          </span>
          <input
            type="text"
            placeholder="Buscar por título, descripción o categoría..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchQuery('')}
              title="Borrar búsqueda"
            >
              <XIcon size={16} />
            </button>
          )}
        </div>

        {/* Filter by Status */}
        <div className="filter-group">
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filtrar por estado"
          >
            <option value="all">Todos los Estados</option>
            <option value="pending">⏳ Pendiente</option>
            <option value="in-progress">⚡ En Progreso</option>
            <option value="completed">✅ Completada</option>
          </select>

          {/* Filter by Priority */}
          <select
            className="filter-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            aria-label="Filtrar por prioridad"
          >
            <option value="all">Todas las Prioridades</option>
            <option value="alta">🔴 Alta Prioridad</option>
            <option value="media">🟡 Media Prioridad</option>
            <option value="baja">🟢 Baja Prioridad</option>
          </select>

          {/* Sorting */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ color: 'var(--text-dim)', display: 'flex', alignItems: 'center' }}>
              <ArrowUpDownIcon size={16} />
            </span>
            <select
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Ordenar tareas"
            >
              <option value="dueDate-asc">Fecha: más próxima</option>
              <option value="dueDate-desc">Fecha: más lejana</option>
              <option value="priority-desc">Mayor prioridad</option>
              <option value="title-asc">Título (A - Z)</option>
            </select>
          </div>

          {/* Reset Filters Button */}
          {isFilteringActive && (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={clearFilters}
              style={{ fontSize: '0.82rem', padding: '0.55rem 0.85rem' }}
            >
              <XIcon size={14} />
              Limpiar Filtros
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
