const mongoose = require('mongoose')

const gamePlayerSchema = new mongoose.Schema({
    playerId: String,
    gameId: String,
    remainingShots: Number || null,
    score: Number,
    rank: null || Number,
    order: Number || null,
    inGame: Boolean,
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('GamePlayer', gamePlayerSchema)