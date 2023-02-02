const {DataTypes} = require('sequelize')
const { db } = require('../database/db')

// 1.definir nuestra tabla para la base de datos
const User = db.define('user', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    accountNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
})

module.exports = User;