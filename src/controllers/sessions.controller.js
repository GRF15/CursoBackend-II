/**
 * @file Controlador para gestionar las sesiones de usuario (registro, login, etc.).
 * @module controllers/sessions.controller
 */

import UserManager from '../dao/mongo/user.manager.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userManager = new UserManager();

/**
 * Registra un nuevo usuario en la base de datos.
 * Hashea la contraseña para un almacenamiento seguro.
 * @param {object} solicitud - Objeto de solicitud de Express.
 * @param {object} respuesta - Objeto de respuesta de Express.
 */
const register = async (solicitud, respuesta) => {
    try {
        const { first_name, last_name, email, age, password } = solicitud.body;

        const usuarioExistente = await userManager.findOne({ email });
        if (usuarioExistente) {
            return respuesta.status(400).json({ message: 'El correo electrónico ya está en uso' });
        }

        const contrasenaHasheada = bcrypt.hashSync(password, 10);

        const nuevoUsuario = await userManager.create({
            first_name,
            last_name,
            email,
            age,
            password: contrasenaHasheada,
        });

        respuesta.status(201).json({ message: "Usuario creado con éxito", usuario: nuevoUsuario });
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        respuesta.status(500).json({ message: "Error interno del servidor" });
    }
};

/**
 * Inicia sesión para un usuario existente.
 * Genera un token JWT si las credenciales son válidas y lo establece en una cookie.
 * @param {object} solicitud - Objeto de solicitud de Express.
 * @param {object} respuesta - Objeto de respuesta de Express.
 */
const login = async (solicitud, respuesta) => {
    try {
        const { email, password } = solicitud.body;

        const usuario = await userManager.findOne({ email });
        if (!usuario) {
            return respuesta.status(401).json({ error: 'Credenciales inválidas' });
        }

        const esContrasenaValida = bcrypt.compareSync(password, usuario.password);
        if (!esContrasenaValida) {
            return respuesta.status(401).json({ error: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            {
                id: usuario._id,
                first_name: usuario.first_name,
                last_name: usuario.last_name,
                email: usuario.email,
                age: usuario.age,
                role: usuario.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        
        respuesta.cookie("token", token, { httpOnly: true, maxAge: 3600000 }).json({ message: "Login exitoso", token });

    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        respuesta.status(500).json({ error: "Error interno del servidor" });
    }
};

/**
 * Devuelve los datos del usuario actualmente autenticado.
 * La información del usuario es extraída por el middleware de Passport.
 * @param {object} solicitud - Objeto de solicitud de Express, con `solicitud.user` adjunto.
 * @param {object} respuesta - Objeto de respuesta de Express.
 */
const current = (solicitud, respuesta) => {
    respuesta.json(solicitud.user);
};

export { register, login, current };
