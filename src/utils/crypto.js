const bcrypto =  require('bcrypt')

const hashPassword = (plainPassword) => {
    return bcrypto.hashSync(plainPassword, 10)
}


const comparePassword = (plainPassword, hashPassword) => {
    return bcrypto.compareSync(plainPassword, hashPassword)
}

module.exports = {
    hashPassword,
    comparePassword
}
