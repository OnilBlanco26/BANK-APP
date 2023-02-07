require('dotenv').config();

// 1. Importamos el modelo

const Server = require('./models/server');

// 2. Instaciamos la clase

const server = new Server();

// 3. Ejecutamos el metodo llisten para escuchar las peticiones

server.listen();
