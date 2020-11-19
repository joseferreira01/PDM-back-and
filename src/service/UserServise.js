const UserRepository = require('../repository/UserRepository');


module.exports = {
  
     
    async index(pagina){ 
    
     const  dados = await UserRepository.index(pagina);
    // console.log((await dados).usuario ,'vindos do repositori')
     if(! dados.usuario){
         console.log('no if')
         return 500;
     } else{ //console.log('pasded  ',(await dados).usuario);
         return await dados;

     }
       
    },
    async findOne(email){
      
        const usuario = await UserRepository.findOne(email)
       
        if(! usuario){
            console.log('no if')
            return 500;
        } else{ 
            return usuario;
   
        }
     },

    async create(body){
   const status = await UserRepository.create(body);
   console.log(status);
   return status;
      
    },
    async atualizar(body){
     return  await UserRepository.create(body)
       
    },
    async delete(email){
     return await UserRepository.delete(email);
          
    },
    
};
