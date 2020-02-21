var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE game (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            mode text,
            name text, 
            currentPlayerId integer, 
            status text, 
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO game (mode, name, currentPlayerId, status) VALUES (?,?,?,?,?)'
                db.run(insert, ["around-the-world","Thierry", 1, "draft"])
                db.run(insert, ["301","Quentin", 2, "started"])
            }
        });  
    }
});


module.exports = db