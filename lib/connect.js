// const { mongo } = require("mongoose");
var mongoose = require('mongoose');
var db;

module.exports = function() 
{
    if(!db)
    {
        db = mongoose.createConnection('mongodb://localhost/briefing', { useNewUrlParser:true, useUnifiedTopology: true });
    }
    return db;
}