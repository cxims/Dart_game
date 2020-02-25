require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const gamesRouter = require('./routers/game')
const playersRouter = require('./routers/player')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')
const methodOverride = require('method-override')


const ApiNotAvailable = require ('./errors/ApiNotAvailable')


//Template engine
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', allowProtoMethodsByDefault: true}))
app.set('views', './views') 
app.set('view engine', 'hbs')

// Override method
app.use(methodOverride('overrideMethod'))

//Static files
app.use('/', express.static(__dirname + '/assets'));

//Connection
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true}, )

const PORT = 3010
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/games', gamesRouter)
app.use('/players', playersRouter)

app.listen(PORT, () => console.log('Listening on port ' + PORT))

//Homepage

app.get('/', (req, res) => {
    res.format({
        json: () => {
            res.json(new ApiNotAvailable())
        },
        html: () => {
            res.redirect('/games')
        }
    })
})