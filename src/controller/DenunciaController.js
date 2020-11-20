const conection = require('../database/conection');
const bcrypt = require('bcrypt');


module.exports = {
  
     
    async index(request, response, next){ 
        const {page = 1} = request.query;
        const [count] = await conection('denuncia').count();
        
       const denuncia = await conection('denuncia').limit(10).
       offset((page -1)*10).
       select('tipo_crime','descricao','nome_denuncio');
       response.header('X-Total-Count',count['count(*)']);
        response.json({denuncia})
    },
    async findOneId(request, response,next){
        const {id} =  request.params;
        const denuncia = await conection('denuncia').
        where('id',id).select('tipo_crime','descricao','nome_denuncio');
         response.json({denuncia})
     },


    async create(request, response, next){
     
        const { tipo_crime, descricao, nome_denuncio, localizao, uf, bairo, rua, cidade, numero, usuario_email, ong_email } = request.body;

        const result = await conection('denuncia').insert([{
            tipo_crime,
            descricao,
            nome_denuncio,
            localizao,
            uf, 
            bairo,
            rua, 
            cidade, 
            numero, 
            usuario_email, 
            ong_email
            
            }]).then(message =>{
            return  response.status(200).json({success:'success'});
            }).catch(err =>{
            return  response.status(201).json({error:err});
            });
    
        
        },
    async update(request,response, next){
        const {tipo_crime, descricao, nome_denuncio, localizao, uf, bairo, rua, cidade, numero, usuario_email, ong_email } = request.body;
        const {id} =  request.params;
        
        const result = await conection('denuncia').where('id', id).update({
            tipo_crime:tipo_crime,
            descricao:descricao,
            nome_denuncio:nome_denuncio,
            localizao:localizao,
            uf:uf, 
            bairo:bairo, 
            rua:rua,
            cidade:cidade,
            numero:numero,  
            usuario_email:usuario_email, 
            ong_email:ong_email
        },['tipo_crime', 'descricao', 'nome_denuncio', 'localizacao', 'uf', 'bairo', 'rua', 'cidade', 'numero', 'usuario_email', 'ong_email']).then(message => {

          return  response.status(200).json({success:'success'});

        }).catch(err =>{
          return  response.status(404).json({err:err});
        });
    },
    async delete(request, response, next){
       
            const {id} = request.params;
      
            await conection('denuncia').where('id',id)
            .delete().then(message => {

              return  response.status(200).json({success:'success'});

            }).catch(err =>{
              return  response.status(404).json({err:err});
            });

          
    },
    
};
