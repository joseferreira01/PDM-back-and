const express = require('express');

const contact = require('./controller/ongController')

const userController = require('./controller/UserController')
const ongController = require('./controller/ongController')
const login = require('../src/ middleware/login');
const sessions = require('./controller/sessions')
const { celebrate, Joi, errors, Segments } = require('celebrate');

const routes = express.Router();

routes.post('/usuario/login',celebrate({

    [Segments.BODY]: Joi.object().keys({
        senha: Joi.string().required().min(8).max(16),
        email: Joi.string().required(),
      
    })
}),sessions.login);

routes.post('/usuario',celebrate({
    [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required().min(4).max(60),
        telefone: Joi.string().required().min(4).max(60),
        email: Joi.string().required().email(),
        senha: Joi.string().required().min(8).max(16),
     
      
    })
}),userController.create);
routes.get('/usuario',userController.index);

routes.get('/usuario/:email',userController.findOne);



routes.post('/ong',celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().min(5).max(50),
        email: Joi.string().required().email(),
        telefone: Joi.string().required().min(11).max(11),
        descricao: Joi.string().required().min(10).max(100),
        uf: Joi.string().required().min(2).max(2),
        bairro: Joi.string().required().min(5),
        rua: Joi.string().required().min(1).max(50),
        cidade: Joi.string().required().min(5),
        numero: Joi.number().integer().required(),
        senha: Joi.string().required().min(8).max(16)
    })
}),ongController.create);

routes.post('/ong/login',celebrate({

    [Segments.BODY]: Joi.object().keys({
        senha: Joi.string().required().min(8).max(16),
        email: Joi.string().required(),
      
    })
}),sessions.loginOng);

module.exports = routes;
