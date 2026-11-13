# Zone4Flow ⚡

> **Aplicación Web de Gestión Inteligente y Eficiente de Tareas Diarias**  
> Desarrollada con **React (Vite)**, Arquitectura Modular por Componentes y Persistencia Local.

---

## 🎯 Selección y Justificación del Framework: React vs. Angular vs. Vue

Tras el análisis comparativo de los tres frameworks líderes:

| Criterio | React (Seleccionado) | Angular | Vue.js |
| :--- | :--- | :--- | :--- |
| **Arquitectura** | Basada en componentes desacoplados y composición funcional (Hooks). | Framework monolítico y estructurado con TypeScript e inyección de dependencias. | Progresivo con SFC (Single File Components) y Reactivity API. |
| **Curva de Aprendizaje** | Rápida y flexible; se centra en la lógica de UI y estado declarativo. | Más pronunciada debido a conceptos de RxJS, decoradores y módulos NgModules. | Intermedia, amigable pero con sintaxis propia en templates. |
| **Modularidad** | Máxima separación de responsabilidades (Context, Custom Hooks, Componentes atómicos). | Alta, pero con mayor sobrecarga de boilerplate para aplicaciones ágiles. | Buena modularidad, aunque propensa a acoplar script/template/style. |
| **Ecosistema y Demanda** | El estándar más adoptado globalmente en la industria y entornos profesionales. | Amplio en entornos corporativos legados. | Popular en proyectos medianos y comunidad open-source. |

**Conclusión:** Se eligió **React** por su ligereza, su modelo de estado predecible mediante **Context API y Custom Hooks**, y su facilidad para desacoplar vistas, servicios de almacenamiento y componentes reutilizables sin sobrecarga innecesaria.

---

## 🚀 Funcionalidades Implementadas

1. **Registro y Autenticación de Usuarios**:
   - Registro con validación de nombre, formato de email y longitud de contraseña.
   - Inicio de sesión seguro con mensajes de error contextuales.
   - **Acceso rápido con Usuario Demo** con un solo clic.
   - **Aislamiento multiusuario**: Cada usuario registrado posee sus propias tareas independientes almacenadas en su espacio de almacenamiento (`localStorage`).
   - Cierre de sesión y persistencia de sesión activa.

2. **Creación de Tareas**:
   - Formulario modal accesible con validación de campos obligatorios.
   - Parámetros: Título, Descripción detallada, Fecha de vencimiento, Nivel de Prioridad (`Alta`, `Media`, `Baja`) y Categoría (`Frontend`, `Estudio`, `Diseño`, etc.).

3. **Visualización de Tareas**:
   - **Vista Tablero Kanban** organizada en 3 columnas: **Pendiente**, **En Progreso** y **Completada**.
   - **Vista de Lista Compacta** con selector interactivo en la barra de herramientas.
   - Indicador visual de contador por cada estado.
   - Dashboard de métricas con porcentaje de progreso global y barras de avance.

4. **Edición y Eliminación de Tareas**:
   - Modal de edición completo para actualizar cualquiera de los atributos de la tarea.
   - Diálogo de confirmación modal para prevenir eliminaciones accidentales.

5. **Marcar Tareas como Completadas**:
   - Checkbox interactivo en cada tarjeta con animación de completado y tachado estilizado.
   - Selector rápido para mover tareas fluidamente entre cualquier estado.

6. **Búsqueda y Filtrado en Tiempo Real**:
   - Barra de búsqueda reactiva por título, descripción y categoría.
   - Filtro desplegable por estado (`Todas`, `Pendiente`, `En Progreso`, `Completada`).
   - Filtro por nivel de prioridad (`Alta`, `Media`, `Baja`).
   - Ordenamiento por: Fecha más próxima, Fecha más lejana, Mayor prioridad o Alfabético (A-Z).
   - Botón para restablecer filtros al estado original.

---

## 📂 Arquitectura de Archivos Modulares

```text
zone4flow/
├── index.html                           # Estructura HTML base y tipografía
├── vite.config.js                       # Configuración de compilación Vite
├── package.json                         # Dependencias y scripts
├── README.md                            # Documentación y justificación técnica
└── src/
    ├── main.jsx                         # Punto de entrada de React 19
    ├── App.jsx                          # Orquestador principal y guardia de autenticación
    ├── index.css                        # Design System, variables CSS, temas y animaciones
    ├── App.css                          # Estilos específicos de componentes y layout responsivo
    │
    ├── context/
    │   ├── AuthContext.jsx              # Estado global de usuario, login, registro y sesiones
    │   └── TaskContext.jsx              # Estado global de tareas, filtros, CRUD y estadísticas
    │
    ├── utils/
    │   ├── storage.js                   # Servicio de persistencia y aislamiento por usuario
    │   ├── dateUtils.js                 # Utilidades de fechas (vencimientos, formateo en español)
    │   └── sampleData.js                # Tareas de demostración preconfiguradas
    │
    └── components/
        ├── common/
        │   ├── Icons.jsx                # Iconografía SVG nativa y modular
        │   ├── Modal.jsx                # Modal accesible reutilizable con tecla Esc y Backdrop
        │   ├── ConfirmDialog.jsx        # Diálogo modal de confirmación para eliminar
        │   └── Toast.jsx                # Notificaciones flotantes temporizadas
        │
        ├── auth/
        │   ├── AuthPage.jsx             # Pantalla contenedora de autenticación
        │   ├── LoginForm.jsx            # Formulario de inicio de sesión y botón demo
        │   └── RegisterForm.jsx         # Formulario de registro con validaciones
        │
        ├── layout/
        │   ├── Navbar.jsx               # Barra superior, perfil de usuario y acción nueva tarea
        │   └── StatsOverview.jsx        # Tarjetas KPI de estadísticas y progreso
        │
        └── tasks/
            ├── TaskFilterBar.jsx        # Barra de búsqueda, filtros, ordenamiento y vistas
            ├── TaskCard.jsx             # Tarjeta de tarea con badges, estados y acciones
            ├── TaskBoardView.jsx        # Tablero de 3 columnas Kanban
            ├── TaskListView.jsx         # Vista en formato de lista
            ├── TaskFormModal.jsx        # Formulario modal de creación y edición
            └── EmptyTasksState.jsx      # Estado vacío y sugerencias de acción
```

---

## 💻 Instrucciones para Ejecutar el Proyecto

1. Abrir la terminal en la carpeta del proyecto:
   ```bash
   cd C:\Users\BRAYAN\.gemini\antigravity\scratch\zone4flow
   ```

2. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Abrir en el navegador la URL mostrada en la terminal (por defecto: `http://localhost:5173`).

4. Para compilar para producción:
   ```bash
   npm run build
   ```
