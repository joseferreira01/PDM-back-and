const express = require('express');

const contact = require('./controller/ongController')

const userController = require('./controller/UserController')
const ongController = require('./controller/ongController')
const login = require('../src/ middleware/login');
const sessions = require('./controller/sessions');
const PerfilUsuario = require('./controller/PerfilUsusario');
const doacao = require('./controller/DoacaoControlle')
const { celebrate, Joi, errors, Segments } = require('celebrate');
const UserController = require('./controller/UserController');

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
        telefone: Joi.string().required().min(11).max(11),
        email: Joi.string().required().email(),
        senha: Joi.string().required().min(8).max(16),
     
      
    })
}),userController.create);

routes.post('/usuario/editar/:id',celebrate({
    [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required().min(3),
        telefone: Joi.string().required().min(11).max(11),
        email: Joi.string().required().email(),
        senha: Joi.string().required().min(8).max(16),
      
    })
}),userController.atualizar);

routes.get('/usuario',userController.index);

routes.get('/usuario/:id',userController.findOne);

routes.delete('usuario/:id',celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
      
    })
}),UserController.delete);


routes.post('/ong',celebrate({
    [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required().min(5).max(50),
        email: Joi.string().required().email(),
        telefone: Joi.string().required().min(11).max(11),
        descricao: Joi.string().required().min(10).max(100),
        uf: Joi.string().required().min(2).max(2),
        rua: Joi.string().required().min(2).max(40),
        bairro: Joi.string().required().min(5),
        cidade: Joi.string().required().min(5),
        numero: Joi.number().integer().required(),
        caixa_postal: Joi.string().required().min(4),
        cep: Joi.string().required().min(9).max(9),
        senha: Joi.string().min(6).max(16)

    })
}),ongController.create);

routes.post('/ong/login',celebrate({

    [Segments.BODY]: Joi.object().keys({
        senha: Joi.string().required().min(8).max(16),
        email: Joi.string().required(),
      
    })
}),sessions.loginOng);

routes.get('/ong',ongController.index);

// rotas de doação r rr

routes.post('/doacao',celebrate({

    [Segments.BODY]: Joi.object().keys({
        valor: Joi.number().required(),
        id_ong: Joi.string().required().email(),
      
    })
}),doacao.create);



module.exports = routes;
