'use strict'

let express = require('express');
let bodyParser = require('body-parser');

let app = express();

// Cargamos las rutas
let userRouters = require('./routes/UserRouters');
let moduloRouters = require('./routes/ModuleRouters');
let projectRouters = require('./routes/ProjectRouters');
let documentationRouters = require('./routes/DocumentationRouters');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuramos las cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Rutas base
app.use('/api', userRouters);
app.use('/api', projectRouters);
app.use('/api', moduloRouters);
app.use('/api', documentationRouters);

// app.use('/api', documentationRouters);

module.exports = app;


