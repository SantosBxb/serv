const express = require('express');
const router = express.Router();
const productoControler = require('../controlador/productoControler');
const auth = require('../midelwere/auth');

const multipart = require('connect-multiparty');
const validateProducts = require('../midelwere/middleware.util');
const md_upload = multipart({uploadDir: './img'})

//Crear productos
//api/productos
router.post('/',
    [
        auth,
    ...validateProducts
    ],
    productoControler.crearProducto,
)
router.post('/upload',
    auth,
    productoControler.subirImagen
)
router.post('/:id',
    auth,
    productoControler.subirArchivo
)
router.delete('/:id',
    auth,
    productoControler.eliminarProducto
    )
router.get('/:file', productoControler.view) 
router.get('/',
    productoControler.obtenerProductos
)

module.exports = router;