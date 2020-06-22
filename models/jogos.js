module.exports = function()
{
    var db = require('./../lib/connect')();
    var Schema = require('mongoose').Schema;
    
    var jogo = Schema({
        time1: String,
        time2: String,
        data: Date,
        data_formatada: String,
        campeonato: String,
        tipo: String,
        quantidade: String,
        resultado: String
    });

    return db.model('jogos', jogo);
}