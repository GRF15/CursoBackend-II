/**
 * @file Manager para gestionar las operaciones de base de datos de usuarios.
 * @module dao/mongo/user.manager
 */

import ModeloDeUsuario from './models/user.model.js';

/**
 * Clase que encapsula la lógica de acceso a datos para los usuarios.
 */
export default class UserManager {
    /**
     * Busca un único usuario que coincida con un criterio.
     * @param {object} query - Criterio de búsqueda para Mongoose.
     * @returns {Promise<object|null>} El usuario encontrado o null.
     */
    async findOne(query) {
        try {
            // .lean() devuelve un objeto JavaScript simple en lugar de un documento de Mongoose.
            const usuario = await ModeloDeUsuario.findOne(query).lean();
            return usuario;
        } catch (error) {
            console.error("Error al buscar usuario en la base de datos:", error);
            throw error;
        }
    }

    /**
     * Crea un nuevo usuario en la base de datos.
     * @param {object} data - Datos del usuario a crear.
     * @returns {Promise<object>} El nuevo usuario creado.
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
     * @returns {Promise<object|null>} El usuario encontrado o null.
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
