const conection = require('../database/conection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


module.exports = {

    async login(request, response) {
        const { login, password } = request.body;

        try {
            const user = await conection('user')
                .where({
                    login: login,
                }).select('id', 'password');

            if (user.length === 0) {
                throw new Error('Incorrect login')
            }

            const isSamePassword = await bcrypt.compare(password, user[0].password)

            if (isSamePassword) {
                const token = jwt.sign({
                    id: user.id,
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