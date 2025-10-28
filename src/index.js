// Importa las dependencias necesarias.
import 'dotenv/config.js'; // Carga variables de entorno desde .env.
import express from 'express'; // Framework para construir aplicaciones web.
import mongoose from 'mongoose'; // ODM para interactuar con MongoDB.
import passport from 'passport'; // Middleware para autenticación.
import cookieParser from 'cookie-parser'; // Middleware para parsear cookies.
import path from 'path'; // Módulo para manejar rutas de archivos.
import { fileURLToPath } from 'url'; // Utilidad para convertir URL de archivo a ruta.

// Importa las configuraciones y rutas locales.
import inicializarPassport from './config/passport.config.js'; // Configuración de Passport.
import sessionsRouter from './routes/sessions.router.js'; // Rutas para sesiones y autenticación.

// --- CONFIGURACIÓN DE RUTAS DE ARCHIVOS ---
const __filename = fileURLToPath(import.meta.url); // Obtiene el nombre del archivo actual.
const __dirname = path.dirname(__filename); // Obtiene el directorio del archivo actual.

// --- INICIALIZACIÓN DE EXPRESS ---
const app = express(); // Crea una instancia de la aplicación Express.

// --- CONEXIÓN A LA BASE DE DATOS ---
// Conecta a MongoDB usando la URI del entorno.
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB')) // Mensaje en caso de éxito.
  .catch(error => console.error('❌ Error al conectar a MongoDB:', error)); // Mensaje en caso de error.

// Define el puerto del servidor.
const PUERTO = process.env.PORT || 8080;

// --- CONFIGURACIÓN DE PASSPORT ---
inicializarPassport(); // Inicializa las estrategias de autenticación de Passport.
app.use(passport.initialize()); // Integra Passport en la aplicación.

// --- MIDDLEWARES ---
// Sirve archivos estáticos desde la carpeta 'public'.
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Parsea cuerpos de solicitud en formato JSON.
app.use(express.urlencoded({ extended: true })); // Parsea cuerpos de solicitud URL-encoded.
app.use(cookieParser()); // Habilita el parseo de cookies.

// --- RUTAS DE LA API ---
// Asocia el enrutador de sesiones a la ruta base /api/sessions.
app.use('/api/sessions', sessionsRouter);

// --- INICIO DEL SERVIDOR ---
// Inicia el servidor en el puerto especificado.
app.listen(PUERTO, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PUERTO}`);
});

// Exporta la aplicación para posibles usos en otros módulos (como pruebas).
export { app };
