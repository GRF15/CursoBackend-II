/**
 * @file Define el esquema y modelo de Mongoose para los usuarios.
 * @module models/user.model
 */

import mongoose from 'mongoose';

const coleccionDeUsuarios = 'users';

/**
 * @typedef {object} UserSchema
 * @property {string} first_name - Nombre del usuario (requerido).
 * @property {string} last_name - Apellido del usuario (requerido).
 * @property {string} email - Correo electrónico único del usuario (requerido).
 * @property {number} age - Edad del usuario (requerida).
 * @property {string} password - Contraseña del usuario (requerida).
 * @property {string} role - Rol del usuario (por defecto: 'user').
 * @property {mongoose.Schema.Types.ObjectId} cart - Referencia al carrito del usuario.
 */

const esquemaDeUsuario = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts'
    }
});

const ModeloDeUsuario = mongoose.model(coleccionDeUsuarios, esquemaDeUsuario);

export default ModeloDeUsuario;
