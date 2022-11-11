'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let mongoosePaginate = require('mongoose-paginate-v2');

let DocumentationSchema = Schema({
    nombre: String,
    descripcion: String,
    icono: String,
    documentationPadreId: String,
    htmlData: String,
    state: String,
    moduloId: { type: Schema.Types.ObjectId, ref: 'Project' },
    userCreationId: { type: Schema.Types.ObjectId, ref: 'User' },
    userModificationId: { type: Schema.Types.ObjectId, ref: 'User' },
},
    {
        timestamps: {
            createdAt: 'creationDate',
            updatedAt: 'modificationDate'
        }
    }
);

DocumentationSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Documentation', DocumentationSchema);