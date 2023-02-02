const { Router } = require("express");

// 1.Creamos una instancia del objeto Router
const router = Router()

router.get('/:id/history', getUserHistoryById)

router.post('/signup', createNewUserAccount)

router.post('/login', userLogin)


// 2. Exportamos router
module.exports = {
    usersRouter: router
}