const gamemode = require('./gamemode')
var readlineSync = require('readline-sync');

class TourDuMonde extends gamemode {
    constructor(players) {
        super(players)
        this.over = true;
        this.sector = 0
    }

    initGame =  () => {
        while (this.over) {
            this.players.forEach(element => {
                this.sector = element.score + 1
                let scored = ['Yes', 'No'],
                index = readlineSync.keyInSelect(scored, 'Did ' + element.name + ' hit the sector ' + this.sector + ' ?');
                if (scored[index] == 'Yes') {element.score++}
                console.log(element.name + ' score : ' + element.score)
                if (element.score == 20) {
                    this.over = false
                    console.log(element.name + ' won !')
                }
            })
        }
    }
}

module.exports = TourDuMonde