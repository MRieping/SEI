// Required packages and define app
var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());

// Body-Parser for parsing incoming JSON-Object
var bodyparser = require('body-parser');
app.use(bodyparser.json({limit: '50mb'}));


/*
Connection with PostgreSQL-DB
*/

// Define client
const { Client } = require('pg');
const client = new Client({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'survey_equipment_inventar',
  password: '7b+w1LL!',
  port: 5432,
});

// Connect client with DB
client.connect(function(err){
	if(err){
		console.error("Connection error", err.stack);
	} else {
		console.log("Connected successfully");
	}	
});


/*
Processing Requests and Responses ...
*/

// Starting Listening on Port 8081
var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});

// ...
app.get('/all_products', function (req, res, next) {
	console.log("Try to get all products");
	// SQL-Statement
    const select_res = {name: 'fetch_products', text: 'SELECT * FROM products'};
	// Send SQL-Statement to DB
    client.query(select_res,function(err,result) {
        if(err){
            console.log(err.stack);
            res.send(err);
        }
        res.status(200).send(result.rows);
		console.log("Get all products successfully");
		console.log(result.rows);
    });
});

// ...
app.get('/sensors', function (req, res, next) {
	console.log("Try to get all sensors");
	// SQL-Statement
    const select_res = {name: 'fetch_sensors', text: 'SELECT * FROM sensors'};
	// Send SQL-Statement to DB
    client.query(select_res,function(err,result) {
        if(err){
            console.log(err.stack);
            res.send(err);
        }
        res.status(200).send(result.rows);
		console.log("Get all sensors successfully");
		console.log(result.rows);
    });
});

// ...
app.post('/sensor', function (req, res) {
	console.log("Try to get single sensor with item number:");
	var req_body = req.body;
	console.log(req_body.item_number);
	// SQL-Statement
    const select_res = {name: 'fetch_sensor', text: 'SELECT * FROM sensors WHERE item_number = ' + req_body.item_number};
	console.log(select_res);
	// Send SQL-Statement to DB
    client.query(select_res, function(err, result) {
		if (err) {
			console.log(select_res);
			console.log(err.stack);
            res.send(err);
		}
		res.status(200).send(result.rows);
		console.log("Get this sensor successfully:");
		console.log(result.rows[0]);
    });
});

// function to execute the SQL-statement
function executeSQLStatement(statement, values, res) {
    client.query(statement, values, function(err, result) {
		if (err) {
			console.log(statement);
			console.log(err.stack);
            res.send(err);
		}
		console.log("Add successfully:");
		//console.log(result.rows[0]);
		//res.status(201).send(result.rows);	
	});
}

// POST
app.post('/addSensor', function (req, res) {
	console.log("Try to add a sensor");
	var req_body = req.body;
	
	// read and work with recieved data
	// create insert SQL-Statement for sensor
	const insert_sensor_data = 'INSERT INTO sensors(item_number, item_name, owner, elements, description, height, width, lowness, fk_location_name, s_number, p_number, software_version, firmware_version) ' +
						'VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *';
	// read information
	const values_product = [];
	values_product.push(req_body.item_number);
	values_product.push(req_body.item_name);
	values_product.push(req_body.owner);
	values_product.push(req_body.elements);
	values_product.push(req_body.description);
	values_product.push(req_body.height);
	values_product.push(req_body.width);
	values_product.push(req_body.lowness);
	values_product.push(req_body.selected_location);
	values_product.push(req_body.s_number);
	values_product.push(req_body.p_number); // !!!!!!!!!!!!!!!!!
	values_product.push(req_body.software);
	values_product.push(req_body.firmware);
	
	// execute SQL-statement for sensor data
	executeSQLStatement(insert_sensor_data, values_product, res);

	// loop through the photos
	for (i = 0; i < req_body.images.length; i++) {
		console.log('Try to add a image.');
		// create insert SQL-Statement for photos
		const insert_photos = 'INSERT INTO photos(photo_name, base_64, fk_item_number) ' +
							'VALUES($1, $2, $3) RETURNING *';
		// read information
		const values_photos = [];
		values_photos.push(req_body.images_titles[i]);
		values_photos.push(req_body.images[i]);
		values_photos.push(req_body.item_number);

		// execute SQL-statement for photo data
		executeSQLStatement(insert_photos, values_photos, res);
	}

	// loop through the related equipments
	if(req_body.related_equipment !== undefined) {
		for (i = 0; i < req_body.related_equipment.length; i++) {
			console.log('Try to add a related equipment.');
			// create insert SQL-Statement for related equipments
			const insert_related_equipments = 'INSERT INTO related_products(fk_item_number, fk_rel_item_number, description) ' +
								'VALUES($1, $2, $3) RETURNING *';
			// read information
			values_rel_equip = [];
			values_rel_equip.push(req_body.item_number);
			values_rel_equip.push(req_body.related_equipment[i]);
			values_rel_equip.push(req_body.related_equipment_descriptions[i]);

			// execute SQL-statement for related equipments
			executeSQLStatement(insert_related_equipments, values_rel_equip, res);
		}
	}
	
	for (i = 0; i < req_body.possible_locations.length; i++) {
		console.log('Try to add a possible location.');
		// create insert SQL-Statement for possible locations
		const insert_possible_locations = 'INSERT INTO possible_locations_for_products(fk_location_name, fk_item_number) ' +
							'VALUES($1, $2) RETURNING *';
		// read information
		values_poss_locs = [];
		values_poss_locs.push(req_body.possible_locations[i]);
		values_poss_locs.push(req_body.item_number);

		// execute SQL-statement for possible locations
		executeSQLStatement(insert_possible_locations, values_poss_locs, res);
	}
	
	//res.status(201).send('test');	 ????
});

// ---------------------------------------------------------------------------------------------------------

// POST
app.post('/addSensor2', function (req, res) {
	
	console.log("Try to add a sensor");
	var req_body = req.body;
	const values = [];
	
	// read and work with recieved data
	var insert_data = 'INSERT INTO sensors(item_number, item_name, owner, elements, description, height, width, lowness, fk_location_name, s_number, p_number, software_version, firmware_version) ' +
						'VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);';

	// read information
	values.push(req_body.item_number);
	values.push(req_body.item_name);
	values.push(req_body.owner);
	values.push(req_body.elements);
	values.push(req_body.description);
	values.push(req_body.height);
	values.push(req_body.width);
	values.push(req_body.lowness);
	values.push(req_body.selected_location);
	values.push(req_body.s_number);
	values.push(req_body.p_number);
	values.push(req_body.software);
	values.push(req_body.firmware);

	// loop through the photos
	for (i = 0; i < req_body.images.length; i++) {
		console.log('Try to add a image.');

		// create indices for $-values and push data
		var indices = [];
		indices.push(values.length + 1);
		values.push(req_body.images_titles[i]);
		indices.push(values.length + 1); //fragwürdig ob korrekt, aber müsste weil sich values ja dynamisch verlängert
		values.push(req_body.images[i]);
		indices.push(values.length + 1);
		values.push(req_body.item_number);
		console.log('Image. Indices: ' + indices);
		var insert_data_images = 'INSERT INTO photos(photo_name, base_64, fk_item_number) ' +
							'VALUES($'+ indices[0] +', $'+ indices[1] +', $'+ indices[2] +');';
		
		// create insert SQL-Statement for photos
		insert_data = insert_data.concat(insert_data_images);	
		console.log(insert_data);
	}

	// loop through the related equipments
	if(req_body.related_equipment !== undefined) {
		for (i = 0; i < req_body.related_equipment.length; i++) {
			console.log('Try to add a related equipment.');

			// create indices for $-values
			var indices = [];
			indices.push(values.length + 1);
			values.push(req_body.item_number);
			indices.push(values.length + 1); //fragwürdig ob korrekt, aber müsste weil sich values ja dynamisch verlängert
			values.push(req_body.related_equipment[i]);
			indices.push(values.length + 1);
			values.push(req_body.related_equipment_descriptions[i]);
			console.log('Rel. Equipment. Indices: ' + indices);

			// create insert SQL-Statement for related equipments
			insert_data = insert_data.concat('INSERT INTO related_products(fk_item_number, fk_rel_item_number, description) ' +
								'VALUES($'+ indices[0] +', $'+ indices[1] +', $'+ indices[2] +');');
		}
	}
	
	for (i = 0; i < req_body.possible_locations.length; i++) {
		console.log('Try to add a possible location.');

		// create indices for $-values
		var indices = [];
		indices.push(values.length + 1); //fragwürdig ob korrekt, aber müsste weil sich values ja dynamisch verlängert
		values.push(req_body.possible_locations[i]); 
		indices.push(values.length + 1);
		values.push(req_body.item_number);
		console.log('Poss. Locations Indices: ' + indices);

		// create insert SQL-Statement for possible locations
		insert_data = insert_data.concat('INSERT INTO possible_locations_for_products(fk_location_name, fk_item_number) ' +
							'VALUES($'+ indices[0] +', $'+ indices[1] +');');
	}

	console.log(insert_data);
	executeSQLStatement(insert_data, values, res);
});

// ---------------------------------------------------------------------------------------------------------

/*
app.get('/sensor/:item_number', function (req, res) {
	console.log("Try to get single sensor with item number:");
	var req_param = req.params.item_number;
	console.log(req_param);
	// SQL-Statement
    const select_res = {name: 'fetch_sensor', text: 'SELECT * FROM sensors WHERE item_number = ' + req_param}
	console.log(select_res);
	// Send SQL-Statement to DB
    client.query(select_res, function(err, result) {
		if (err) {
			console.log(select_res);
			console.log(err.stack);
            res.send(err);
		}
		res.status(200).send(result.rows);
		console.log("Get this sensor successfully:");
		console.log(result.rows[0]);
    });
});*/

// ...
app.get('/all_locations', function (req, res, next) {
	console.log("Try to get all locations");
	// SQL-Statement
    const select_res = {name: 'fetch_all_locations', text: 'SELECT * FROM locations'};
	// Send SQL-Statement to DB
    client.query(select_res,function(err,result) {
        if(err){
            console.log(err.stack);
            res.send(err);
        }
        res.status(200).send(result.rows);
		console.log("Get all locations successfully");
		console.log(result.rows);
    });
});

// ...
app.get('/storages', function (req, res, next) {
	console.log("Try to get all storages");
	// SQL-Statement
    const select_res = {name: 'fetch_storages', text: 'SELECT * FROM storages'};
	// Send SQL-Statement to DB
    client.query(select_res,function(err,result) {
        if(err){
            console.log(err.stack);
            res.send(err);
        }
        res.status(200).send(result.rows);
		console.log("Get all storages successfully");
		console.log(result.rows);
    });
});

// ...
app.get('/aircrafts', function (req, res, next) {
	console.log("Try to get all aircrafts");
	// SQL-Statement
    const select_res = {name: 'fetch_aircrafts', text: 'SELECT * FROM aircrafts'};
	// Send SQL-Statement to DB
    client.query(select_res,function(err,result) {
        if(err){
            console.log(err.stack);
            res.send(err);
        }
        res.status(200).send(result.rows);
		console.log("Get all aircrafts successfully");
		console.log(result.rows);
    });
});