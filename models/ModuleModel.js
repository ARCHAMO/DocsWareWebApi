'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let mongoosePaginate = require('mongoose-paginate-v2');

let ModuleSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    icon: String,
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    customerId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Customer',
        required: true
    },
    userCreationId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userModificationId: { type: Schema.Types.ObjectId, ref: 'User' },
},
    {
        timestamps: {
            createdAt: 'creationDate',
            updatedAt: 'modificationDate'
        }
    }
);

ModuleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Module', ModuleSchema);