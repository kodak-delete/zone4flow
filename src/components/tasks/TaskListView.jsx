// ============================================================================
// Zone4Flow - Compact List View
// ============================================================================

import React from 'react';
import { useTasks } from '../../context/TaskContext';
import TaskCard from './TaskCard';

export default function TaskListView({ onEditTask, onDeleteTask }) {
  const { filteredTasks } = useTasks();

  return (
    <div className="task-list-view">
      {filteredTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
}
