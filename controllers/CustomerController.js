'use strict';

let fs = require('fs');
let CustomerModel = require('../models/CustomerModel');
let Global = require('../shared/global');

function create(req, res) {
    let customer = new CustomerModel();
    let params = req.body;

    customer.firstName = params.firstName;
    customer.secondName = params.secondName;
    customer.firstLastName = params.firstLastName;
    customer.secondLastName = params.secondLastName;
    customer.fullName = params.fullName;
    customer.identification = params.identification;
    customer.email = params.email;
    customer.location = params.location;
    customer.state = params.state;
    customer.lastPaymentDate = params.lastPaymentDate;

    // Se realizan todas las validaciones necesarias
    customer.save((err, result) => {
        if (err) {
            res.status(500).send({
                message: 'Error al guardar el cliente. ' + err.message,
                errors: err.errors
            });
        } else {
            if (!result) {
                res.status(200).send({
                    status: false,
                    message: 'No se ha registrado el cliente'
                });
            } else {
                res.status(200).send({
                    status: true,
                    data: result
                });
            }
        }
    });
}

function update(req, res) {
    let id = req.params.id;
    let updateParams = req.body;

    CustomerModel.findByIdAndUpdate(id, updateParams, (err, result) => {
        if (err) {
            res.status(500).send({
                message: 'Error al actualizar el cliente'
            });
        } else {
            if (!result) {
                res.status(200).send({
                    status: false,
                    message: 'No se ha podido actualizar el cliente'
                });
            } else {
                res.status(200).send({
                    status: true,
                    data: result
                });
            }
        }
    });
}

function findByAll(req, res) {
    const options = {
        page: req.params.page ? req.params.page : 1,
        limit: req.params.limit ? req.params.page : Global.getLimit(),
        customLabels: Global.getCustomLabels(),
    };

    CustomerModel.paginate({}, options, (error, result) => {
        if (error) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!result) {
                res.status(404).send({ message: 'No hay clientes registrados' });
            } else {
                return res.status(200).send({
                    status: true,
                    data: result.data,
                    paginator: result.paginator
                });
            }
        }
    });
}

function findById(req, res) {
    let id = req.params.id;

    CustomerModel.findById(id, (error, result) => {
        if (error) {
            res.status(500).send({ message: 'Error en la peticion.' });
        } else {
            if (!result) {
                res.status(404).send({ message: 'El cliente no existe.' });
            } else {
                res.status(500).send({
                    status: true,
                    data: result
                });
            }
        }
    });
}

function destroy(req, res) {
    let id = req.params.id;

    CustomerModel.findByIdAndRemove(id, function (error, result) {
        if (error) {
            res.status(500).send({
                status: false,
                message: 'Error eliminando el cliente.'
            });
        } else {
            if (!result) {
                res.status(200).send({
                    status: false,
                    message: 'El cliente no existe.'
                });
            } else {
                res.status(200).send({
                    status: true
                });
            }
        }
    });
}

module.exports = {
    create,
    update,
    findByAll,
    findById,
    destroy
};