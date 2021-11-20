const mongoose = require('mongoose');

const ProductoSchema = mongoose.Schema({
    nombre:{
        type: String,
        require: true,
        trim: true
    },
    descripcion:{
        type: String,
        require: true,
        trim: true
    },
    precio:{
        type: Number,
        require: true,
        trim: true
    },
    tipo: {
        type: String,
        require: true,
        trim: true
    },
    cantidad: {
        type: Number,
        require: true,
        trim: true
    },
    estado:{
        type:  Boolean,
        default: false
    },
    creador:{   
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuarios'
    },
    fecha:{
        type: Date,
        default: Date.now()
    },
    image:{
        type: String
    }
});
module.exports = mongoose.model('Productos', ProductoSchema);