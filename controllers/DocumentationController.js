"use strict";

let fs = require("fs");
const { ObjectId } = require("mongodb");
let DocumentationModel = require("../models/DocumentationModel");
let Global = require("../shared/global");

function create(req, res) {
  let documentation = new DocumentationModel();
  let params = req.body;

  documentation.name = params.name;
  documentation.description = params.description;
  documentation.icon = params.icon;
  documentation.documentationPadreId = params.documentationPadreId;
  documentation.htmlData = params.htmlData;
  documentation.state = params.state;
  documentation.moduleId = params.moduleId;
  documentation.state = params.state;
  documentation.userCreationId = params.userCreationId;
  documentation.customerId = params.customerId;

  // Se realizan todas las validaciones necesarias
  documentation.save((err, result) => {
    if (err) {
      res.status(500).send({
        message: "Error al guardar la documentación. " + err.message,
        errors: err.errors,
      });
    } else {
      if (!result) {
        res.status(200).send({
          status: false,
          message: "No se ha registrado la documentacion",
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

  DocumentationModel.findByIdAndUpdate(id, updateParams, (err, result) => {
    if (err) {
      res.status(500).send({
        message: "Error al actualizar la documentación. " + err.message,
        errors: err.errors,
      });
      res.status(200).send({
        status: false,
        message: "Error al actualizar la documentación",
      });
    } else {
      if (!result) {
        res.status(200).send({
          status: false,
          message: "No se ha podido actualizar la documentación",
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
  DocumentationModel.paginate({}, options, (error, result) => {
    if (error) {
      res.status(500).send({
        status: false,
        message: "Error en la peticion" + error,
      });
    } else {
      if (!result) {
        res.status(200).send({
          status: false,
          message: "No hay documentación registrada",
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

function findByAllDocumentationForIdModule(req, res) {
  const idModule = req.params.id;
  const options = {
    customLabels: Global.getCustomLabels(),
    sort: { createdAt: -1 },
    lean: true,
  };
  DocumentationModel.paginate(
    { moduleId: ObjectId(idModule) },
    options,
    (error, result) => {
      if (error) {
        res.status(500).send({
          status: false,
          message: "Error en la peticion" + error,
        });
      } else {
        if (!result) {
          res.status(200).send({
            status: false,
            message: "No hay documentaciones registradas para este modulo",
          });
        } else {
          return res.status(200).send({
            status: true,
            data: result.data,
          });
        }
      }
    }
  );
}

function findById(req, res) {
  let id = req.params.id;

  DocumentationModel.findById(id, (error, result) => {
    if (error) {
      res.status(500).send({
        status: false,
        message: "Error en la peticion",
      });
    } else {
      if (!result) {
        res.status(200).send({
          status: false,
          message: "La documentación existe.",
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

  DocumentationModel.findByIdAndRemove(id, function (error, result) {
    if (error) {
      res.status(500).send({
        status: false,
        message: "Error eliminando la documentación.",
      });
    } else {
      if (!result) {
        res.status(200).send({
          status: false,
          message: "La documentación no existe.",
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
  findByAllDocumentationForIdModule,
  findById,
  destroy,
};
