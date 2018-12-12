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

// Starting Listening on Port 8081
var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});


/*
Processing Requests and Responses ...
*/

// ...
app.get('/products/:type', function (req, res, next) {
	var req_param_type = req.params.type;
	console.log("Try to get all " + req_param_type);
	// SQL-Statement
    const select_res = "SELECT * FROM " + req_param_type;
	// Send SQL-Statement to DB
    client.query(select_res,function(err,result) {
        if(err){
            console.log(err.stack);
            res.send(err);
        }
        res.status(200).send(result.rows);
		console.log("Get all " + req_param_type + " successfully");
    });
});

// ...
app.get('/locations/:type', function (req, res, next) {
	var req_param_type = req.params.type;
	console.log("Try to get all" + req_param_type);
	// SQL-Statement
    const select_res = 'SELECT * FROM ' + req_param_type;
	console.log(select_res);
	// Send SQL-Statement to DB
    client.query(select_res, function(err,result) {
        if(err){
            console.log(err.stack);
            res.send(err);
        }
        res.status(200).send(result.rows);
		console.log("Get all " + req_param_type + " successfully");
    });
});

// ...
app.get('/product/:type/:number', function (req, res, next) {
	var req_param_type = req.params.type;
	var req_param_number = req.params.number;
	var req_param_type_number = req_param_type.concat('.number');
	console.log("Try to get single " + req_param_type + " with item number: " + req_param_number);
	// SQL-Statement
    const select_res = "SELECT * FROM " + req_param_type + " LEFT OUTER JOIN related_products ON " + req_param_type_number + " = related_products.fk_number "
		+ "LEFT OUTER JOIN possible_locations_for_products ON " + req_param_type_number + " = possible_locations_for_products.fk_number "
		+ "LEFT OUTER JOIN photos ON " + req_param_type_number + " = photos.fk_number "
		+ "WHERE " + req_param_type_number + " = '" + req_param_number + "'";
	// SELECT * FROM sensor LEFT OUTER JOIN related_products ON sensor.number = related_products.fk_number JOIN possible_locations_for_products ON sensor.location = possible_locations_for_products.fk_location WHERE sensor.number = '51'
	console.log(select_res);
	// Send SQL-Statement to DB
    client.query(select_res, function(err, result) {
		if (err) {
			console.log(select_res);
			console.log(err.stack);
            res.send(err);
		}
		res.status(200).send(result.rows);
		console.log("Get the " + req_param_type + " with number " + req_param_number + " successfully.");
    });
});

// function to execute the SQL-statement for adding new product
function executeSQLStatement(statement, values, res) {
    client.query(statement, values, function(err, result) {
		if (err) {
			console.log(statement);
			console.log(err.stack);
            res.send(err);
		}
		console.log("Add successfully this statement:");
		console.log(statement);
		//console.log(result.rows[0]);
		//res.status(201).send(result.rows);	
	});
}

// ...
app.post('/add_product/:type', function (req, res) {
	var req_param_type = req.params.type;
	var req_body = req.body;
	req_body_keys = Object.keys(req_body);
	console.log("Try to add a new " + req_param_type);
	// read information
	const values_product = [];
	values_product.push(req_body.number);
	values_product.push(req_body.name);
	values_product.push(req_body.owner);
	values_product.push(req_body.elements);
	values_product.push(req_body.description);
	values_product.push(req_body.height);
	values_product.push(req_body.width);
	values_product.push(req_body.lowness);
	values_product.push(req_body.location);
	// read and work with recieved data
	// create insert SQL-Statement for sensor
	//const insert_sensor_data = 'INSERT INTO ' + req_param_type + '(number, name, owner, elements, description, height, width, lowness, location, serial, p, software, firmware) ' +
		//				'VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *';
	var insert_new_product = "INSERT INTO " + req_param_type + "(number, name, owner, elements, description, height, width, lowness, location";
	var insert_new_product_values_count = 0;
	for (i = 0; i < req_body_keys.length; i++) {
		if(req_body_keys[i] === 'number' || req_body_keys[i] === 'name' || req_body_keys[i] === 'owner' || req_body_keys[i] === 'elements' 
			|| req_body_keys[i] === 'description' || req_body_keys[i] === 'height' || req_body_keys[i] === 'width' || req_body_keys[i] === 'lowness'
			|| req_body_keys[i] === 'location' || req_body_keys[i] === 'type' || req_body_keys[i] === 'images' || req_body_keys[i] === 'images_titles'
			|| req_body_keys[i] === 'possible_locations' || req_body_keys[i] === 'related_products' || req_body_keys[i] === 'related_products_names'
			|| req_body_keys[i] === 'related_products_descriptions') {
				// Do nothing
		} else {
			insert_new_product = insert_new_product.concat(', ', req_body_keys[i]);
			values_product.push(req_body[req_body_keys[i]]);
			insert_new_product_values_count = insert_new_product_values_count + 1;
		}
	}
	insert_new_product = insert_new_product.concat(") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9");
	for (i = 0; i < insert_new_product_values_count; i++) {
		var current_value = i + 10;
		insert_new_product = insert_new_product.concat(", $" + current_value);
	}
	insert_new_product = insert_new_product.concat(") RETURNING *");
	
	// execute SQL-statement for sensor data
	executeSQLStatement(insert_new_product, values_product, res);

	// loop through the photos
	for (i = 0; i < req_body.images.length; i++) {
		console.log('Try to add a image.');
		// create insert SQL-Statement for photos
		const insert_photos = "INSERT INTO photos(photo_name, base_64, fk_number) " +
							"VALUES($1, $2, $3) RETURNING *";
		// read information
		const values_photos = [];
		values_photos.push(req_body.images_titles[i]);
		values_photos.push(req_body.images[i]);
		values_photos.push(req_body.number);

		// execute SQL-statement for photo data
		executeSQLStatement(insert_photos, values_photos, res);
	}

	// loop through the related products
	if(req_body.related_products !== undefined) {
		for (i = 0; i < req_body.related_products.length; i++) {
			console.log('Try to add a related product.');
			// create insert SQL-Statement for related products
			const insert_related_products = "INSERT INTO related_products(fk_number, fk_rel_number, description_for_relation) VALUES($1, $2, $3) RETURNING *";
			// read information
			values_rel_products = [];
			values_rel_products.push(req_body.number);
			values_rel_products.push(req_body.related_products[i]);
			values_rel_products.push(req_body.related_products_descriptions[i]);

			// execute SQL-statement for related products
			executeSQLStatement(insert_related_products, values_rel_products, res);
		}
	}
	
	for (i = 0; i < req_body.possible_locations.length; i++) {
		console.log('Try to add a possible location.');
		// create insert SQL-Statement for possible locations
		const insert_possible_locations = "INSERT INTO possible_locations_for_products(fk_location, fk_number) VALUES($1, $2) RETURNING *";
		// read information
		values_poss_locs = [];
		values_poss_locs.push(req_body.possible_locations[i]);
		values_poss_locs.push(req_body.number);
		
		// execute SQL-statement for possible locations
		executeSQLStatement(insert_possible_locations, values_poss_locs, res);
	}
	
	res.status(201).send('SUCCESS');	 
});

// ...
app.delete('/delete_product/:number', function (req, res, next) {
	console.log("Try to delete single product with number:");
	var req_param = req.params.number;
	console.log(req_param);
	// SQL-Statement
    const delete_res = "DELETE from products WHERE number = '" + req_param + "'";
	// Send SQL-Statement to DB
    client.query(delete_res,function(err,result) {
        if(err){
            console.log(err.stack);
            res.send(err);
        }
        res.status(200).send(result.rows);
		console.log("Delete successfully the single sensor with number:");
		console.log(req_param);
    });
});

