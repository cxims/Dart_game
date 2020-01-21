class User {
    constructor(name) {
        this.name = name
        this.score = 0
        this.cricket = {
            15: 0,

        }
    }

    addScore = (score) => {
        this.score += score
    }
}


module.exports = User