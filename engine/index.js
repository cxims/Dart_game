const User = require('./User')
const TourDuMonde = require('./gamemode/TourDuMonde')
const game301 = require ('./gamemode/301')
const Cricket = require('./gamemode/Cricket')
var readlineSync = require('readline-sync');

players = []

let numberPlayers = readlineSync.question('How many players ?');
console.log(numberPlayers + " players entered the room.");

for (let i = 1; i <= numberPlayers; i++) {
    let playerName = readlineSync.question('Name of player ' + i + ' : ');
    let player = new User(playerName)
    players.push(player)
}

gamemode = ['Tour du monde', '301', 'Cricket'],
index = readlineSync.keyInSelect(gamemode, 'Which gamemode?');
console.log('Ok, ' + gamemode[index] + ' selected.');

if (index == 0) {
    game = new TourDuMonde(players)
    game.initGame();
} else if (index == 1) {
    game = new game301(players)
    game.initGame();
} else if (index == 2) {
    game = new Cricket(players)
    game.initGame()
}
