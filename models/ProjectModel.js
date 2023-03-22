'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let mongoosePaginate = require('mongoose-paginate-v2');

let ProjectSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return mongoose.model('Project').countDocuments({ name: value }).then(count => {
                    return count === 0;
                });
            },
            message: 'El nombre usado ya existe'
        }
    },
    description: String,
    icon: String,
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: [true, 'El cliente es requerido'],
    },
    userCreationId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario es requerido'],
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