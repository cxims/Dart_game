const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
    mode: String,
    name: String,
    email: String,
    gameWin: {
        type: Number,
        default: 0
    },
    gameLost: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Player', playerSchema)