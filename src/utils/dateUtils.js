// ============================================================================
// Zone4Flow - Date Helpers & Formatting Utilities
// ============================================================================

export function formatDate(dateString) {
  if (!dateString) return 'Sin fecha';
  
  // Format: 'YYYY-MM-DD'
  const parts = dateString.split('-');
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const date = new Date(year, month, day);
    
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  
  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
}

export function isOverdue(dueDateString, status) {
  if (!dueDateString || status === 'completed') return false;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const parts = dueDateString.split('-');
  if (parts.length === 3) {
    const dueDate = new Date(
      parseInt(parts[0], 10),
      parseInt(parts[1], 10) - 1,
      parseInt(parts[2], 10)
    );
    return dueDate < today;
  }

  const dueDate = new Date(dueDateString);
  return dueDate < today;
}

export function isDueToday(dueDateString) {
  if (!dueDateString) return false;
  
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  return dueDateString === todayStr;
}

export function getTodayDateInputValue() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}
