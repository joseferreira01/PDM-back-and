const conection = require('../database/conection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


module.exports = {

    async login(request, response) {
        const { email, senha } = request.body;

        try {
            const usuario = await conection('usuario')
                .where({
                    email: email,
                }).select('email', 'senha');

            if (user.length === 0) {
                throw new Error('Incorrect login')
            }

            const isSamePassword = await bcrypt.compare(senha, usuario[0].senha)

            if (isSamePassword) {
                const token = jwt.sign({
                    email: usuario.email,
                    login: login
                }, 'dados', {
                    expiresIn: '1h'
                })

                return response.json(token);
            }
            throw new Error('Incorrect password')
        } catch (err) {
            if (err.message === 'Incorrect login' || err.message === 'Incorrect password') {
                return response.status(400).json(err.message);
            }
            return response.status(400).json('Error in the data expected for request!');
        }

    }

};