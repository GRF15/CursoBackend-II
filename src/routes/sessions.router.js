// Importa Router de Express, las funciones del controlador de sesiones y Passport
import { Router } from 'express';
import { register, login, current } from '../controllers/sessions.controller.js';
import passport from 'passport';

const router = Router();

// Ruta para registrar un nuevo usuario
router.post('/register', register);

// Ruta para iniciar sesión
router.post('/login', login);

// Ruta para obtener los datos del usuario actual, protegida por Passport
router.get('/current', passport.authenticate('jwt', { session: false }), current);

export default router;
