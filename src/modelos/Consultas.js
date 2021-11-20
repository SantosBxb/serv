const mongoose = require('mongoose');

const ConsultaSchema = mongoose.Schema({
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
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Productos'
    },
    creador:{   
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuarios'
    },
    fecha:{
        type: Date,
        default: Date.now()
    },
    trabajador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuarios'
    },
    respuesta: {
        type: String
    }

});
module.exports = mongoose.model('Consultas', ConsultaSchema);