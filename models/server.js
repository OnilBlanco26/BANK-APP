const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { usersRouter } = require('../routes/user.routes')
const { db } = require('../database/db')


// 1. Creamos una clase

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT || 3000

        this.paths = {
            users: '/api/v1/users',
            transfers: '/ap1/v1/transfers'
        }

        //LLAMAR EL METODO DE LA CONEXION A LA BASE DE DATOS
        this.database()
        //INVOCAR EL METODO MIDDLEWARES
        this.middlewares()
        //INVOCAMOS EL METODO ROUTES
        this.routes()
    }

    middlewares(){
        

        //UTILIZAMOS LAS CORS PARA PERMITIR ACCESO A LA API DESDE EL FRONT-END
        this.app.use(cors())
        //UTILIZAMOS EXPRESS.JSON PARA PARSEAR EL BODY DE LA REQUEST
        this.app.use(express.json())
    }

    // METODO QUE CONECTA CON LAS RUTAS DE NUESTRA APP
    routes() {
        // UTLIZAMOS LA RUTA DE USUARIOS
        this.app.use(this.paths.users, usersRouter)
    }

    //CREAMOS EL METODO DE CONEXION PARA NUESTRA BASE DE DATOS
    database(){
        db.authenticate()
        .then(() => console.log('Database authenticate'))
        .catch(err => console.log(err))

        db.sync()
        .then(() => console.log('Database Synced'))
        .catch(err => console.log(err)) 
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port)
        })
    }

}

// EXPORTAMOS LA CLASE

module.exports = Server