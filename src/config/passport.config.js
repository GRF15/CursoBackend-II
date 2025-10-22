// Importa Passport, la estrategia de JWT y el nuevo UserManager
import passport from 'passport';
import jwt from 'passport-jwt';
import UserManager from '../dao/mongo/user.manager.js'; // Se importa el manager

const EstrategiaJWT = jwt.Strategy;
const ExtraerJWT = jwt.ExtractJwt;
const userManager = new UserManager(); // Se crea una instancia del manager

// Función para extraer el token de las cookies
const extractorDeCookies = (solicitud) => {
    let token = null;
    if (solicitud && solicitud.cookies) {
        token = solicitud.cookies['token'];
    }
    return token;
};

// Función para inicializar las estrategias de Passport
const inicializarPassport = () => {
    // Estrategia 'jwt' para autenticación general basada en token
    passport.use('jwt', new EstrategiaJWT({
        jwtFromRequest: ExtraerJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    }, async (payloadDelJWT, done) => {
        try {
            // Utiliza el UserManager para buscar al usuario por ID
            const usuario = await userManager.findById(payloadDelJWT.id);
            if (usuario) {
                return done(null, usuario);
            }
            return done(null, false, { message: 'Usuario no encontrado' });
        } catch (error) {
            return done(error);
        }
    }));

    // Estrategia 'current' para obtener los datos del usuario desde la cookie
    passport.use('current', new EstrategiaJWT({
        jwtFromRequest: ExtraerJWT.fromExtractors([extractorDeCookies]),
        secretOrKey: process.env.JWT_SECRET
    }, async (payloadDelJWT, done) => {
        try {
            // No se necesita una consulta a la base de datos, los datos ya están en el token.
            // Esto es más eficiente y crea un DTO (Data Transfer Object) del usuario.
            const usuarioDTO = {
                id: payloadDelJWT.id,
                role: payloadDelJWT.role,
                first_name: payloadDelJWT.first_name,
                last_name: payloadDelJWT.last_name,
                email: payloadDelJWT.email,
                age: payloadDelJWT.age
            };
            return done(null, usuarioDTO);
        } catch (error) {
            return done(error);
        }
    }));
}

export default inicializarPassport;
