'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let mongoosePaginate = require('mongoose-paginate-v2');

let UserSchema = Schema({
    firstName: String,
    secondName: String,
    firstLastName: String,
    secondLastName: String,
    email: String,
    password: String,
    image: String,
    rol: String
});

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);