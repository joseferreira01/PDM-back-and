const conection = require('../database/conection');
const bcrypt = require('bcrypt');
const dataAtualFormatada = require('../utios/util')

module.exports = {
  
     
    async index(request, response, next){ 
        const {page = 1} = request.query;
        const [count] = await conection('denuncia').count();
        
       const denuncia = await conection('denuncia').limit(10).
       offset((page -1)*10).
       select('*');
       response.header('X-Total-Count',count['count(*)']);
        response.json(denuncia)
    },
    async findOneId(request, response,next){
        const {id} =  request.params;
        const denuncia = await conection('denuncia').
        where('id',id).select('*');
         response.json(denuncia[0])
     },


    async create(request, response, next){
      
      var date = new Date();
      const data = date.getDay()+'/'+(date.getMonth()+1) +'/'+date.getFullYear();
        const status ="analisando";
        console.log('uploads img',request.file);
        const foto = `http://192.168.10.23:3333/uploads/${request.file.filename}`;
        
        console.log('caminho da ing',foto);
        const { tipo_crime, descricao, titulo, latitude,longitude, uf, bairro, rua, cidade, numero, usuario_id, ong_id } = request.body;
      //  console.log('mais infos ',tipo_crime,titulo,descricao);
        const result = await conection('denuncia').insert({
            tipo_crime,
            descricao,
            titulo,
            latitude,
            longitude,
            uf, 
            bairro,
            rua, 
            cidade, 
            numero, 
            usuario_id, 
            ong_id,
            status,
            foto,
            data
            
            })
            
            if(result){
            return  response.status(200).json({success:'success'});
            }else{
              
            return  response.status(201).json({error:'error'});
            };
    
        
        },
    async update(request,response, next){
        const {tipo_crime, descricao, nome_denuncio, localizao, uf, bairo, rua, cidade, numero, usuario_email, ong_id } = request.body;
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
            usuario_id:usuario_id, 
            ong_id:ong_id,
        },['tipo_crime', 'descricao', 'nome_denuncio', 'localizacao', 'uf', 'bairo', 'rua', 'cidade', 'numero', 'usuario_id', 'ong_id']).then(message => {

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
    dataAtualFormatada(){
      var data = new Date(),
        dia  = data.getDate().toString().padStart(2, '0'),
        mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
        ano  = data.getFullYear();
        return dia+"/"+mes+"/"+ano;
    }
    
    
};
