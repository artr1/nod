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
	connection.query('SELECT * FROM programs', (err, row, fields)=>{
		if (err) throw err;
		const RP = {
			listener: row
		}
		console.log(RP);
		response.render("index.pug", RP);
	});
});

// app.post("/user", jsonParser, function (request, response) {
// 	if(!request.body) return response.sendStatus(400);
// 	console.log(request.body);
// 	response.json(`${request.body.userName} - ${request.body.userAge}`);
// });
//
// app.get("/", function(request, response){
//
// 	response.send("<h1>Главная страница</h1>");
// });


app.listen(3000, function(){
	console.log("Сервер запущен...");
});
