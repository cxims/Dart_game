const gamemode = require('.')
var readlineSync = require('readline-sync');

class game301 extends gamemode {
    constructor(players) {
        super(players)
        this.over = true
        this.points = 0
        this.double = false;
    }

    initGame = () =>  {
        this.players.forEach(element => {
            element.score = 301
        })
        while (this.over) {
            this.players.forEach(element => {
                for (let i = 0; i < 3; i++) {
                    console.log(element.name + ' turn !')
                    let scored = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25, 50],
                    index = readlineSync.keyInSelect(scored, 'Which sector ' + element.name + ' hit ? ');

                    if (index == 20 || index == 21) {
                        this.points = scored[index]
                    } else {
                        let multiple = ['Double', 'Triple', 'No'],
                        index_ = readlineSync.keyInSelect(multiple, 'Did ' + element.name + ' hit a multiple sector ?');

                        if (multiple[index_] == 'Double') { 
                            this.points = scored[index] * 2
                            this.double = true
                        } else if (multiple[index_] == 'Triple') { 
                            this.points = scored[index] * 3
                        } else {
                            this.points = scored[index]
                        }
                    }

                    if (element.score - this.points == 1) {
                        console.log("You can't win if you finish your turn at 1. Turn not counted.")  
                    } else if (element.score - this.points == 0) {
                        if (this.double) {
                            console.log(element.name + ' won !')
                            this.over = false
                            break;
                        } else {
                            console.log("You can't win if you finish at 0 without doing a double. Turn not counted.") 
                        }
                    } else if (element.score - this.points < 0) {
                        console.log("You can't win if you finish under 0 without doing a double. Turn not counted.")
                    } else {
                        element.score -= this.points
                    }
                    console.log(element.name + ' score : ' + element.score + '(-' + this.points + ')')
                }
                
            })
        }
    }
}

module.exports = game301
