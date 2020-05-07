const jwt = require('jsonwebtoken')

const auth = async (req,res,next) => {
     try { 
          const token = req.header('Authorization').replace('Bearer ', '')
          const decode = jwt.verify(token, process.env.JWT_SECRET);
          req.loggedInUser = decode;
          req.token = token
          next();
     }
     catch(e){
          res.status('401').send({error:'Please Authenticate.'})
     }
}

module.exports = auth;