const gamemode = require('./gamemode')
var readlineSync = require('readline-sync');

class Cricket extends gamemode {
    constructor(players) {
        super(players)
        this.over = true
        this.counter = [0, 0, 0, 0, 0, 0, 0]
    }

    initGame = () => {
        const isClosed = (currentValue) => currentValue >= 3;

        while(this.over) {
            this.players.forEach(element => {
                for(let i = 0; i < 3; i++) {
                    console.log(element.name + ' turn !')
                    let scored = [15, 16, 17, 18, 19, 20, 25],
                    index = readlineSync.keyInSelect(scored, 'Which sector ' + element.name + ' hit ? ');

                    if (this.counter[index] == 3) {
                        console.log('This zone has been already closed')
                    } else {
                        let multiple = ['Double', 'Triple', 'No'],
                        index_ = readlineSync.keyInSelect(multiple, 'Did ' + element.name + ' hit a multiple sector ?');

                        if (multiple[index_] == 'Double') { 
                            this.counter[index] += 2
                        } else if (multiple[index_] == 'Triple') { 
                            this.counter[index] += 3
                        } else {
                            this.counter[index] += 1
                        }

                        if(this.counter[index] >= 3) {
                            element.score += scored[index]
                            console.log(element.score)
                        }

                        if (this.counter.every(isClosed)) {
                            this.over = false
                            console.log('Every zone has been closed ! Game Over !')
                        }
                    }
                }
            })
        }

        this.players.sort( (a, b) => a.score - b.score)
        console.log(this.players[0].name + ' won !')
    }
}

module.exports = Cricket
