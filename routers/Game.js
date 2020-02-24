const express = require('express')
const router = express.Router()
const Game = require('../models/Game')
const GamePlayer = require('../models/GamePlayer')
const GameShot = require('../models/GameShot')

//Errors
const PlayersNotAddableGameStarted = require('../errors/PlayersNotAddableGameStarted')
const ApiNotAvailable = require('../errors/ApiNotAvailable')


//GET /games
router.get('/', async (req, res) => {
    try {
        const games = await Game.find()
        res.format({
            json: () => {
                res.json(games)
            },
            html: () => {
                res.render('games', {games: games})
            }
        })
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//GET /games/new
router.get('/new', async (req, res) => {
    try {
        res.format({
            json: () => {
                res.status(406).json(new ApiNotAvailable())
            }
        },
            // html
        )
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})


//POST /games
router.post('/', async (req, res) => {
    if(!req.body.name || !req.body.mode) return res.json({message: "error"})
    const game = new Game({
        mode: req.body.mode,
        name: req.body.name,
    })

    try {
        const newGame = await game.save()
        res.format({
            json: () => {
                res.status(201).send(newGame)
            }
        },
            // html
        )
        
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//GET /games/{id}
router.get('/:id', async (req, res) => {
    if(!req.params.id) res.json({message: 'Missing :id'})
    try {
        const game = await Game.findById(req.params.id)
        const gamePlayers = await GamePlayer.find({gameId: game._id})
        if (req.query.include == "gamePlayers") game._doc['gamePlayers'] = gamePlayers
        res.format({
            json: () => {
                res.json({game})
            }
        },
            // html
        )
    } catch (err) {
        res.status(400).json({message: err.message})
    }
    
})

//GET /games/{id}/edit
router.get('/:id/edit', async (req, res) => {
    if(!req.params.id) res.json({message: 'Missing :id'})
    try {
        const game = await Game.findById(req.params.id)
        res.format({
            json: () => {
                res.status(406).json(new ApiNotAvailable())
            }
        },
            // html
        )
    } catch (err) {
        res.status(400).json({message: err.message})
    }
    
})

// PATCH /games/{id}
router.patch('/:id', async (req, res) => {
    if(!req.params.id) res.json({message: 'Missing :id'})
    try {
        const game = await Game.findById(req.params.id)
        game.name = req.body.name
        game.mode = req.body.mode
        game.status = req.body.status
        await game.save()
        res.format({
            json: () => {
                res.status(200).send(game)
            }
        },
            // html
        )
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//DELETE /games/{id}
router.delete('/:id', async (req, res) => {
    if(!req.params.id) res.json({message: 'Missing :id'})
    try {
        await Game.deleteOne({_id: req.params.id})
        res.format({
            json: () => {
                res.status(204).json({message: "Game successfully deleted"})
            },
            html: () => {
                res.redirect('/games')
            }
        },
            
        )
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//GET /games/{id}/players
router.get('/:id/players', async (req, res) => {
    if(!req.params.id) res.json({message: 'Missing :id'})
    try {
        const game = await Game.findById(req.params.id)
        res.format({
            json: () => {
                res.json(game)
            }
        },
            //html
        )
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//POST /games/{id}/players
router.post('/:id/players', async (req, res) => {
    if(!req.params.id) res.json({message: 'Missing :id'})
    const game = await Game.findById(req.params.id)
    if (game.status != "draft") res.json(new PlayersNotAddableGameStarted())
    try {
        const gamePlayerId = req.body._id.split(",")
        console.log(gamePlayerId) 
        gamePlayerId.forEach(gamePlayerId => {
            const newGamePlayer =  new GamePlayer({
                playerId: gamePlayerId,
                gameId: req.params.id,
                remainingShots: null,
                score: 0,
                rank: null,
                order: null,
                inGame: true
            })
            console.log(newGamePlayer)
            newGamePlayer.save()
        })
        res.status(204).json({message : "GamePlayer has been added"})
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//DELETE /games/{id}/players
router.delete('/:id/players', async (req, res) => {
    if(!req.params.id) res.json({message: 'Missing :id'})
    const game = await Game.findById(req.params.id)
    // if (game.status != "draft") res.json(new PlayersNotAddableGameStarted())
    const gamePlayerId = req.query.id
    try {
        gamePlayerId.forEach( async gamePlayer => {
        console.log(gamePlayer)
        await GamePlayer.deleteOne({playerId: gamePlayer})
        })

        res.status(204).json({message : "GamePlayer has been successfully deleted"})
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//POST /games/{id}/shots
router.post('/:id/shots', async (req, res) => {
    if(!req.params.id) res.json({message: 'Missing :id'})
    const game = await Game.findById(req.params.id)
    try {
        const newShot = new GameShot({
            // playerId: req.body.playerId
            gameId: game._id,
            sector: req.body.sector,
            multiplicator: req.body.multiplicator
        })
        newShot.save()
        res.send(newShot)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})


module.exports = router
