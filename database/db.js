//CONFIGURACION DE CONEXION PARA LA BASE DE DATOS

// 1.Importamos sequelize
const { Sequelize } = require('sequelize');

// 2.Hacemos nuestra configuracion
const db = new Sequelize({
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
});

// 3.Exportamos nuestra db

module.exports = { db };
