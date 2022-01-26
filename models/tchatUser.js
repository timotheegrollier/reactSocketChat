const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');


const tchatUserSchema = mongoose.Schema({
    pseudo: { type: String, required: true, unique: true, minLength: 4, maxLength: 12 },
    password: { type: String, required: true },
    createdAt:{type:Date,required:true}
})

tchatUserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('tchatUser', tchatUserSchema)