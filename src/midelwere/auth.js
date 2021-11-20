const jwt = require('jsonwebtoken');
const { InternalError, Unauthorized } = require('../constants/status.constants');

module.exports = function(req, res, next){
    //leer toke
    const token = req.header('x-auth-token');
    
    //Revisar si hay token
    if(!token){
        return Unauthorized(res);
    }
    //validar token
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario;
        next();
    } catch (error) {
        return InternalError(res, 'Token no valido');
    }
}