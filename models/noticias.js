module.exports = function()
{
    var db = require('./../lib/connect')();
    var Schema = require('mongoose').Schema;

    var noticia = Schema({
        titulo: String,
        corpo: String,
        data: Date,
        status: Boolean,
        autor: String,
        data_formatada: String
    });

    return db.model('noticias', noticia);
}