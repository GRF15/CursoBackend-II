// Importa las dependencias necesarias del proyecto
import 'dotenv/config.js'; // Carga las variables de entorno desde el archivo .env
import express from 'express';
import mongoose from 'mongoose'; // ODM para interactuar con MongoDB
import passport from 'passport'; // Middleware de autenticación
import cookieParser from 'cookie-parser'; // Middleware para parsear cookies
import path from 'path';
import { fileURLToPath } from 'url';

// Importa las configuraciones y rutas locales
import inicializarPassport from './config/passport.config.js';
import sessionsRouter from './routes/sessions.router.js'; // Importa el nuevo enrutador de sesiones

// --- CONFIGURACIÓN DE RUTAS DE ARCHIVOS ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- INICIALIZACIÓN DE EXPRESS ---
const app = express(); // Crea una instancia de Express

// --- CONEXIÓN A LA BASE DE DATOS ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(error => console.error('❌ Error al conectar a MongoDB:', error));

// Define el puerto del servidor, usando el del .env o el 8080 por defecto
const PUERTO = process.env.PORT || 8080;

// --- CONFIGURACIÓN DE PASSPORT ---
inicializarPassport(); // Inicializa las estrategias de Passport
app.use(passport.initialize()); // Integra Passport en la aplicación Express

// --- MIDDLEWARES ---
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Parsea las solicitudes con cuerpo en formato JSON
app.use(express.urlencoded({ extended: true })); // Parsea las solicitudes con cuerpo en formato URL-encoded
app.use(cookieParser()); // Habilita el parseo de cookies

// --- RUTAS DE LA API ---
// Monta el enrutador de sesiones en la ruta base /api/sessions
app.use('/api/sessions', sessionsRouter);

// Ruta protegida de ejemplo que utiliza la estrategia 'jwt' de Passport
app.get('/api/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json(req.user);
});

// --- INICIO DEL SERVIDOR ---
app.listen(PUERTO, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PUERTO}`);
});

// Exporta la app para posibles pruebas
export { app };
