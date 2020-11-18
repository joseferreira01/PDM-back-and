const conection = require('../database/conection');
//const bcrypt = require('bcrypt');


module.exports = {
  
     
    async index(request, response, next){ 
    //  return  response.json({nome:'jose'});
        const {page = 1} = request.query;
        const [count] = await conection('doacao').count();
        
       const message = await conection('doacao').limit(10).
       offset((page -1)*10).
       select('id','id_ong', 'valor');
       response.header('X-Total-Count',count['count(*)']);
        response.json({message})
    },
    async findOne(request, response,next){
        const {id} =  request.params;
        const message = await conection('user').
        where('id',id).select('id','login');
         response.json({message})
     },

    async create(request, response, next){
     
        const {valor,id_ong, } = request.body;

      const result = await conection('doacao').insert({
          valor,
          id_ong
        }).then(message =>{
          return  response.status(200).json({success:'success'});
        }).catch(err =>{
          return  response.status(201).json({error:err});
        });
   
     
    },
    async delete(request, response, next){
       
            const id = request.params;
      
            await conection('doacao').where('id',id)
            .delete().then(message => {

              return  response.status(200).json({success:'success'});

            }).catch(err =>{
              return  response.status(404).json({err:err});
            });
       
          
    },
    
};
