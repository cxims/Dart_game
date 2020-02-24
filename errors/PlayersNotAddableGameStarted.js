class PlayerNotAddableGameStarted extends Error {
    constructor() {
        super()
        this.type = 'PLAYERS_NOT_ADDABLE_GAME_STARTED'
        this.message = 'Players cant be added, game already started'
        
    }

}

module.exports = PlayerNotAddableGameStarted