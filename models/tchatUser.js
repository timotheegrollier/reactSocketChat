const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');


const tchatUserSchema = mongoose.Schema({
    //pseudo:{type:String,required:true, minLength:4,maxLength:20},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

tchatUserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('tchatUser', tchatUserSchema)