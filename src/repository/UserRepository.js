const conection = require('../database/conection');
const bcrypt = require('bcrypt');
module.exports = {
    async index(pagina){ 
        //  return  response.json({nome:'jose'});
            const {page = 1} = pagina;
            console.log('metodo index usuario pagina', pagina);
            const [count] = await conection('usuario').count();
            
           const usuario = await conection('usuario').limit(10).
           offset((page -1)*10).
           select('id','email','telefone');

            let dados = {'usuario':usuario, 
               'count': count['count(*)']};
            console.log('usuario no repo ',dados);
            return dados;
           // response.json({usuario})
           
        },
        async findOne(id){
         
            const usuario = await conection('usuario').
            where('id',id).select(id,'email','telefone');
          
            console.log('fidone', usuario);
            return {'usuario':usuario};
         },
    
        async create(body){
            console.log('metodo crear', body);
            const { nome,email,telefone } = body;
           console.log('criar no reposi',body);
            const senha = bcrypt.hashSync(body.senha, 10)
    
          const result = await conection('usuario').insert([{
              nome,
              email,
              telefone,
              senha
            }]);
       
         return result;
        },

        async atualizar(dados){
            const {nome,email,telefone} = dados;
            console.log('metodo atualixar body', dados);
            const senha = bcrypt.hashSync(dados.senha, 10)
    
            const result = await conection('usuario').where('id', id).
            update([{
              nome : nome,
              telefone : telefone,
              email : email,
              senha : senha
            }]);
            return result;
        },
        async delete(id){
            console.log('metodo delete', id);
                //const id = request.params;
          
                await conection('usuario').where('id',id)
                .delete().then(message => {
    
                  return  200;
    
                }).catch(err =>{
                  return  404;
                });
    
              
        },
        
}