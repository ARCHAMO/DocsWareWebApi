'use strict'

let express = require('express');
let ModuleController = require('../controllers/ModuleController');
let api = express.Router();
let md_auth = require('../middlewares/authenticated');

// Rutas para el controlador de usuarios
api.post('/module', ModuleController.create);
api.put('/module/update/:id', md_auth.ensureAuth, ModuleController.update);
api.get('/modules/:page?', md_auth.ensureAuth, ModuleController.findByAll);
api.get('/module/:id', md_auth.ensureAuth, ModuleController.findById);
api.delete('/module/:id', md_auth.ensureAuth, ModuleController.destroy);

module.exports = api;