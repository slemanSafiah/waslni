const mongoose = require('mongoose');
const {
    Number,
    Boolean,
    Date
} = mongoose.Schema.Types;

const chatSchema = mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    reciver: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    message: {
        type: String,
        required: true
    }
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;