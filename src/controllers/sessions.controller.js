// Importa el UserManager para interactuar con la lógica de negocio de usuarios
import UserManager from '../dao/mongo/user.manager.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Crea una instancia del UserManager
const userManager = new UserManager();

// Función para registrar un nuevo usuario
const register = async (solicitud, respuesta) => {
    try {
        const { first_name, last_name, email, age, password } = solicitud.body;

        // Verifica si el usuario ya existe
        const usuarioExistente = await userManager.findOne({ email });
        if (usuarioExistente) {
            return respuesta.status(400).json({ message: 'El correo electrónico ya está en uso' });
        }

        // Hashea la contraseña
        const contrasenaHasheada = bcrypt.hashSync(password, 10);

        // Crea el nuevo usuario utilizando el manager
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

// Función para iniciar sesión
const login = async (solicitud, respuesta) => {
    try {
        const { email, password } = solicitud.body;

        // Busca al usuario por email
        const usuario = await userManager.findOne({ email });
        if (!usuario) {
            return respuesta.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Compara las contraseñas
        const esContrasenaValida = bcrypt.compareSync(password, usuario.password);
        if (!esContrasenaValida) {
            return respuesta.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Crea el token JWT
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
        
        // Establece la cookie y envía la respuesta
        respuesta.cookie("token", token, { httpOnly: true, maxAge: 3600000 }).json({ message: "Login exitoso" });

    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        respuesta.status(500).json({ message: "Error interno del servidor" });
    }
};

// Función para obtener el usuario actual
const current = (solicitud, respuesta) => {
    // El middleware de passport ya adjuntó el usuario a la solicitud
    respuesta.json(solicitud.user);
};

export { register, login, current };
