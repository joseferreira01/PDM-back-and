const express = require('express');

const contact = require('./controller/ongController')

const userController = require('./controller/UserController')
const login = require('../src/ middleware/login');
const sessions = require('./controller/sessions')
const { celebrate, Joi, errors, Segments } = require('celebrate');

const routes = express.Router();

routes.post('/users/login',celebrate({
    [Segments.BODY]: Joi.object().keys({
        password: Joi.string().required().min(8).max(16),
        login: Joi.string().required(),
      
    })
}),sessions.login);

routes.post('/users/',celebrate({
    [Segments.BODY]: Joi.object().keys({
        login: Joi.string().required().min(4).max(60),
        password: Joi.string().required().min(8).max(16)
     
      
    })
}),userController.create);
routes.get('/users',userController.index);

routes.get('/users/:id',userController.findOne);


// Routes to contact
routes.get('/contact',contact.index);

routes.get('/contact/:id',celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
      
    })
}),contact.findOne);

routes.post('/contact',celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().min(10).max(60),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11)
       
    })
}),contact.create);

routes.delete('/contact/:id',login,celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
      
    })
}),contact.delete);

//f

routes.post('/ong',celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().min(5).max(50),
        email: Joi.string().required().email(),
        telefone: Joi.string().required().min(11).max(11),
        descricao: Joi.string().required().min(10).max(100),
        uf: Joi.string().required().min(2).max(2),
        bairo: Joi.string().required().min(5),
        cidade: Joi.string().required().min(5),
        numero: Joi.number().integer().required()
    })
}),sessions.login);

module.exports = routes;