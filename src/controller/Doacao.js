const conection = require('../database/conection');
const bcrypt = require('bcrypt');


module.exports = {
  
     
    async index(request, response, next){ 
    //  return  response.json({nome:'jose'});
        const {page = 1} = request.query;
        const [count] = await conection('user').count();
        
       const message = await conection('user').limit(10).
       offset((page -1)*10).
       select('id','login', 'password');
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
     
        const { login } = request.body;
      
        const password = bcrypt.hashSync(request.body.password, 10)

      const result = await conection('user').insert({
          login,
          password
        }).then(message =>{
          return  response.status(200).json({success:'success'});
        }).catch(err =>{
          return  response.status(201).json({error:err});
        });
   
     
    },
    async delete(request, response, next){
       
            const id = request.params;
      
            await conection('user').where('id',id)
            .delete().then(message => {

              return  response.status(200).json({success:'success'});

            }).catch(err =>{
              return  response.status(404).json({err:err});
            });
       
          
    },
    
};
