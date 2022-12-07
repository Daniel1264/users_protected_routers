const checkUserCredential =  require('./auth.controller')
const jwt = require('jsonwebtoken')
const jwtSecret = require('../../config').api.jwtSecret


const postLogin = (req, res) => {
    const {email, password} = req.body

    if (email && password) {
        checkUserCredential(email, password)
        .then(data => {
            if (data) {
                const token = jwt.sign({
                    id: data.id,
                    user_name : data.user_name,
                    rol: data.role
                }, jwtSecret, {
                    expiresIn: '2 days'
                })

                res.status(200).json({
                    message: 'correct credentials',
                    token: token
                })
            } else {
                res.status(401).json({message: 'invalid credentials'})
            }
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
    } else {
        res.status(400).json({message: 'Missing Data', fields: {email: 'example@gmail.com', password: 'string'}})
    }
}

module.exports = {postLogin}