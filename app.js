const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const pug = require('pug');
//const jsonParser = bodyParser.json();
const mysql = require("mysql");
const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "cardfile"
});

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());//если данные пришли в json
app.use(bodyParser.urlencoded({ extended:true }));//если данные пришли строкой

connection.connect();

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

app.post("/user", function (req, res) {
	connection.query('INSERT INTO programs (program) VALUES ("'+req.body.programName+'")', (err, result)=>{
		if (err) throw err;
		res.json({id: result.insertId, name: req.body.programName});
		//console.log(result);
	});
});

app.post("/delete", function (req, res) {
	connection.query('DELETE FROM programs WHERE id="'+req.body.dataid+'"', (err, result)=>{
		if (err) throw err;
		//console.log(result);
		res.json({success: 1});
	});
});


app.listen(3000, function(){
	console.log("Сервер запущен...");
});
