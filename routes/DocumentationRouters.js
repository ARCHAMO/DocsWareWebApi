'use strict'

let express = require('express');
let DocumentationController = require('../controllers/DocumentationController');
let api = express.Router();
let md_auth = require('../middlewares/authenticated');

// Rutas para el controlador de usuarios
api.post('/documentation', DocumentationController.create);
api.put('/documentation/update/:id', md_auth.ensureAuth, DocumentationController.update);
api.get('/documentations/:page?', md_auth.ensureAuth, DocumentationController.findByAll);
api.get('/documentation/module/:id', md_auth.ensureAuth, DocumentationController.findByAllDocumentationForIdModule);
api.get('/documentation/:id', md_auth.ensureAuth, DocumentationController.findById);
api.delete('/documentation/:id', md_auth.ensureAuth, DocumentationController.destroy);

module.exports = api;