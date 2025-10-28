# Proyecto de E-commerce con Node.js, Express y MongoDB

Este es el backend de una aplicación de e-commerce desarrollada con Node.js, Express y MongoDB. Incluye un sistema de autenticación de usuarios con JWT y Passport, y está diseñado para ser escalable y seguro.

## Características

- **Autenticación de Usuarios:** Sistema de registro y login con JWT y Passport.
- **API RESTful:** Rutas bien definidas para la gestión de usuarios y autenticación.
- **Seguridad:** Contraseñas hasheadas con bcrypt y uso de cookies HTTP-only para el almacenamiento de tokens.
- **Estrategia "current":** Una ruta protegida que devuelve los datos del usuario actualmente logueado.
- **Estructura Modular:** El proyecto está organizado en controladores, modelos, rutas y configuración para facilitar el mantenimiento y la escalabilidad.

## Instalación

1. Clona el repositorio: 
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables de entorno:
   ```
   MONGO_URI=<TU_CADENA_DE_CONEXION_A_MONGODB>
   PORT=8080
   JWT_SECRET=<TU_CLAVE_SECRETA_PARA_JWT>
   ```

## Uso

Para iniciar el servidor, ejecuta el siguiente comando:

```bash
npm start
```

El servidor se iniciará en `http://localhost:8080`.

## Endpoints de la API

- `POST /api/auth/register`: Registra un nuevo usuario.
- `POST /api/auth/login`: Inicia sesión y devuelve una cookie con el JWT.
- `GET /api/auth/current`: Devuelve los datos del usuario logueado (ruta protegida).

## Tecnologías Utilizadas

- **Node.js:** Entorno de ejecución de JavaScript.
- **Express:** Framework web para Node.js.
- **MongoDB:** Base de datos NoSQL.
- **Mongoose:** ODM para MongoDB.
- **Passport:** Middleware de autenticación para Node.js.
- **JSON Web Tokens (JWT):** Para la creación de tokens de acceso.
- **bcrypt:** Para el hasheo de contraseñas.
- **cookie-parser:** Para el manejo de cookies.
- **express-handlebars:** Motor de plantillas.
