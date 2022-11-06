'use strict'

let express = require('express');
let DocumentationController = require('../controllers/DocumentationController');
let api = express.Router();
let md_auth = require('../middlewares/authenticated');

// Rutas para el controlador de usuarios
api.post('/Documentation', DocumentationController.create);
api.put('/Documentation/update/:id', md_auth.ensureAuth, DocumentationController.update);
api.get('/Documentations/:page?', md_auth.ensureAuth, DocumentationController.findByAll);
api.get('/Documentation/:id', DocumentationController.findById);
api.delete('/Documentation/:id', md_auth.ensureAuth, DocumentationController.destroy);

module.exports = api;