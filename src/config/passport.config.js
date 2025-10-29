/**
 * @file Configura las estrategias de autenticación de Passport.
 * @module config/passport.config
 */

import passport from 'passport';
import jwt from 'passport-jwt';
import UserManager from '../dao/mongo/user.manager.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const EstrategiaJWT = jwt.Strategy;
const ExtraerJWT = jwt.ExtractJwt;
const userManager = new UserManager();

const secretOrKey = process.env.JWT_SECRET || 'mi_clave_secreta_default';

/**
 * Extrae el token JWT desde una cookie en la solicitud.
 * @param {object} solicitud - El objeto de solicitud de Express.
 * @returns {string|null} El token JWT o null si no se encuentra.
 */
const extractorDeCookies = (solicitud) => {
    let token = null;
    if (solicitud && solicitud.cookies) {
        token = solicitud.cookies['token'];
    }
    return token;
};

/**
 * Inicializa y configura las estrategias de Passport.
 */
const inicializarPassport = () => {
    /**
     * Estrategia JWT para autenticar usuarios a través de un token en el encabezado.
     * Verifica la firma del token y busca al usuario en la base de datos.
     */
    passport.use('jwt', new EstrategiaJWT({
        jwtFromRequest: ExtraerJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey
    }, async (payloadDelJWT, done) => {
        try {
            const usuario = await userManager.findById(payloadDelJWT.id);
            if (usuario) {
                return done(null, usuario);
            }
            return done(null, false, { message: 'Usuario no encontrado' });
        } catch (error) {
            return done(error);
        }
    }));

    /**
     * Estrategia 'current' para validar un usuario a partir de un token JWT en una cookie.
     * Extrae los datos del payload del token para crear un DTO del usuario sin consultar la BD.
     */
    passport.use('current', new EstrategiaJWT({
        jwtFromRequest: ExtraerJWT.fromExtractors([extractorDeCookies]),
        secretOrKey
    }, async (payloadDelJWT, done) => {
        try {
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
