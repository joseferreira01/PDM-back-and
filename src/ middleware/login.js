const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
   try{
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token,'dados');
    req.usuario = decode;
    next();
   } catch(err){
       return res.status(401).send({err:'usuario nao autorizado'});
   }
}