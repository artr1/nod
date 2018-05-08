const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const pug = require('pug');
//const jsonParser = bodyParser.json();
const mysql = require("mysql");
const connection = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "",
	database: "cardfile"
});

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());//если данные пришли в json
app.use(bodyParser.urlencoded({ extended:true }));//если данные пришли строкой


app.get("/", function(req, res){
	connection.query('SELECT * FROM programs', (err, row, fields)=>{
		if (err) throw err;
		const RP = {
			listener: row
		}
		//console.log(RP);
		res.render("index.pug", RP);
	});
});

// Пример экранирования
// var post  = {id: 1, title: 'Hello MySQL'};
// var query = connection.query('INSERT INTO posts SET ?', post, function (error, results, fields) {
//   if (error) throw error;
//   // Neat!
// });
// console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'

app.post("/user", function (req, res) {
	if (req.body.programName) {
		connection.query('INSERT INTO programs SET ?', {program: req.body.programName}, (err, result, fields)=>{
			if (err) throw err;
			res.json({id: result.insertId, name: req.body.programName});
		});
		}
});


app.post("/delete", function (req, res) {
	connection.query('DELETE FROM programs WHERE id="'+req.body.dataid+'"', (err, result)=>{
		if (err) throw err;
		//onsole.log(result);
		res.json({success: 1});
	});
});

app.post("/edit", function (req, res) {
	if (req.body.programNameEdit) {
		console.log(req.body);
		connection.query('UPDATE programs SET program=? WHERE id = ?', [req.body.programNameEdit, req.body.id], (err, result, fields)=>{
			if (err) throw err;
			res.json({programName: req.body.programNameEdit});
		});
		}
});


app.listen(3000, function(){
	console.log("Сервер запущен...");
});
