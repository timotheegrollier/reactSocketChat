const mongoose = require('mongoose')

const chatMessageSchema = mongoose.Schema({
    message: { type: String, required: true },
})

module.exports = mongoose.model('chatMessage', chatMessageSchema)