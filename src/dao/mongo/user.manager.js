// Importa el modelo de usuario para interactuar con la base de datos
import ModeloDeUsuario from './models/user.model.js';

// Clase para gestionar las operaciones de la base de datos relacionadas con los usuarios
export default class UserManager {
    /**
     * Busca un usuario en la base de datos según un criterio de búsqueda.
     * @param {object} query - El criterio de búsqueda para Mongoose (ej. { email: '...' }).
     * @returns {Promise<object|null>} - El documento del usuario o null si no se encuentra.
     */
    async findOne(query) {
        try {
            const usuario = await ModeloDeUsuario.findOne(query).lean(); // Usamos .lean() para obtener un objeto JS plano
            return usuario;
        } catch (error) {
            console.error("Error al buscar usuario en la base de datos:", error);
            throw error; // Propaga el error para que sea manejado en la capa superior
        }
    }

    /**
     * Crea un nuevo usuario en la base de datos.
     * @param {object} data - Los datos del usuario a crear.
     * @returns {Promise<object>} - El nuevo usuario creado.
     */
    async create(data) {
        try {
            const nuevoUsuario = await ModeloDeUsuario.create(data);
            return nuevoUsuario;
        } catch (error) {
            console.error("Error al crear usuario en la base de datos:", error);
            throw error;
        }
    }

    /**
     * Busca un usuario por su ID.
     * @param {string} id - El ID del usuario.
     * @returns {Promise<object|null>} - El documento del usuario o null si no se encuentra.
     */
    async findById(id) {
        try {
            const usuario = await ModeloDeUsuario.findById(id).lean();
            return usuario;
        } catch (error) {
            console.error("Error al buscar usuario por ID en la base de datos:", error);
            throw error;
        }
    }
}
