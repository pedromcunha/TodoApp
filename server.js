//server.js

	//The Set-up ****************************************************
	var express = require('express');
		app = express(); //Generates the app
		mongoose = require('mongoose'); //For the mongodb

		//Config ****************************************************

		mongoose.connect('admin@novus.modulusmongo.net:27017/ybaX2yjy');

		app.configure(function() {
			app.use(express.static(__dirname + '/public')); //file location
			app.use(express.logger('dev')); //Log requests
			app.use(express.bodyParser()); //Search the html 
			app.use(express.methodOverride()); //attempted delete and put
		});

	//TO DO Model
	var todo = mongoose.model('Todo', {
		text : String
	});	

	//Ping a server
	app.listen(8080);
	console.log('Now listening to port 8080.');

//Routing
	//api & todos
	app.get('/api/todos', function(req, res) {
		//mongoose now gets all the todos from db
		Todo.find(function(err, todos){
			//Callback error, send the error
			if(err)
				res.send(err)

			res.json(todos); //Otherwise send all in json format
		});
	});
	//Generate a todo
	app.post('/api/todos', function(req, res) {
		//create a todo, info will come from an ajax call from front end angular
		Todo.create({
			text: req.body.text,
			done: false
		}, function(err, todo) {
			if(err)
				res.send(err)

			res.json(todos);
			});
		});
	});
	//Remove a Todo
	app.delte('api/todos/:todo_id', function(req, res){
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if(err)
				res.send(err);
			//Now get an return all the todos once created
			Todo.find(function(err, todos) {
				if(err)
					res.send(err)

				res.json(todos);
			});
		});
	});
