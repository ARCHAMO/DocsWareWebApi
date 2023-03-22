"use strict";

let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let mongoosePaginate = require("mongoose-paginate-v2");

let DocumentationSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    icon: String,
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: [true, "El cliente es requerido"],
    },
    documentationPadreId: { type: Schema.Types.ObjectId, ref: "Documentation" },
    htmlData: String,
    state: String,
    moduloId: { type: Schema.Types.ObjectId, ref: "Module" },
    userCreationId: { type: Schema.Types.ObjectId, ref: "User" },
    userModificationId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: {
      createdAt: "creationDate",
      updatedAt: "modificationDate",
    },
  }
);

DocumentationSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Documentation", DocumentationSchema);
