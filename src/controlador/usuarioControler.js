const Usuarios = require('../modelos/Usuarios');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const { ErrorBadRequest, Success } = require('../constants/status.constants');
const { generateToken } = require('../utils/jwt.utils');

exports.crearUsuario = async (req, res) => {

    //Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    const {email, password, tipo} = req.body;
    try {
        let usuario = await Usuarios.findOne({email});
        
        if(usuario){
            return ErrorBadRequest(res, 'El email ya esta en uso');
        }
        // verificar tipo usuario 
        const tipos = ['administrador', 'trabajador', 'cliente'];

        if (!tipos.includes(tipo?.toLowerCase())){
            return ErrorBadRequest(res, 'El tipo usuario no concuerda');
        };
        //Crear el nuevo usuario
        usuario = new Usuarios(req.body);
        
        //Hashear el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);
        //guardar usuario
        await usuario.save();
        
        //Crear y firmar el jwt
        const payload = {
            usuario: {
                id: usuario.id
            }
        };
        //firmar el jwt const token 
        const token = generateToken(payload);
        return Success(res, token);
    } catch (error) {
        console.log(error);
        return InternalError(res, error);
    }
}