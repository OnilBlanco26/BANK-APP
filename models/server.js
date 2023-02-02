const express = require('express')
const cors = require('cors')
const morgan = require('morgan')


// 1. Creamos una clase

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT || 3000

        this.paths = {
            users: '/api/v1/users',
            transfers: '/ap1/v1/transfers'
        }
    }

    middlewares(){
        

        //UTILIZAMOS LAS CORS PARA PERMITIR ACCESO A LA API DESDE EL FRONT-END
        this.app.use(cors())
        //UTILIZAMOS EXPRESS.JSON PARA PARSEAR EL BODY DE LA REQUEST
        this.app.use(express.json())
    }

    routes() {

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port)
        })
    }

}

