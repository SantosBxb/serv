//Rutas para usuarios
const express = require('express');
const router = express.Router();
const usuarioControler = require('../controlador/usuarioControler');
const {check} = require('express-validator');

//Crear un usuario
//api/usuarios
router.post('/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email valido').isEmail(),
        check('password', "El password debe ser minimo 6 caracteres").isLength({min: 6})

        
    ],
    usuarioControler.crearUsuario
)

module.exports = router;