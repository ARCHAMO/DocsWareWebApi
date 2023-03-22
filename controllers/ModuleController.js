"use strict";

let fs = require("fs");
const { ObjectId } = require("mongodb");
let ModuleModel = require("../models/ModuleModel");
let Global = require("../shared/global");

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
        message: "Error al guardar el modulo. " + err.message,
        errors: err.errors,
      });
    } else {
      if (!result) {
        res.status(200).send({
          status: false,
          message: "No se ha registrado el modulo",
        });
      } else {
        res.status(200).send({
          status: true,
          data: result,
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
        message: "Error al actualizar el modulo. " + err.message,
        errors: err.errors,
      });
      res.status(200).send({
        status: false,
        message: "Error al actualizar el modulo",
      });
    } else {
      if (!result) {
        res.status(200).send({
          status: false,
          message: "No se ha podido actualizar el modulo",
        });
      } else {
        res.status(200).send({
          status: true,
          data: result,
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

    sort: { createdAt: -1 },
    populate: { path: "projectId", select: "name" },
    lean: true,
  };
  ModuleModel.paginate({}, options, (error, result) => {
    if (error) {
      res.status(500).send({
        status: false,
        message: "Error en la peticion" + error,
      });
    } else {
      if (!result) {
        res.status(200).send({
          status: false,
          message: "No hay modulos registrados",
        });
      } else {
        return res.status(200).send({
          status: true,
          data: result.data,
          paginator: result.paginator,
        });
      }
    }
  });
}

function findByAllModuleForIdProject(req, res) {
  const idProject = req.params.id;
  const options = {
    customLabels: Global.getCustomLabels(),
    sort: { createdAt: -1 },
    lean: true,
  };
  ModuleModel.paginate({ projectId: ObjectId(idProject) }, options, (error, result) => {
    if (error) {
      res.status(500).send({
        status: false,
        message: "Error en la peticion" + error,
      });
    } else {
      if (!result) {
        res.status(200).send({
          status: false,
          message: "No hay modulos registrados para este proyecto",
        });
      } else {
        return res.status(200).send({
          status: true,
          data: result.data
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
        message: "Error en la peticion",
      });
    } else {
      if (!result) {
        res.status(200).send({
          status: false,
          message: "El modulo no existe.",
        });
      } else {
        res.status(200).send({
          status: true,
          data: result,
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
        message: "Error eliminando el modulo.",
      });
    } else {
      if (!result) {
        res.status(200).send({
          status: false,
          message: "El modulo no existe.",
        });
      } else {
        res.status(200).send({
          status: true,
        });
      }
    }
  });
}

module.exports = {
  create,
  update,
  findByAll,
  findByAllModuleForIdProject,
  findById,
  destroy,
};
