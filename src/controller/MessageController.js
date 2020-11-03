const conection = require('../database/conection');
//const crypto = require('crypto');


module.exports = {
  
     
    async index(request, response, next){ 
    //  return  response.json({nome:'jose'});
        const {page = 1} = request.query;
        const [count] = await conection('message').count();
        
       const message = await conection('message').limit(10).
       offset((page -1)*10).
       select('*');
       response.header('X-Total-Count',count['count(*)']);
        response.json({message})
    },
    async findOne(request, response, next){
        const {id} =  request.params;
        const message = await conection('message').
        where('id',id).select('*');
         response.json({message})
     },

    async create(request, response){
     
        const { name, email,whatsapp } = request.body;
        
      const status = 'Unread';
      var newdate = new Date();
      const date = newdate.getTime();
      const result = await conection('message').insert({
            name,
            email, 
            whatsapp,
            date,
            status
        }).then(message =>{
          return  response.status(200).json({success:'success'});
        }).catch(err =>{
          console.log('err create message',err);
          next(err);
          return  response.status(201).json({error:err});
        });
   
     
    },
    async delete(request, response, next){
       
            const id = request.params;
      
            await conection('message').where('id',id)
            .delete().then(message => {

              return  response.status(200).json({success:'success'});

            }).catch(err =>{
              return  response.status(404).json({err:err});
            });
       
          
    },
    
};
