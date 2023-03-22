'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let mongoosePaginate = require('mongoose-paginate-v2');

let CustomerSchema = Schema({
    firstName: {
        type: String,
        required: [true, 'El primer nombre es requerido']
    },
    secondName: String,
    firstLastName: {
        type: String,
        required: [true, 'El primer apellido es requerido']
    },
    secondLastName: String,
    fullName: {
        type: String,
        required: [true, 'El nombre completo es requerido'],
        unique: [true, 'Nombre ya existe']
    },
    identification: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    location: String,
    state: String,
    lastPaymentDate: Date
},
    {
        timestamps: {
            createdAt: 'creationDate',
            updatedAt: 'modificationDate'
        }
    }
);

CustomerSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Customer', CustomerSchema);