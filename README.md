Zone4Flow 

Proyecto grupal para la clase de herramientas de sotware.

INTEGRANTES:

Juan Andres Romer Celis
Luis Alfredo Munar Montoya
Brayan Andres Vargas Soache

FUNCIONALIDAD
1. Registro y Autenticación de Usuarios:
   - Registro con validación de nombre, formato de email y longitud de contraseña.
   - Inicio de sesión seguro con mensajes de error contextuales.
   - **Acceso rápido con Usuario Demo** con un solo clic.
   - **Aislamiento multiusuario**: Cada usuario registrado posee sus propias tareas independientes almacenadas en su espacio de almacenamiento (`localStorage`).
   - Cierre de sesión y persistencia de sesión activa.

2. Creación de Tareas:
   - Formulario modal accesible con validación de campos obligatorios.
   - Parámetros: Título, Descripción detallada, Fecha de vencimiento, Nivel de Prioridad (`Alta`, `Media`, `Baja`) y Categoría (`Frontend`, `Estudio`, `Diseño`, etc.).

3. Visualización de Tareas:
   - Vista Tablero Kanban** organizada en 3 columnas: Pendiente, En Progreso y Completada.
   - Vista de Lista Compacta** con selector interactivo en la barra de herramientas.
   - Indicador visual de contador por cada estado.
   - Dashboard de métricas con porcentaje de progreso global y barras de avance.

4. Edición y Eliminación de Tareas:
   - Modal de edición completo para actualizar cualquiera de los atributos de la tarea.
   - Diálogo de confirmación modal para prevenir eliminaciones accidentales.

5. Marcar Tareas como Completadas:
   - Checkbox interactivo en cada tarjeta con animación de completado y tachado estilizado.
   - Selector rápido para mover tareas fluidamente entre cualquier estado.

6. Búsqueda y Filtrado en Tiempo Real:
   - Barra de búsqueda reactiva por título, descripción y categoría.
   - Filtro desplegable por estado (`Todas`, `Pendiente`, `En Progreso`, `Completada`).
   - Filtro por nivel de prioridad (`Alta`, `Media`, `Baja`).
   - Ordenamiento por: Fecha más próxima, Fecha más lejana, Mayor prioridad o Alfabético (A-Z).
   - Botón para restablecer filtros al estado original.



