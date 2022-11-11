'use strict';

let fs = require('fs');
let ProjectModel = require('../models/ProjectModel');

function create(req, res) {
    let project = new ProjectModel();
    let params = req.body;

    project.nombre = params.nombre;
    project.description = params.description;
    project.icon = params.icon;

    // Se realizan todas las validaciones necesarias
    project.save((err, result) => {
        if (err) {
            res.status(500).send({
                message: 'Error al guardar el proyecto'
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

    ProjectModel.findByIdAndUpdate(id, updateParams, (err, result) => {
        if (err) {
            res.status(500).send({
                message: 'Error al actualizar el proyecto'
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
    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }
    let itemsPerPage = 10;

    ProjectModel.paginate({}, {}, function (error, result) {
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

    ProjectModel.findById(id, (error, result) => {
        if (error) {
            res.status(500).send({
                status: false,
                message: 'Error en la peticion.'
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

    ProjectModel.findByIdAndRemove(id, function (error, result) {
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