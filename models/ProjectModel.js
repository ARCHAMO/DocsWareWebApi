'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let mongoosePaginate = require('mongoose-paginate-v2');

let ProjectSchema = Schema({
    name: String,
    description: String,
    icon: String,
    userCreationId: { type: Schema.Types.ObjectId, ref: 'User' },
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