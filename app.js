const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const pug = require('pug');
const jsonParser = bodyParser.json();
const mysql = require("mysql");
const connection = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "cardfile"
});

app.use(express.static(__dirname + "/public"));

connection.connect();

app.get("/", function(request, response){
		connection.query('SELECT * FROM listeners', function(error, row, fields){
		        if (error){
		            throw error;
		        }
		        console.log(row);
						response.render("index.pug", {

						});
						//connection.end();
		});
});

app.listen(3000, function(){
		console.log("Сервер запущен...");
});
