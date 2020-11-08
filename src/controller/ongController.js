const conection = require('../database/conection');
//const crypto = require('crypto');
const bcrypt = require('bcrypt');


module.exports = {
  
     
    async index(request, response, next){ 
    
        const {page = 1} = request.query;
        const [count] = await conection('ong').count();
        
       const ong = await conection('ong').limit(10).
       offset((page -1)*10).
       select('*');
       response.header('X-Total-Count',count['count(*)']);
       return response.json({ong})
      
    },
    async findOne(request, response, next){
        const {id} =  request.params;
        const ong = await conection('ong').
        where('id',id).select('*');
         response.json({ong})
     },

    async create(request, response){
     
      const { nome, email,telefone, descricao, uf,bairro,rua,cidade,numero,caixa_postal,cep} = request.body;
      const senha = bcrypt.hashSync(request.body.senha, 10)
      const result = await conection('ong').insert([{
        nome,
         email,
         telefone, 
         descricao, 
         uf,
         bairro,
         rua,
         cidade,
         numero,
         caixa_postal,
         cep,
         senha
        }]).then(message =>{
          return  response.status(200).json({success:'success'});
        }).catch(err =>{
          console.log('err create ong',err);
          next(err);
          return  response.status(201).json({error:err});
        });
   
     
    },
    async delete(request, response, next){
       
            const id = request.params.id;
      
            await conection('ong').where('id',id)
            .delete().then(message => {

              return  response.status(200).json({success:'success'});

            }).catch(err =>{
              return  response.status(404).json({err:err});
            });
       
          
    },
    
};
