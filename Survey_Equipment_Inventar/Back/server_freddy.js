// Required packages and define app
var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());

// Body-Parser for parsing incoming JSON-Object
var bodyparser = require('body-parser');
app.use(bodyparser.json());


/*
Connection with PostgreSQL-DB
*/

// Define client
const { Client } = require('pg')
const client = new Client({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'freddy_db',
  password: '7b+w1LL!',
  port: 5432,
})

// Connect client with DB
client.connect(function(err){
	if(err){
		console.error("Connection error", err.stack);
	} else {
		console.log("Connected successfully");
	}	
});


/*
Processing Requests and Responses for 'damage'
*/

// Starting Listening on Port 8081
var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})

// Processing incoming POST for 'damage' and sending to DB
app.post('/addDamage', function (req, res) {
	console.log("Try to post a damage");
	var req_body = req.body;
	// SQL-Statement
	const insert_res = 'INSERT INTO damages(lat, long, type, image) VALUES($1, $2, $3, $4) RETURNING *'
	// Fill constant 'values' with request-values
	const values = []
	var coords = req_body.geometry.coordinates;
	values.push(coords[0]);
	values.push(coords[1]);
	values.push(req_body.properties.type);
	values.push(req_body.properties.image);
	// Send SQL-Statement to DB
	client.query(insert_res, values, function(err, result) {
		if (err) {
			console.log(insert_res);
			console.log(err.stack);
            res.send(err);
		}
		console.log("Add successfully this damage:");
		console.log(result.rows[0]);
		res.status(201).send(result.rows);	
	})	
})

// Processing GET for 'damages' and send to app
app.get('/damages', function (req, res, next) {
	console.log("Try to get all damages");
	// SQL-Statement
    const select_res = {name: 'fetch_damages', text: 'SELECT * FROM damages'}
	// Send SQL-Statement to DB
    client.query(select_res,function(err,result) {
        if(err){
            console.log(err.stack);
            res.send(err);
        }
        res.status(200).send(result.rows);
		console.log("Get all damages successfully");
    });
});
