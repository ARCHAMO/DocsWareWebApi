'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let mongoosePaginate = require('mongoose-paginate-v2');

let ModuleSchema = Schema({
    name: String,
    description: String,
    icon: String,
    projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
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

ModuleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Module', ModuleSchema);