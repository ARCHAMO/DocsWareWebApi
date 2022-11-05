'use strict'

let mongoose = require('mongoose');

let urlDbNube = 'mongodb+srv://desarrollo:Desa.2o2o@docsware.erntoqz.mongodb.net/?retryWrites=true&w=majority';

let urlDbLocal = 'mongodb://localhost:27017/chat-interno';
let app = require('./app');
let port = process.env.PORT || 3977;

mongoose.connect(urlDbNube, (err, res) => {
    if(err) {
        throw err;
    } else {
        console.log('La conexion a la base de datos esta corriendo correctamente...');
        app.listen(port, function () {
            console.log('Servidor escuchando en http://localhost:'+port);
        })
    }
});
