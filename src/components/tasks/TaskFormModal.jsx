// ============================================================================
// Zone4Flow - Task Form Modal (Create & Edit)
// ============================================================================

import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { useTasks } from '../../context/TaskContext';
import { PlusIcon, EditIcon } from '../common/Icons';
import { getTodayDateInputValue } from '../../utils/dateUtils';

export default function TaskFormModal({ isOpen, onClose, taskToEdit = null }) {
  const { addTask, updateTask } = useTasks();

  const isEditing = Boolean(taskToEdit);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'media',
    status: 'pending',
    category: 'General'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title || '',
        description: taskToEdit.description || '',
        dueDate: taskToEdit.dueDate || '',
        priority: taskToEdit.priority || 'media',
        status: taskToEdit.status || 'pending',
        category: taskToEdit.category || 'General'
      });
    } else {
      setFormData({
        title: '',
        description: '',
        dueDate: getTodayDateInputValue(),
        priority: 'media',
        status: 'pending',
        category: 'General'
      });
    }
    setErrors({});
  }, [taskToEdit, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'El título de la tarea es requerido.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (isEditing) {
      updateTask(taskToEdit.id, formData);
    } else {
      addTask(formData);
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Editar Tarea' : 'Crear Nueva Tarea'}
      maxWidth="620px"
    >
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          {/* Title */}
          <div className="form-group">
            <label className="form-label" htmlFor="task-title">
              Título de la tarea <span className="form-label-required">*</span>
            </label>
            <input
              id="task-title"
              name="title"
              type="text"
              placeholder="Ej. Diseñar prototipo de la interfaz"
              value={formData.title}
              onChange={handleChange}
              autoFocus
            />
            {errors.title && <span className="form-error">{errors.title}</span>}
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label" htmlFor="task-desc">
              Descripción
            </label>
            <textarea
              id="task-desc"
              name="description"
              rows={3}
              placeholder="Detalla los pasos o notas importantes para completar esta tarea..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Priority & Status */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="task-priority">
                Prioridad
              </label>
              <select
                id="task-priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="baja">🟢 Baja</option>
                <option value="media">🟡 Media</option>
                <option value="alta">🔴 Alta</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="task-status">
                Estado Inicial
              </label>
              <select
                id="task-status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="pending">⏳ Pendiente</option>
                <option value="in-progress">⚡ En Progreso</option>
                <option value="completed">✅ Completada</option>
              </select>
            </div>
          </div>

          {/* Due Date & Category */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="task-due-date">
                Fecha de Vencimiento
              </label>
              <input
                id="task-due-date"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="task-category">
                Categoría / Etiqueta
              </label>
              <input
                id="task-category"
                name="category"
                type="text"
                placeholder="Ej. Frontend, Trabajo, Personal"
                value={formData.category}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            {isEditing ? <EditIcon size={16} /> : <PlusIcon size={16} />}
            <span>{isEditing ? 'Guardar Cambios' : 'Crear Tarea'}</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}
