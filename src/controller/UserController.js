const conection = require('../database/conection');
const UseService = require('../service/UserServise');

const bcrypt = require('bcrypt');


module.exports = {
  
     
    async index(request, response, next){ 
    
        const {page = 1} = request.query;
      const dados = await UseService.index(page);
   
        response.json(dados.usuario);
    },
    async findOne(request, response,next){
      const {id} = request.params;
      const dados = UseService.findOne(id);
       response.json(dados['usuario']);
     },

    async create(request, response, next){
     
     const resutado = await UseService.create( request.body);
     console.log('log de create',resutado)
      if(resutado){
        response.status(200).json({success:'sucesso'});
      } else {
        response.status(400).json({error:'erro'});
      }
   
     
    },
    async atualizar(request,response, next){
      const {id} = request.params;
        const {nome,email,telefone} = request.body;
        

        const senha = bcrypt.hashSync(request.body.senha, 10)

        const result = await conection('usuario').where('email', email).update([{
          nome : nome,
          telefone : telefone,
          email : email,
          senha : senha
        }])
    },
    async delete(request, response, next){
       
            const id = request.params;
      
            await conection('usuario').where('email',email)
            .delete().then(message => {

              return  response.status(200).json({success:'success'});

            }).catch(err =>{
              return  response.status(404).json({err:err});
            });

          
    },
    
};
