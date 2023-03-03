'use strict';

let fs = require('fs');
let ProjectModule = require('../models/ProjectModel');
let Global = require('../shared/global');

function create(req, res) {
    let project = new ProjectModule();
    let params = req.body;

    project.name = params.name;
    project.description = params.description;
    project.icon = params.icon;
    project.userCreationId = params.userCreationId;
    project.customerId = params.customerId;

    // Se realizan todas las validaciones necesarias
    project.save((err, result) => {
        if (err) {
            res.status(500).send({
                message: 'Error al guardar el proyecto. ' + err.message,
                errors: err.errors
            });
        } else {
            if (!result) {
                res.status(200).send({
                    status: false,
                    message: 'No se ha registrado el proyecto'
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

    ProjectModule.findByIdAndUpdate(id, updateParams, (err, result) => {
        if (err) {
            res.status(500).send({
                message: 'Error al actualizar el proyecto. ' + err.message,
                errors: err.errors
            });
        } else {
            if (!result) {
                res.status(200).send({
                    status: false,
                    message: 'No se ha podido actualizar el proyecto'
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

    ProjectModule.paginate({}, options, (error, result) => {
        if (error) {
            res.status(500).send({
                status: false,
                message: 'Error en la peticion'
            });
        } else {
            if (!result) {
                res.status(200).send({
                    status: false,
                    message: 'No hay clientes registrados'
                });
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

    ProjectModule.findById(id, (error, result) => {
        if (error) {
            res.status(500).send({
                status: false,
                message: 'Error en la peticion'
            });
        } else {
            if (!result) {
                res.status(200).send({
                    status: false,
                    message: 'El proyecto no existe.'
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

function destroy(req, res) {
    let id = req.params.id;

    ProjectModule.findByIdAndRemove(id, function (error, result) {
        if (error) {
            res.status(500).send({
                status: false,
                message: 'Error eliminando el proyecto.'
            });
        } else {
            if (!result) {
                res.status(200).send({
                    status: false,
                    message: 'El proyecto no existe.'
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