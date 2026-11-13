// ============================================================================
// Zone4Flow - Metrics & KPI Dashboard Overview
// ============================================================================

import React from 'react';
import { useTasks } from '../../context/TaskContext';
import { ClockIcon, PlayCircleIcon, CheckCircleIcon, SparklesIcon } from '../common/Icons';

export default function StatsOverview() {
  const { stats } = useTasks();

  return (
    <div className="stats-grid">
      {/* Total Tareas */}
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-title">Total Tareas</span>
          <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
            <SparklesIcon size={18} />
          </div>
        </div>
        <div className="stat-value">{stats.total}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {stats.completionRate}% completado en total
        </div>
        <div className="stat-progress-bar">
          <div 
            className="stat-progress-fill" 
            style={{ 
              width: `${stats.completionRate}%`, 
              background: 'linear-gradient(90deg, #6366f1, #10b981)' 
            }} 
          />
        </div>
      </div>

      {/* Pendientes */}
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-title">Pendientes</span>
          <div className="stat-icon" style={{ background: 'var(--status-pending-bg)', color: 'var(--status-pending)' }}>
            <ClockIcon size={18} />
          </div>
        </div>
        <div className="stat-value">{stats.pending}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Por iniciar o en espera
        </div>
        <div className="stat-progress-bar">
          <div 
            className="stat-progress-fill" 
            style={{ 
              width: stats.total > 0 ? `${(stats.pending / stats.total) * 100}%` : '0%', 
              background: 'var(--status-pending)' 
            }} 
          />
        </div>
      </div>

      {/* En Progreso */}
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-title">En Progreso</span>
          <div className="stat-icon" style={{ background: 'var(--status-progress-bg)', color: 'var(--status-progress)' }}>
            <PlayCircleIcon size={18} />
          </div>
        </div>
        <div className="stat-value">{stats.inProgress}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          En desarrollo activo
        </div>
        <div className="stat-progress-bar">
          <div 
            className="stat-progress-fill" 
            style={{ 
              width: stats.total > 0 ? `${(stats.inProgress / stats.total) * 100}%` : '0%', 
              background: 'var(--status-progress)' 
            }} 
          />
        </div>
      </div>

      {/* Completadas */}
      <div className="stat-card">
        <div className="stat-card-header">
          <span className="stat-title">Completadas</span>
          <div className="stat-icon" style={{ background: 'var(--status-completed-bg)', color: 'var(--status-completed)' }}>
            <CheckCircleIcon size={18} />
          </div>
        </div>
        <div className="stat-value">{stats.completed}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Finalizadas exitosamente
        </div>
        <div className="stat-progress-bar">
          <div 
            className="stat-progress-fill" 
            style={{ 
              width: stats.total > 0 ? `${(stats.completed / stats.total) * 100}%` : '0%', 
              background: 'var(--status-completed)' 
            }} 
          />
        </div>
      </div>
    </div>
  );
}
