'use strict';

let fs = require('fs');
let path = require('path');
let UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
let jwt = require('../services/jwt');
let Global = require('../shared/global');

function create(req, res) {
    let user = new UserModel();
    let params = req.body;

    user.firstName = params.firstName;
    user.secondName = params.secondName;
    user.firstLastName = params.firstLastName;
    user.secondLastName = params.secondLastName;
    user.email = params.email;
    user.identification = params.identification;
    user.image = 'null';
    user.fullName = params.fullName;
    user.clienteId = params.clienteId;

    if (params.password) {
        //Encritamos el paswwordc
        bcrypt.hash(params.password, saltRounds, function (err, hash) {
            user.password = hash;
            if (user.firstName != null && user.firstLastName != null && user.email != null && user.password != null) {
                user.save((err, result) => {
                    if (err) {
                        res.status(500).send({
                            message: 'Error al guardar el usuario. ' + err.message,
                            errors: err.errors
                        });
                    } else {
                        if (!result) {
                            res.status(404).send({
                                message: 'No se ha registrado el usuario'
                            });
                        } else {
                            res.status(200).send({
                                status: true,
                                user: result
                            });
                        }
                    }
                });
            } else {
                res.status(200).send({
                    message: 'Rellena tados los campos'
                });
            }
        })
    } else {
        res.status(500).send({
            message: 'Introduzca la contraseña'
        });
        user.password = params.password;
    }
}

function login(req, res) {
    let params = req.body;

    let email = params.email;
    let password = params.password;

    UserModel.findOne({
        email: email.toLowerCase()
    }, (err, user) => {
        if (err) {
            res.status(500).send({
                status: false,
                message: 'Error en la peticion.'
            });
        } else {
            if (!user) {
                res.status(200).send({
                    status: false,
                    message: 'Usuario no existe.'
                });
            } else {
                bcrypt.compare(password, user.password, function (err, check) {
                    if (check) {
                        if (params.gethash) {
                            res.status(200).send({
                                status: true,
                                data: { token: jwt.createToken(user) }
                            });
                        } else {
                            res.status(200).send({
                                status: true,
                                data: user
                            });
                        }
                    } else {
                        res.status(200).send({
                            status: false,
                            message: 'Usuario y/o contraseña incorrecta..'
                        });
                    }
                });
            }
        }
    });
}

function update(req, res) {
    let userId = req.params.id;
    let updateParams = req.body;

    UserModel.findByIdAndUpdate(userId, updateParams, (err, result) => {
        if (err) {
            res.status(500).send({
                message: 'Error al actualizar el usuario'
            });
        } else {
            if (!result) {
                res.status(404).send({
                    message: 'No se ha podido actualizar el usuario'
                });
            } else {
                res.status(200).send({
                    status: true,
                    user: result
                });
            }
        }
    });
}

function uploadImagen(req, res) {
    let userId = req.params.id;
    let fileName = 'No subido';

    if (req.files) {
        let filePath = req.files.image.path;
        let fileSplit = filePath.split('\\');
        let fileName = fileSplit[2];

        let extSplit = fileName.split('\.');
        let fileExt = extSplit[1];
        console.log(fileExt.lowercase);

        if (fileExt.toLowerCase() == 'png' || fileExt.toLowerCase() == 'jpg' || fileExt.toLowerCase() == 'gif') {
            UserModel.findByIdAndUpdate(userId, { image: fileName }, (err, result) => {
                if (!result) {
                    res.status(404).send({
                        message: 'No se ha podido actualizar el usuario'
                    });
                } else {
                    res.status(200).send({
                        user: result,
                        image: fileName
                    });
                }
            });
        } else {
            res.status(200).send({ message: 'Extension de archivo no valida.' })
        }
    } else {
        res.status(200).send({
            message: 'No has subido ninguna imagen.'
        });
    }
}

function getImagen(req, res) {
    let imageFile = req.params.imageFile;
    let pathFile = './uploads/users/' + imageFile;
    fs.exists(pathFile, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(pathFile));
        } else {
            res.status(200).send({ message: 'No existe imagen con ese nombre...' })
        }
    })
}

function findByAll(req, res) {
    const options = {
        page: req.params.page ? req.params.page : 1,
        limit: req.params.limit ? req.params.page : Global.getLimit(),
        customLabels: Global.getCustomLabels(),
    };

    UserModel.paginate({}, options, (error, result) => {
        if (error) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!result) {
                res.status(404).send({ message: 'No hay usuarios registrados' });
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
    let userId = req.params.id;

    UserModel.findById(userId, (error, result) => {
        if (error) {
            res.status(500).send({ message: 'Error en la peticion.' });
        } else {
            if (!result) {
                res.status(404).send({ message: 'El usuario no existe.' });
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
    let userId = req.params.id;

    UserModel.findByIdAndRemove(userId, function (error, userRemove) {
        if (error) {
            res.status(500).send({
                status: false,
                message: 'Error eliminando el usuario.'
            });
        } else {
            if (!userRemove) {
                res.status(200).send({
                    status: false,
                    message: 'El usuario no existe.'
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
    login,
    update,
    uploadImagen,
    getImagen,
    findByAll,
    findById,
    destroy
};