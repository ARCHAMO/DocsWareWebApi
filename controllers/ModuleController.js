'use strict';

let fs = require('fs');
let ModuleModel = require('../models/ModuleModel');
let Global = require('../shared/global');

function create(req, res) {
    let module = new ModuleModel();
    let params = req.body;

    module.name = params.name;
    module.description = params.description;
    module.icon = params.icon;
    module.projectId = params.projectId;
    module.userCreationId = params.userCreationId;
    module.customerId = params.customerId;

    // Se realizan todas las validaciones necesarias
    module.save((err, result) => {
        if (err) {
            res.status(500).send({
                message: 'Error al guardar el modulo. ' + err.message,
                errors: err.errors
            });
        } else {
            if (!result) {
                res.status(200).send({
                    status: false,
                    message: 'No se ha registrado el modulo'
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

    ModuleModel.findByIdAndUpdate(id, updateParams, (err, result) => {
        if (err) {
            res.status(500).send({
                message: 'Error al actualizar el modulo. ' + err.message,
                errors: err.errors
            });
            res.status(200).send({
                status: false,
                message: 'Error al actualizar el modulo'
            });
        } else {
            if (!result) {
                res.status(200).send({
                    status: false,
                    message: 'No se ha podido actualizar el modulo'
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

    ModuleModel.paginate({}, options, (error, result) => {
        if (error) {
            res.status(500).send({
                status: false,
                message: 'Error en la peticion'
            });
        } else {
            if (!result) {
                res.status(200).send({
                    status: false,
                    message: 'No hay modulos registrados'
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

    ModuleModel.findById(id, (error, result) => {
        if (error) {
            res.status(500).send({
                status: false,
                message: 'Error en la peticion'
            });
        } else {
            if (!result) {
                res.status(200).send({
                    status: false,
                    message: 'El modulo no existe.'
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

    ModuleModel.findByIdAndRemove(id, function (error, result) {
        if (error) {
            res.status(500).send({
                status: false,
                message: 'Error eliminando el modulo.'
            });
        } else {
            if (!result) {
                res.status(200).send({
                    status: false,
                    message: 'El modulo no existe.'
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