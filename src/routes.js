const express = require('express');
const routes = express.Router();
const contact = require('./controller/MessageController')
const sessions = require('./controller/sessions')
const userController = require('./controller/UserController')
const login = require('../src/ middleware/login');

const { celebrate, Joi, errors, Segments } = require('celebrate');



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

module.exports = routes;
//f
