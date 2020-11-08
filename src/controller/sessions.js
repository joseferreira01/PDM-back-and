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

            if (!usuario) {
                throw new Error('Incorrect email')
            }

            const isSamePassword = await bcrypt.compare(senha, usuario[0].senha)

            if (isSamePassword) {
                const token = jwt.sign({
                    email: usuario.email,
                   
                }, 'dados', {
                    expiresIn: '1h'
                })

                return response.json(token);
            }
            throw new Error('Incorrect senha')
        } catch (err) {
            if (err.usuario === 'Incorrect email' || err.usuario === 'Incorrect senha') {
                return response.status(400).json(err.usuario);
            }
            return response.status(400).json('Error in the data expected for !');
        }

    },
    async loginOng(request, response) {
        const { email, senha } = request.body;

        try {
            const ong = await conection('ong')
                .where({
                    email: email,
                }).select('email', 'senha');

            if (!ong) {
                throw new Error('Incorrect email')
            }

            const isSamePassword = await bcrypt.compare(senha, ong[0].senha)

            if (isSamePassword) {
                const token = jwt.sign({
                    email: ong.email,
                   
                }, 'dados', {
                    expiresIn: '1h'
                })

                return response.json(token);
            }
            throw new Error('Incorrect senha')
        } catch (err) {
            if (err.ong === 'Incorrect email' || err.ong === 'Incorrect senha') {
                return response.status(400).json(err.ong);
            }
            return response.status(400).json('Error in the data expected for request!');
        }

    }
};