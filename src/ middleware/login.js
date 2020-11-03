const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
   try{
    const token = request.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token,'dados');
    req.user = decode;
    next();
   } catch(err){
       return res.status(401).send({err:'unauthorized user '});
   }
}