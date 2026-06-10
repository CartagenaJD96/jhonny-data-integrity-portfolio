const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

// Inicializar conexion a la base de datos
require('../infrastructure/database/connection');

// Crear la aplicacion Express
const app = express();

// Middlewares globales
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    message: 'Jhonny Data Integrity Portfolio - API funcionando correctamente',
    version: '1.0.0',
    status: 'OK'
  });
});

// Puerto del servidor
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV}`);
});

module.exports = app;