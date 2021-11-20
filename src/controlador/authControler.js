const Usuarios = require('../modelos/Usuarios');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const { ErrorBadParams, ErrorBadRequest, InternalError, Success } = require('../constants/status.constants');
const { generateToken } = require('../utils/jwt.utils');

exports.autenticarUsuario = async (req, res) => {
    //Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return ErrorBadParams(res, errores.array())
    }
    //Extraer email y password
    const {email, password} = req.body;
    try {
    
    //Revisar que sea un usuario registrado
    let usuario = await Usuarios.findOne({email});
    if(!usuario){
        return ErrorBadRequest(res, 'El usuario no existe');
    }
    const passCorrecto = await bcryptjs.compare(password, usuario.password);

    if(!passCorrecto){
        return ErrorBadRequest(res, 'Contraseña incorrecta');
    }
    //Si todo es correcto
    //Crear y firmar el jwt
    const payload = {
        usuario: {
            id: usuario.id,
            tipo: usuario.tipo
        }
    };
    //firmar el jwt
    const token = generateToken(payload);
    return Success(res, token);
    } catch (error) {
        return InternalError(res, error)
    }
}