// ============================================================================
// Zone4Flow - Starter / Demo Data
// ============================================================================

export function getInitialDemoTasks() {
  const today = new Date();
  
  const addDays = (days) => {
    const d = new Date(today);
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
  };

  return [
    {
      id: 'demo-task-1',
      title: 'Investigar arquitectura de componentes en React',
      description: 'Revisar la guía oficial de React Learn y documentar las mejores prácticas para estructurar componentes funcionales y Hooks.',
      priority: 'alta',
      status: 'completed',
      dueDate: addDays(-2),
      category: 'Estudio',
      createdAt: new Date().toISOString()
    },
    {
      id: 'demo-task-2',
      title: 'Implementar autenticación y gestión de estado con Context API',
      description: 'Crear AuthContext y TaskContext para desacoplar la lógica de autenticación y permitir el aislamiento de datos por usuario.',
      priority: 'alta',
      status: 'in-progress',
      dueDate: addDays(1),
      category: 'Desarrollo',
      createdAt: new Date().toISOString()
    },
    {
      id: 'demo-task-3',
      title: 'Diseñar interfaz visual de Zone4Flow',
      description: 'Definir el sistema de colores, modo oscuro con acentos violeta y azul, y diseñar componentes Kanban y tarjetas accesibles.',
      priority: 'media',
      status: 'completed',
      dueDate: addDays(-1),
      category: 'Diseño',
      createdAt: new Date().toISOString()
    },
    {
      id: 'demo-task-4',
      title: 'Desarrollar módulo de búsqueda y filtros avanzados',
      description: 'Permitir filtrar las tareas por estado (pendiente, en progreso, completada), prioridad (alta, media, baja) y búsqueda por texto en tiempo real.',
      priority: 'media',
      status: 'in-progress',
      dueDate: addDays(2),
      category: 'Desarrollo',
      createdAt: new Date().toISOString()
    },
    {
      id: 'demo-task-5',
      title: 'Preparar informe final del caso de estudio grupal',
      description: 'Redactar las conclusiones sobre la selección de React frente a Angular y Vue, documentando la modularidad del código y los beneficios arquitectónicos.',
      priority: 'alta',
      status: 'pending',
      dueDate: addDays(4),
      category: 'Documentación',
      createdAt: new Date().toISOString()
    },
    {
      id: 'demo-task-6',
      title: 'Optimizar responsive design para dispositivos móviles',
      description: 'Comprobar la adaptación del tablero kanban y el menú de navegación en pantallas pequeñas mediante media queries.',
      priority: 'baja',
      status: 'pending',
      dueDate: addDays(5),
      category: 'Optimización',
      createdAt: new Date().toISOString()
    }
  ];
}
