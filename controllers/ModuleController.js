'use strict';

let fs = require('fs');
let ModuleModel = require('../models/ModuleModel');

function create(req, res) {
    let module = new ModuleModel();
    let params = req.body;

    project.nombre = params.nombre;
    project.description = params.description;
    project.icon = params.icon;

    // Se realizan todas las validaciones necesarias
    module.save((err, result) => {
        if (err) {
            res.status(500).send({
                message: 'Error al guardar el modulo'
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
    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }
    let itemsPerPage = 10;

    ModuleModel.paginate({}, {}, function (error, result) {
        if (error) {
            res.status(500).send({
                success: false,
                message: 'Error en la peticion'
            });
        } else {
            if (!result) {
                res.status(200).send({
                    success: false,
                    message: 'No hay proyectos'
                });
            } else {
                return res.status(200).send({
                    status: true,
                    data: result
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
                message: 'Error en la peticion.'
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
                    status: true,
                    data: result
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