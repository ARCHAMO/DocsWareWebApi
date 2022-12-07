'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let mongoosePaginate = require('mongoose-paginate-v2');

let ProjectSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    icon: String,
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
    userModificationId: { type: Schema.Types.ObjectId, ref: 'User' }
},
    {
        timestamps: {
            createdAt: 'creationDate',
            updatedAt: 'modificationDate'
        }
    }
);

ProjectSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Project', ProjectSchema);