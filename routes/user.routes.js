const { Router } = require("express");
const { getHistory, register, login } = require("../controllers/users.controller");

// 1.Creamos una instancia del objeto Router
const router = Router()

router.get('/:id/history', getHistory)

router.post('/signup', register)

router.post('/login', login)


// 2. Exportamos router
module.exports = {
    usersRouter: router
}