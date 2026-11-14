// ============================================================================
// Zone4Flow - Backend REST API Server (Node.js + Express)
// ============================================================================

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'data.json');

// Middlewares
app.use(cors());
app.use(express.json());

// Helper para leer/escribir persistencia en disco
function readData() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const initialData = {
        users: [
          {
            id: 'demo-user',
            name: 'Usuario Demo',
            email: 'demo@zone4flow.com',
            password: 'demoPassword123!'
          }
        ],
        tasks: [] // Inicializado 100% limpio sin tareas predeterminadas
      };
      fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
      return initialData;
    }
    const content = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error('Error al leer base de datos JSON:', err);
    return { users: [], tasks: [] };
  }
}

function writeData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error al guardar datos:', err);
  }
}

// ============================================================================
// RUTAS DE LA API
// ============================================================================

// 1. Endpoint de Salud (Vital para que Render o cron-job nunca lo duerma)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'Zone4Flow Backend API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// 2. Autenticación: Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const db = readData();
  const user = db.users.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  res.json({
    success: true,
    user: { id: user.id, name: user.name, email: user.email }
  });
});

// 3. Autenticación: Registro
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  const db = readData();

  if (db.users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase())) {
    return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
  }

  const newUser = {
    id: `user-${Date.now()}`,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password
  };

  db.users.push(newUser);
  writeData(db);

  res.status(201).json({
    success: true,
    user: { id: newUser.id, name: newUser.name, email: newUser.email }
  });
});

// 4. Tareas: Obtener tareas de un usuario
app.get('/api/tasks', (req, res) => {
  const userId = req.query.userId;
  const db = readData();
  const userTasks = userId ? db.tasks.filter((t) => t.userId === userId) : db.tasks;
  res.json(userTasks);
});

// 5. Tareas: Crear tarea
app.post('/api/tasks', (req, res) => {
  const db = readData();
  const newTask = {
    id: `task-${Date.now()}`,
    ...req.body,
    createdAt: new Date().toISOString()
  };

  db.tasks.unshift(newTask);
  writeData(db);
  res.status(201).json(newTask);
});

// 6. Tareas: Actualizar tarea
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const db = readData();
  const index = db.tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  db.tasks[index] = { ...db.tasks[index], ...req.body, updatedAt: new Date().toISOString() };
  writeData(db);
  res.json(db.tasks[index]);
});

// 7. Tareas: Eliminar tarea
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const db = readData();
  db.tasks = db.tasks.filter((t) => t.id !== id);
  writeData(db);
  res.json({ success: true, message: 'Tarea eliminada' });
});

// ============================================================================
// SERVIR FRONTEND EN PRODUCCIÓN (Render Web Service sirve ambos)
// ============================================================================
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`[OK] Backend Zone4Flow escuchando en el puerto ${PORT}`);
});