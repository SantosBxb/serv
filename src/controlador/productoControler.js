const {validationResult} = require('express-validator');
const Productos = require('../modelos/Productos');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { Success, InternalError, ErrorBadParams, Unauthorized, ErrorBadRequest } = require('../constants/status.constants');
const { uploadImage } = require('../utils/uploadImage');

exports.crearProducto = async (req, res) => {
    //Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return ErrorBadParams(res, errores.array())
    }

    try {
        //Crear un nuevo producto
        if(req.usuario.tipo.toLowerCase() !== 'administrador' && req.usuario.tipo.toLowerCase() !== 'trabajador'){
            return Unauthorized(res)    
        }else{
            const producto  = new Productos(req.body);
            if(producto.cantidad >= 1){
                producto.estado = true;
            }
            if (!producto.image) {
                producto.image = 'default.png';
            }
            producto.creador = req.usuario.id;
            producto.save();
            return Success(res, producto);
        }
        
    } catch (error) {
        console.log(error);
        return InternalError(res, error)
        
    }
}

exports.subirImagen = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return ErrorBadParams(res, 'No files were uploaded.');
        }
        const imagen = await uploadImage(req.files);
        return Success(res,{path:imagen});
        
    } catch (error) {
        return InternalError(res, error)
    }
}

exports.view = async (req, res) => {
    const { file } = req.params;
    const image = path.join(__dirname, '../img/', file);
    return res.sendFile(image);
}

exports.obtenerProductos = async (req, res) => {
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }
    try {
    const products = await Productos.find({estado: true})
    const newProducts = products.map(product => {
        if (!product.image) {
            product.image = 'default.png';
        }
        return product;
    })
    return Success(res, newProducts);        
    }catch(error){
        return InternalError(res, error)
    }
}






exports.subirArchivo = async (req, res) => {
    const productoId = req.params.id;
    const configuracionMulter = {
        limits : {fileSize: 10000000},
        storage: fileStorage = multer.diskStorage({
            fileFilter: (req, file, cb) => {
                const filetype = ['jpg', 'png', '`jpeg'];
                const mimetype = filetype.test(file.mimetype);
                const extname = filetype.test(path.extname(file.originalname))
                if(mimetype && extname){
                    return cb(null, true);
                }
                cb(false, "error: EL ARCHIVO DEBE SER UNA IMAGEN")
            },
            destination: (req, file, cb) => {
                cb(null, __dirname +'/../img/')
            },
            filename:(req, file, cb) => {
                const extension = file.mimetype.split('/')[1];
                cb(null, `${productoId}.${extension}`);
            }
        })
    }
    const upload = multer(configuracionMulter).single('archivo');

    upload(req, res, async (error) => {

        const ext = req.file.filename.split('.')
        const comp = ext[ext.length - 1];

        //Validar extencion
        const extencionesValidas = ['png', 'jpg', 'jpeg', 'svg'];

        if(!extencionesValidas.includes(comp)){
            const pathImage = path.join(__dirname, `/../img/${req.file.filename}`)
            fs.unlinkSync(pathImage);
                return res.status(400).json({msg: 'La extencion del archivo no es valida'});
        }else{
                res.json({archivo: req.file.filename});
                Productos.findOneAndUpdate({_id: productoId}, {image: req.file.filename}, {new: true}, (err, productoUpdate) => {
                    if(err || !productoUpdate){
                        return res.status(400).json({msg: 'No se ha podido modificar el nombre de la imagen'});
                    }
                    return productoUpdate
                })
            
        }
        
    }); 
}

exports.eliminarProducto = async (req, res) => {
    //Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }
    //Revisar el ID 
    const productoId = req.params.id;
    try {
        //Crear un nuevo producto
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
        
    }
}
