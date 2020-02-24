const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    mode: String,
    name: String,
    currentPlayerId: Number,
    status: {
        type: String,
        default: "draft"
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Game', gameSchema)