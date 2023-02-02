const User = require("../models/users.model");


const register = async (req, res) => {
    const {name, password} = req.body

    const accountNumber = (Math.round(Math.random() * 100000) + 100000)
    const amount = 1000

    const user = User.create({
        name,
        accountNumber,
        password,
        amount
    })

    res.status(200).json({
        status: 'success',
        message: 'The user has been successfully created',
        user
    })
    
}

const login = async (req, res) => {
    const { password, accountNumber} = req.body

    const user = await User.findOne({
        where: {
            password,
            accountNumber,
            status: true
        }
    })

    if(!user) {
        return res.status(404).json({
            status: 'error',
            message: 'The user does not exist'
        })
    }

    res.status(200).json({
        status: 'success',
        message: `Welcome ${user.name.charAt(0).toUpperCase() + user.name.slice(1)}`
    })
}

const getHistory = async (req, res) => {

}


module.exports = {
    register, 
    login,
    getHistory
}