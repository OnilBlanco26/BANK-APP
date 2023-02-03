const { Router } = require("express");
const { check } = require("express-validator");
const { getHistory, register, login } = require("../controllers/users.controller");

const { validateFields } = require('../middlewares/validateField.middleware')

// 1.Creamos una instancia del objeto Router
const router = Router()

router.get('/:id/history', getHistory)

router.post('/signup', [
    check('name', 'The name must be mandatory').not().isEmpty(),
    check('password', 'The password must be mandatory').not().isEmpty(),
    validateFields
], register)

router.post('/login', [
    check('password', 'The password must be mandatory').not().isEmpty(),
    check('accountNumber', 'The Accont Number must be mandatory').not().isEmpty(),
    validateFields
] , login)


// 2. Exportamos router
module.exports = {
    usersRouter: router
}