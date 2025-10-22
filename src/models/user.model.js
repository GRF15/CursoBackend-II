// Importa mongoose para definir el esquema y el modelo
import mongoose from 'mongoose';

// Define el nombre de la colección en la base de datos
const coleccionDeUsuarios = 'users';

// Define el esquema para los usuarios
const esquemaDeUsuario = new mongoose.Schema({
    // Nombre del usuario, es requerido
    first_name: { type: String, required: true },
    // Apellido del usuario, es requerido
    last_name: { type: String, required: true },
    // Correo electrónico del usuario, es único y requerido
    email: { type: String, unique: true, required: true },
    // Edad del usuario, es requerida
    age: { type: Number, required: true },
    // Contraseña del usuario, es requerida
    password: { type: String, required: true },
    // Rol del usuario, por defecto es 'user'
    role: { type: String, default: 'user' },
    // Carrito asociado al usuario, se relaciona con la colección 'carts'
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts'
    }
});

// Crea el modelo de usuario a partir del esquema
const ModeloDeUsuario = mongoose.model(coleccionDeUsuarios, esquemaDeUsuario);

// Exporta el modelo de usuario para usarlo en otras partes de la aplicación
export default ModeloDeUsuario;
