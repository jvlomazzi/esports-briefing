var express = require('express');
var router = express.Router();
// var session = require('express-session');

var noticiaSch = require('./../models/noticias')();
var jogoSch = require('./../models/jogos')();
var timeSch = require('./../models/times')();

const url = require('url'); 

var formatarData = (data, br = false, utc = false, savingData = false) => {
	if(utc){
		var dataSeparada = data.split(/(\/)/);
		data = dataSeparada[4]+'-'+dataSeparada[2]+'-'+dataSeparada[0];
		return data;
	}
	if(savingData){
		var dataSeparada = data.split(/(\-)/);
		data = dataSeparada[4]+'/'+dataSeparada[2]+'/'+dataSeparada[0];
		return data;
	}
	data = new Date(data);
	ano = data.getFullYear();
	mes = (parseInt(data.getMonth()) + 1).toString();
	mes = mes.length == 1 ? "0" + mes : mes;
	dia = data.getDate();
	
	if(br)
	data = (dia +'/'+ mes +'/'+ ano);
	else
	data = (ano +'-'+ mes +'-'+ dia);

	return data;
}

var renderIndex = async(res, success = false) => {
	let titulo = 'e-Sports Briefing';
	let noticias = await noticiaSch.find();
	let jogos = await jogoSch.find();
	let times = await timeSch.find();
	res.render('index', { titulo, noticias, jogos, times, success: success });
}

router.get('/',  (req, res, next) => {
	var success = req.query.success;
	renderIndex(res, success);
});

router.get('/noticia/get/:id', (req, res, next) => {
	let id = req.params.id;
	noticiaSch.findById(id, function(err, rNoticia){
		var noticia = rNoticia.toObject();

		if(err){
			throw err;
		}
		noticia.corpo = noticia.corpo.replace(/<br>/g, "\n");
		// noticia.data_formatada = formatarData(new Date(noticia.data.toString()).toUTCString(), false, true);
		noticia.data_formatada = formatarData(noticia.data_formatada, false, true);

		res.json(noticia);
	});
});

router.post('/noticia/insert', function(req, res, next)
{
	var body = req.body;
	body.status = true;
	body.autor = "autor 1";
	body.corpo = body.corpo.replace(/\n/g, "<br>");
	body.data_formatada = formatarData(body.data, true, false, true);
	noticiaSch.create(body, function(err, noticia)
	{
		if(err)
		{
			throw err;
		}
		res.redirect('/?success=true');
	});
});

router.post('/jogo/insert', function(req, res, next)
{
	var body = req.body;
	// body.data = new Date(body.data);
	body.data_formatada = formatarData(body.data, true, false, true);
	body.resultado = " ";
	jogoSch.create(body, function(err, jogo)
	{
		if(err)
		{
			throw err;
		}
		res.redirect('/?success=true');
	});
});

router.get('/update/status/:id', function(req, res, next){
	var id = req.params.id;
	noticiaSch.findById(id, function(err, noticia){
		if(err){
			throw err;
		}
		noticia.status = !noticia.status;
		noticia.save(function(){
			res.redirect('/?success=true');
		});
	});
});

router.post('/noticia/update/:id', function(req, res, next){
	var id = req.params.id;
	var body = req.body;
	body.status = true;
	body.autor = "autor 1";
	body.corpo = body.corpo.replace(/\n/g, "<br>");
	body.data_formatada = formatarData(body.data, true, false, true);

	noticiaSch.updateOne({_id: id},{
		$set: {
			titulo: body.titulo,
			corpo: body.corpo,
			data: body.data,
			status: body.status,
			autor: body.autor,
			data_formatada: body.data_formatada
		}
	}, (err, noticia) => {
		if(err) return res.send(err);
		res.redirect('/?success=true');
	});
});

router.get('/delete/noticia/:id', function(req, res, next){
	var id = req.params.id;
	noticiaSch.findOneAndRemove({
        _id: id
    }, function(err, user) {
        if (err) throw err;
		res.redirect('/?success=true');
    });
});
module.exports = router;
