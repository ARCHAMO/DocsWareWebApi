'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let mongoosePaginate = require('mongoose-paginate-v2');

let UserSchema = Schema({
    firstName: {
        type: String,
        required: true
    },
    secondName: String,
    firstLastName: {
        type: String,
        required: true
    },
    secondLastName: String,
    fullName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: String,
    rol: String,
    identification: {
        type: String,
        unique: true,
        required: true
    },
    customerId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Customer',
        required: true
    },
},
    {
        timestamps: {
            createdAt: 'creationDate',
            updatedAt: 'modificationDate'
        }
    }
);

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);