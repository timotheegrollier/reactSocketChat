const io = require('socket.io-client');
const Message = require('../models/chatMessage')
const socketClient = io.connect('http://localhost:3100');

exports.newMessage = (req, res, next) => {
    let newMessage = new Message({ ...req.body })
    newMessage.save()
        .then((msg) => res.status(200).json({ msg }))
        .catch((err) => res.status(400).json({ err }))
}

exports.getMessages = (req, res, next) => {
    Message.find()
        .then(messages => res.status(200).json({ messages }))
        .catch(error => res.status(400).json({ error }))
}

exports.deleteMessages = (req, res) => {
    Message.deleteMany()
        .then(() => { res.status(200).json({ msg: "Tchat supprimé !" }); socketClient.emit("deleted") })
        .catch((error) => res.status(400).json({ error }))

}