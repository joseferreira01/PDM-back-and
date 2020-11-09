const conection = require('../database/conection');
const bcrypt = require('bcrypt');


module.exports = {
  
     
    async index(request, response, next){ 
    //  return  response.json({nome:'jose'});
        const {page = 1} = request.query;
        const [count] = await conection('usuario').count();
        
       const usuario = await conection('usuario').limit(10).
       offset((page -1)*10).
       select('email','telefone');
       response.header('X-Total-Count',count['count(*)']);
        response.json({usuario})
    },
    async findOne(request, response,next){
        const {email} =  request.params;
        const usuario = await conection('usuario').
        where('email',email).select('email','telefone');
         response.json({usuario})
     },

    async create(request, response, next){
     
        const { nome,email,telefone } = request.body;
      
        const senha = bcrypt.hashSync(request.body.senha, 10)

      const result = await conection('usuario').insert([{
          nome,
          email,
          telefone,
          senha
        }]).then(message =>{
          return  response.status(200).json({success:'success'});
        }).catch(err =>{
          return  response.status(201).json({error:err});
        });
   
     
    },
    async atualizar(request,response, next){
        const {nome,email,telefone} = request.body;

        const senha = bcrypt.hashSync(request.body.senha, 10)

        const result = await conection('usuario').where({email : email}).update({
          nome : nome,
          telefone : telefone,
          senha : senha,
          email : email
        },['email','nome','telefone','senha','email']).then(message => {

          return  response.status(200).json({success:'success'});

        }).catch(err =>{
          return  response.status(404).json({err:err});
        });
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
