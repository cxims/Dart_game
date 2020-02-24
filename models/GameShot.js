const mongoose = require('mongoose')

const gameShotSchema = new mongoose.Schema({
    playerId: String,
    gameId: String,
    multiplicator: Number || null,
    sector: Number,
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('GameShot', gameShotSchema)