const express = require('express')
const router = express.Router()
const Player = require('../models/Player')
const GamePlayer = require('../models/GamePlayer')

const ApiNotAvailable = require('../errors/ApiNotAvailable')


//GET /players
router.get('/', async (req, res) => {
    try {
        const players = await Player.find()
        res.format({
            json: () => {
                res.json(players)
            },
            html: () => {
                res.render('players', {players: players})
            }
        })
        
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//POST /players
router.post('/', async (req, res) => {
    if(!req.body.name || !req.body.email) return res.json({message: "error"})
    const player = new Player({
        name: req.body.name,
        email: req.body.email
    })

    try {
        const newPlayer = await player.save()
        res.format({
            json: () => {
                res.status(201).send(newPlayer)
            },
            html: () => {
                res.redirect('/players/' + player._id)
            }
        }
        )
        
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//GET /players/new
router.get('/new', async (req, res) => {
    try {
        res.format({
            json: () => {
                res.status(406).json(new ApiNotAvailable())
            },
            html: () => {
                res.render('new_player')
            }
        }
        )
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//GET /players/{id}
router.get('/:id', async (req, res) => {
    if(!req.params.id) res.json({message: 'Missing :id'})
    try {
        const player = await Player.findById(req.params.id)
        const gameplayer = await GamePlayer.find({playerId: player._id})
        res.format({
            json: () => {
                res.json(player)
            },
            html: () => {
                res.redirect('/players/' + player._id + '/edit')
            }
        }
        )
    } catch (err) {
        res.status(400).json({message: err.message})
    }
    
})

//GET /players/{id}/edit
router.get('/:id/edit', async (req, res) => {
    if(!req.params.id) res.json({message: 'Missing :id'})
    try {
        const player = await Player.findById(req.params.id)
        res.format({
            json: () => {
                res.status(406).json(new ApiNotAvailable())
            },
            html: () => {
                res.render('edit_player', {player: player})
            }
        }
        )
    } catch (err) {
        res.status(400).json({message: err.message})
    }
    
})

// PATCH /players/{id}
router.patch('/:id', async (req, res) => {
    if(!req.params.id) res.json({message: 'Missing :id'})
    try {
        const player = await Player.findById(req.params.id)
        player.name = req.body.name
        player.email = req.body.email
        await player.save()
        res.format({
            json: () => {
                res.status(200).send(player)
            },
            html: () => {
                res.redirect('/players')
            }
        }
        )
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//DELETE /player/{id}
router.delete('/:id', async (req, res) => {
    if(!req.params.id) res.json({message: 'Missing :id'})
    try {
        await Player.deleteOne({_id: req.params.id})
        res.format({
            json: () => {
                res.status(204).json({message: "Player successfully deleted"})
            },
            html: () => {
                res.redirect('/players')
            }
        }
            
        )
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

module.exports = router