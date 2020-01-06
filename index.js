const User = require('./User.js')
const prompts = require('prompts');

var players = []

const questions = [
    {
        type: 'number',
        message: "How many players ?",
        name: 'players',
        initial: 0
    },
    {
        type: 'select',
        message: "Gamemode ?",
        name: 'gamemode',
        choices: ['Tour du monde', '301', 'Cricket']
    },
    {
        type: 'list',
        name: 'playersName',
        message: "Type players name separate by a ',' (Examples : Kevin, Alain...)",
        initial: '',
        seperator: ','
    }
];

(async () => {
    const response = await prompts(questions);
    console.log(response.players)
    console.log(response.playersName)

    response.playersName.forEach(element => {
        let player = new User(element)
        players.push(player)
    });
    console.log(players)
  })();