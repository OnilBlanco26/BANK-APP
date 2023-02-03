const { Router } = require("express");
const { check } = require("express-validator");
const { transferAmount } = require("../controllers/transfers.controllers");
const { validateFields } = require("../middlewares/validateField.middleware");


const router = Router()

router.post('/', [
    check('amount', 'The amount must be mandatory').not().isEmpty(),
    check('senderAccountNumber', 'The SenderAccountNumber must be mandatory').not().isEmpty(),
    check('receiverAccountNumber', 'The receiverAccountNumber must be mandatory').not().isEmpty(),
    validateFields
] , transferAmount)


module.exports= {
    transferRouter: router
}