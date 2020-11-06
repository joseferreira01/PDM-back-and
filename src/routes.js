const express = require('express');
const routes = express.Router();
const contact = require('./controller/MessageController')
const sessions = require('./controller/sessions')
const userController = require('./controller/UserController')
const login = require('../src/ middleware/login');

const { celebrate, Joi, errors, Segments } = require('celebrate');



routes.post('/usuario/senha',celebrate({
    [Segments.BODY]: Joi.object().keys({
        senha: Joi.string().required().min(8).max(16),
        email: Joi.string().required(),
      
    })
}),sessions.login);

routes.post('/usuario/',celebrate({
    [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required().min(4).max(60),
        telefone: Joi.string().required().min(4).max(60),
        email: Joi.string().required().email,
        senha: Joi.string().required().min(8).max(16)
     
      
    })
}),userController.create);
routes.get('/usuario',userController.index);

routes.get('/usuario/:email',userController.findOne);


// Routes to contact
routes.get('/contato',contact.index);

routes.get('/contato/:email',celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
      
    })
}),contact.findOne);

routes.post('/contato',celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().min(10).max(60),
        email: Joi.string().required().email(),
        telefone: Joi.string().required().min(10).max(11)
       
    })
}),contact.create);

routes.delete('/contato/:email',email,celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
      
    })
}),contact.delete);

module.exports = routes;
//f
