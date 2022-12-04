'use strict'

let express = require('express');
let Customer = require('../controllers/CustomerController')
let api = express.Router();
let md_auth = require('../middlewares/authenticated');

// Rutas para el controlador de usuarios
api.post('/customer', md_auth.ensureAuth, Customer.create);
api.put('/customer/update/:id', md_auth.ensureAuth, Customer.update);
api.get('/customers/:page?', md_auth.ensureAuth, Customer.findByAll);
api.get('/customer/:id', md_auth.ensureAuth, Customer.findById);
api.delete('/customer/:id', md_auth.ensureAuth, Customer.destroy);

module.exports = api;