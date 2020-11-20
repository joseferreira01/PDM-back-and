const express = require('express');

const contact = require('./controller/ongController')

const userController = require('./controller/UserController')
const ongController = require('./controller/ongController')
const login = require('../src/ middleware/login');
const sessions = require('./controller/sessions')
const doacao = require('./controller/DoacaoControlle')
const { celebrate, Joi, errors, Segments } = require('celebrate');
const denunciaController = require('./controller/DenunciaController');

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

routes.get('/usuario/:email',userController.findOne);



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

// rotas de doação r rr

routes.post('/doacao',celebrate({

    [Segments.BODY]: Joi.object().keys({
        valor: Joi.number().required(),
        email_ong: Joi.string().required().email(),
      
    })
}),doacao.create);


//Rotas denuncia

routes.get('/denuncia',denunciaController.index);

routes.get('/denuncia/:id',denunciaController.findOneId);

routes.post('/denuncia',celebrate({

    [Segments.BODY]: Joi.object().keys({
        tipo_crime: Joi.string().required().min(8).max(50),
        descricao: Joi.string().required().min(20).max(150),
        nome_denuncio: Joi.string().required().min(10).max(100),
        localizao: Joi.string().required().min(5).max(15),
        uf: Joi.string().required().min(2).max(20), 
        bairo: Joi.string().required().min(5).max(20),
        rua: Joi.string().required().min(5).max(20), 
        cidade: Joi.string().required().min(5).max(20),
        numero: Joi.number().integer().required(),
        usuario_email: Joi.string().required().min(10).max(50), 
        ong_email: Joi.string().required().min(5).max(20),
      
    })
}),denunciaController.create);

routes.post('/denuncia/editar/:id',celebrate({
    [Segments.BODY]: Joi.object().keys({
        tipo_crime: Joi.string().required().min(8).max(50),
        descricao: Joi.string().required().min(20).max(150),
        nome_denuncio: Joi.string().required().min(10).max(100),
        localizao: Joi.string().required().min(5).max(15),
        uf: Joi.string().required().min(2).max(20), 
        bairo: Joi.string().required().min(5).max(20),
        rua: Joi.string().required().min(5).max(20), 
        cidade: Joi.string().required().min(5).max(20),
        numero: Joi.number().integer().required(),
        usuario_email: Joi.string().required().min(10).max(50), 
        ong_email: Joi.string().required().min(5).max(20),
      
    })
}),denunciaController.update);

routes.get('/denuncia/delete/:id',denunciaController.delete);

module.exports = routes;
