'use strict'

let express = require('express');
let ProjectController = require('../controllers/ProjectController');
let api = express.Router();
let md_auth = require('../middlewares/authenticated');

// Rutas para el controlador de usuarios
api.post('/project', md_auth.ensureAuth, ProjectController.create);
api.put('/project/update/:id', md_auth.ensureAuth, ProjectController.update);
api.get('/projects/:page?', md_auth.ensureAuth, ProjectController.findByAll);
api.get('/project/:id', md_auth.ensureAuth, ProjectController.findById);
api.delete('/project/:id', md_auth.ensureAuth, ProjectController.destroy);

module.exports = api; 