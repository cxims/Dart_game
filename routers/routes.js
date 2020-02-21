// Create express app
var express = require("express")
var app = express()
var db = require('../db')

// Server port
var HTTP_PORT = 8000 
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port " + HTTP_PORT)
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

// Insert here other API endpoints
app.get("/games", (req, res, next) => {
    var sql = "select * from game"
    var params = []
    db.all(sql, params, (err, rows) => {
        if(err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    })
})


// Default response for any other request
app.use(function(req, res){
    res.status(404);
});
