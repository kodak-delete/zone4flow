// server/index.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Base de datos temporal en memoria
let tasks = [
  { id: '1', title: 'Tarea inicial desde Backend', status: 'pending', priority: 'alta' }
];

// Rutas de la API (Backend)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Zone4Flow Backend API activo en Render' });
});

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const newTask = { id: Date.now().toString(), ...req.body };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Servir el Frontend compilado en producción
app.use(express.static(path.join(__dirname, '../dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor Zone4Flow corriendo en puerto ${PORT}`);
});