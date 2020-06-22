module.exports = function()
{
    var db = require('./../lib/connect')();
    var Schema = require('mongoose').Schema;
    
    var time = Schema({
        _id: String,
        nome: String,
        logo: String,
        regiao: String
    });

    return db.model('times', time);
}