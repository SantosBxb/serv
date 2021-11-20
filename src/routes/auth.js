//Rutas para autenticar usuario
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authControler = require('../controlador/authControler');

//verifica un usuario
//api/auth
router.post('/', 
    [
        check('email', 'Agrega un email valido').isEmail(),
        check('password', "El password debe ser minimo 6 caracteres").isLength({min: 6})

        
    ],
    authControler.autenticarUsuario
)

module.exports = router;
