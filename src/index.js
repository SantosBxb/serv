const express = require('express');
const fileUpload = require('express-fileupload');
const conectarDB = require('./config/db');
const cors = require('cors');

//Crear servidor
const app = express();

//Conectar a la bd
conectarDB();

//Habilitar express.json
app.use(express.json({extended: true}));
app.use(cors());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

//Puerto de la app
const PORT = process.env.PORT || 4000;

//importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/productos', require('./routes/productos'));

//Definir pagina principal
app.get('/', (req, res) => {
    res.send('Hola mundo')
})

app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
})