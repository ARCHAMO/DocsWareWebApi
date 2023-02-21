'use strict'

let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors')

let app = express();

// Cargamos las rutas
let userRouters = require('./routes/UserRouters');
let moduloRouters = require('./routes/ModuleRouters');
let projectRouters = require('./routes/ProjectRouters');
// let documentationRouters = require('./routes/DocumentationRouters');
let customerRouters = require('./routes/CustomerRouters');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

// Configuramos las cabeceras http
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-auth-token'); // HERE
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

// Rutas base
app.use('/api', userRouters);
app.use('/api', projectRouters);
app.use('/api', moduloRouters);
// app.use('/api', documentationRouters);
app.use('/api', customerRouters);

module.exports = app;


