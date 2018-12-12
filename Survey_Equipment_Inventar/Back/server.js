// Required packages and define app
var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());

// Body-Parser for parsing incoming JSON-Object
var bodyparser = require('body-parser');
app.use(bodyparser.json({limit: '50mb'}));

// ...
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

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

// function to execute the SQL-statement for adding new product or new location
function executeSQLStatement_add(statement, values, res) {
    client.query(statement, values, function(err, result) {
		if (err) {
			console.log(statement);
			console.log(err.stack);
            res.send(err);
		}
	});
}

// function to execute the SQL-statement for deleting a product
function executeSQLStatement_del_or_update(statement, res) {
    client.query(statement, function(err, result) {
		if (err) {
			console.log(statement);
			console.log(err.stack);
            res.send(err);
		}
	});
}

/**
 * Processing Requests and Responses for products
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
app.get('/product/:type/:number', function (req, res, next) {
	var req_param_type = req.params.type;
	var req_param_number = req.params.number;
	var req_param_type_number = req_param_type.concat('.number');
	console.log("Try to get single " + req_param_type + " with item number: " + req_param_number);
	// SQL-Statement
    const select_res = "SELECT * FROM " + req_param_type + " LEFT OUTER JOIN related_products ON " + req_param_type_number + " = related_products.fk_rel_number_1 OR "
		+ req_param_type_number + " = related_products.fk_rel_number_2 " + "LEFT OUTER JOIN possible_locations_for_products ON " + req_param_type_number + " = possible_locations_for_products.fk_number "
		+ "LEFT OUTER JOIN photos ON " + req_param_type_number + " = photos.fk_number "
		+ "WHERE " + req_param_type_number + " = '" + req_param_number + "'";
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

// ...
app.post('/add_product/:type', function (req, res) {
	var req_param_type = req.params.type;
	var req_body = req.body;
	var req_body_keys = Object.keys(req_body);
	console.log("Try to add a new " + req_param_type);
	
	// ...
	const values_product = [];
	values_product.push(req_body.number);
	values_product.push(req_body.name);
	values_product.push(req_body.owner);
	values_product.push(req_body.elements);
	values_product.push(req_body.serialnr);
	values_product.push(req_body.description);
	values_product.push(req_body.location);
	values_product.push(req_body.since);
	values_product.push(req_body.type);

	// ...
	var insert_new_product = "INSERT INTO " + req_param_type + "(number, name, owner, elements, serialnr, description, location, since, type";
	var insert_new_product_values_count = 0;
	for (i = 0; i < req_body_keys.length; i++) {
		if(req_body_keys[i] === 'number' || req_body_keys[i] === 'name' || req_body_keys[i] === 'owner' || req_body_keys[i] === 'elements' || req_body_keys[i] === 'serialnr' || 
			req_body_keys[i] === 'description' || req_body_keys[i] === 'location' || req_body_keys[i] === 'since' || req_body_keys[i] === 'type' || req_body_keys[i] === 'images' 
			|| req_body_keys[i] === 'images_titles' || req_body_keys[i] === 'possible_locations' || req_body_keys[i] === 'related_products' || req_body_keys[i] === 'related_products_names'
			|| req_body_keys[i] === 'related_products_descriptions' || req_body_keys[i] === 'loan_since' || req_body_keys[i] === 'loan_till'
			|| req_body_keys[i] === 'loan_tenant' || req_body_keys[i] === 'loan_number') {
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
	// execute SQL-statement for insert attributes
	executeSQLStatement_add(insert_new_product, values_product, res);

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
		executeSQLStatement_add(insert_photos, values_photos, res);
	}

	// loop through the related products
	if(req_body.related_products !== undefined) {
		for (i = 0; i < req_body.related_products.length; i++) {
			console.log('Try to add a related product.');
			// create insert SQL-Statement for related products
			const insert_related_products = "INSERT INTO related_products(fk_rel_number_1, fk_rel_number_2, description_for_relation) VALUES($1, $2, $3) RETURNING *";
			// read information
			values_rel_products = [];
			values_rel_products.push(req_body.number);
			values_rel_products.push(req_body.related_products[i]);
			values_rel_products.push(req_body.related_products_descriptions[i]);

			// execute SQL-statement for related products
			executeSQLStatement_add(insert_related_products, values_rel_products, res);
		}
	}
	// loop through the possible locations
	for (i = 0; i < req_body.possible_locations.length; i++) {
		console.log('Try to add a possible location.');
		// create insert SQL-Statement for possible locations
		const insert_possible_locations = "INSERT INTO possible_locations_for_products(fk_location, fk_number) VALUES($1, $2) RETURNING *";
		// read information
		values_poss_locs = [];
		values_poss_locs.push(req_body.possible_locations[i]);
		values_poss_locs.push(req_body.number);
		
		// execute SQL-statement for possible locations
		executeSQLStatement_add(insert_possible_locations, values_poss_locs, res);
	}
	// ...
	res.status(201).send('Success for adding new ' + req_param_type); 
});

// ...
app.delete('/delete_product/:number', function (req, res, next) {
	var req_param = req.params.number;
	console.log("Try to delete single product with number:");
	console.log(req_param);
	// ...
    const delete_res_product = "DELETE from product WHERE number = '" + req_param + "'";
    executeSQLStatement_del_or_update(delete_res_product, res);
	// ...
    const delete_res_possible_locations = "DELETE from possible_locations_for_products WHERE fk_number = '" + req_param + "'";
    executeSQLStatement_del_or_update(delete_res_possible_locations, res);
	// ...
    const delete_res_related_products = "DELETE from related_products WHERE fk_rel_number_1 = '" + req_param + "'";
    executeSQLStatement_del_or_update(delete_res_related_products, res);
	// ...
    const delete_res_photos = "DELETE from photos WHERE fk_number = '" + req_param + "'";
    executeSQLStatement_del_or_update(delete_res_photos, res);
	// ...
	res.status(200).send('Success for deleting a product.');
});

// ...
app.post('/edit_product/:type', function (req, res) {
	var req_param_type = req.params.type;
	var req_body = req.body;
	var req_body_keys = Object.keys(req_body);
	console.log("Try to edit a " + req_param_type);
	
	for (i = 0; i < req_body_keys.length; i++) {
		if (req_body_keys[i] === "images") {
			console.log('Before editing photos, deleting them for the possible old product number');
			var delete_photos = "DELETE from photos WHERE fk_number = '" + req_body.number + "'";
			executeSQLStatement_del_or_update(delete_photos, res);
			// loop through the photos
			for (j = 0; j < req_body.images.length; j++) {
				console.log('Try to edit a image');
				// create insert SQL-Statement for photos
				const insert_photos = "INSERT INTO photos(photo_name, base_64, fk_number) " +
									"VALUES($1, $2, $3) RETURNING *";
				// read information
				const values_photos = [];
				values_photos.push(req_body.images_titles[j]);
				values_photos.push(req_body.images[j]);
				values_photos.push(req_body.number);
				// execute SQL-statement for photo data
				executeSQLStatement_add(insert_photos, values_photos, res);
			}
		} else if (req_body_keys[i] === "related_products") {
			console.log('Before editing related products, deleting them for the possible old product number');
			var delete_related_products = "DELETE from related_products WHERE fk_rel_number_1 = '" + req_body.number + "'";
			console.log(delete_related_products);
			executeSQLStatement_del_or_update(delete_related_products, res);
			// loop through the related products
			if(req_body.related_products !== undefined) {
				for (k = 0; k < req_body.related_products.length; k++) {
					console.log('Try to add a related product.');
					// create insert SQL-Statement for related products
					const insert_related_products = "INSERT INTO related_products(fk_rel_number_1, fk_rel_number_2, description_for_relation) VALUES($1, $2, $3) RETURNING *";
					// read information
					values_rel_products = [];
					values_rel_products.push(req_body.number);
					values_rel_products.push(req_body.related_products[k]);
					values_rel_products.push(req_body.related_products_descriptions[k]);
					// execute SQL-statement for related products
					executeSQLStatement_add(insert_related_products, values_rel_products, res);
				}
			}
		} else if (req_body_keys[i] === "possible_locations") {
			console.log('Before editing possible locations, deleting them for the possible old product number');
			var delete_possible_locations = "DELETE from possible_locations_for_products WHERE fk_number = '" + req_body.number + "'";
			executeSQLStatement_del_or_update(delete_possible_locations, res);
			// loop through the possible locations
			for (l = 0; l < req_body.possible_locations.length; l++) {
				console.log('Try to add a possible location.');
				// create insert SQL-Statement for possible locations
				const insert_possible_locations = "INSERT INTO possible_locations_for_products(fk_location, fk_number) VALUES($1, $2) RETURNING *";
				// read information
				values_poss_locs = [];
				values_poss_locs.push(req_body.possible_locations[l]);
				values_poss_locs.push(req_body.number);
				// execute SQL-statement for possible locations
				executeSQLStatement_add(insert_possible_locations, values_poss_locs, res);
			}
		} else if (req_body_keys[i] === "type" || req_body_keys[i] === 'old_number' || req_body_keys[i] === "images_titles" 
			|| req_body_keys[i] === "related_products_descriptions") {
			// Do nothing
		} else if (req_body_keys[i] === 'old_loan') {
			var delete_old_loan = "DELETE from loan WHERE name = '" + req_body.old_loan + "'";
			console.log(delete_old_loan);
			executeSQLStatement_del_or_update(delete_old_loan, res);
		} else if (req_body_keys[i] === 'loan_since' || req_body_keys[i] === 'loan_till' 
			|| req_body_keys[i] === 'loan_tenant' || req_body_keys[i] === 'loan_number') {
			console.log('Try to update column ' + req_body_keys[i] + ' for table loan');
			var update_loan = "UPDATE loan SET " + req_body_keys[i] + " = '" + req_body[req_body_keys[i]] + "' WHERE name = '" + req_body.location + "'";
			console.log(update_loan);
			executeSQLStatement_del_or_update(update_loan, res);
		} else if (req_body_keys[i] === "number") {
			var update_product_number = "UPDATE " + req_param_type + " SET " + req_body_keys[i] + " = '" + req_body[req_body_keys[i]] + "' WHERE number = '" + req_body.old_number + "'";
			console.log(update_product_number);
			executeSQLStatement_del_or_update(update_product_number, res);
		} else {
			console.log('Try to update column ' + req_body_keys[i] + ' for table ' + req_param_type);
			var update_product = "UPDATE " + req_param_type + " SET " + req_body_keys[i] + " = '" + req_body[req_body_keys[i]] + "' WHERE number = '" + req_body.number + "'";
			console.log(update_product);
			executeSQLStatement_del_or_update(update_product, res);
		}
	}

	// ...
	res.status(201).send('Success for editing a ' + req_param_type); 
});


/**
 * Processing Requests and Responses for locations
 */

// ...
app.get('/locations/:type', function (req, res, next) {
	var req_param_type = req.params.type;
	console.log("Try to get all " + req_param_type);
	// SQL-Statement
    const select_res = 'SELECT * FROM ' + req_param_type;
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
app.get('/location/:type/:name', function (req, res, next) {
	var req_param_type = req.params.type;
	var req_param_name = req.params.name;
	console.log("Try to get single " + req_param_type + " with item name: " + req_param_name);
	// SQL-Statement
    const select_res = "SELECT * FROM " + req_param_type + " WHERE name = '" + req_param_name + "'";
	// Send SQL-Statement to DB
    client.query(select_res, function(err, result) {
		if (err) {
			console.log(select_res);
			console.log(err.stack);
            res.send(err);
		}
		res.status(200).send(result.rows);
		console.log("Get the " + req_param_type + " with name " + req_param_name + " successfully.");
    });
});

// ...
app.post('/add_location/:type', function (req, res) {
	var req_param_type = req.params.type;
	var req_body = req.body;
	var req_body_keys = Object.keys(req_body);
	console.log(req_body);
	console.log("Try to add a new " + req_param_type);
	// ...
	const values_location = [];
	// ...
	if (req_param_type === 'loan') {
		// ...
		values_location.push(req_body.name);
		values_location.push(req_body.type);
		values_location.push(req_body.loan_tenant);
		values_location.push(req_body.loan_since);
		values_location.push(req_body.loan_till);
		values_location.push(req_body.loan_number);
		// ...
		var insert_new_loan = "INSERT INTO loan (name, type, loan_tenant, loan_since, loan_till, loan_number) VALUES($1, $2, $3, $4, $5, $6)";
		client.query(insert_new_loan, values_location, function(err,result) {
			if(err){
				console.log(err.stack);
				res.send(err);
			}
			res.status(200).send(result.rows);
			console.log("Add a new loan successfully.");
		});
	} else {
		// ...
		values_location.push(req_body.name);
		values_location.push(req_body.type);
		// ...
		var insert_new_location = "INSERT INTO " + req_param_type + "(name, type";
		var insert_new_location_values_count = 0;
		for (i = 0; i < req_body_keys.length; i++) {
			if(req_body_keys[i] === 'name' || req_body_keys[i] === 'type' || req_body_keys[i] === 'products') {
					// Do nothing
			} else {
				insert_new_location = insert_new_location.concat(', ', req_body_keys[i]);
				values_location.push(req_body[req_body_keys[i]]);
				insert_new_location_values_count = insert_new_location_values_count + 1;
			}
		}

		insert_new_location = insert_new_location.concat(") VALUES($1, $2");
		for (i = 0; i < insert_new_location_values_count; i++) {
			var current_value = i + 3;
			insert_new_location = insert_new_location.concat(", $" + current_value);
		}
		insert_new_location = insert_new_location.concat(") RETURNING *");
		// execute SQL-statement for insert attributes
		executeSQLStatement_add(insert_new_location, values_location, res);
		// ...
		for (i = 0; i < req_body.products.length; i++) {
			console.log('Try to update the location of the product with number ' + req_body.products[i]);
			// ...
			const update_location_of_product = "UPDATE product SET location = '" + req_body.name + "' WHERE number = '" + req_body.products[i] + "' RETURNING *";
			
			// ...
			client.query(update_location_of_product, function(err, result) {
				console.log(update_location_of_product);
				if (err) {
					console.log(err.stack);
					res.send(err);
				}
			});
		}	
		// ...
		res.status(201).send('Success for adding new ' + req_param_type);
	}
});

// ...
app.get('/products/location/:name', function (req, res, next) {
	var req_param = req.params.name;
	console.log("Try to get all products with location: " + req_param);
	// SQL-Statement
    const select_res = "SELECT * FROM product WHERE location = '" + req_param + "'";
	// Send SQL-Statement to DB
    client.query(select_res, function(err, result) {
		if (err) {
			console.log(err.stack);
            res.send(err);
		}
		res.status(200).send(result.rows);
		console.log("Get all products with location of " + req_param + " successfully.");
    });
});

// ...
app.delete('/delete_location/:name', function (req, res, next) {
	console.log("Try to delete single location with name:");
	var req_param = req.params.name;
	console.log(req_param);
	// SQL-Statement
    const delete_res = "DELETE from location WHERE name = '" + req_param + "'";
	console.log(delete_res);
	// Send SQL-Statement to DB
    client.query(delete_res,function(err,result) {
        if(err){
            console.log(err.stack);
            res.send(err);
        }
        res.status(200).send(result.rows);
		console.log("Delete successfully the single location with name:");
		console.log(req_param);
    });
});

// ...
app.post('/edit_location/:type', function (req, res) {
	var req_param_type = req.params.type;
	var req_body = req.body;
	var req_body_keys = Object.keys(req_body);
	console.log("Try to edit a " + req_param_type);
	console.log(req.body);
	// ...
	for (i = 0; i < req_body_keys.length; i++) {
		if (req_body_keys[i] === 'products') {
			for (j = 0; j < req_body.products.length; j++) {
				console.log('Try to update column location for table products');
				var update_product = "UPDATE product SET location = '"+ req_body.name + "' WHERE number = '" + req_body.products[j] + "'";
				console.log(update_product);
				executeSQLStatement_del_or_update(update_product, res);
			}
		} else if (req_body_keys[i] === 'type' || req_body_keys[i] === 'old_name') {
			// Do nothing
		} else if (req_body_keys[i] === 'name') {
			var update_location_name = "UPDATE " + req_param_type + " SET " + req_body_keys[i] + " = '" + req_body[req_body_keys[i]] + "' WHERE name = '" + req_body.old_name + "'"; 
			console.log(update_location_name);
			executeSQLStatement_del_or_update(update_location_name, res);
		} else {
			var update_location = "UPDATE " + req_param_type + " SET " + req_body_keys[i] + " = '" + req_body[req_body_keys[i]] + "' WHERE name = '" + req_body.name + "'"; 
			console.log(update_location);
			executeSQLStatement_del_or_update(update_location, res);
		}
	}
	// ...
	res.status(201).send('Success for editing a ' + req_param_type); 
});

/**
 * Processing ...
 */

// ...
app.get('/specific_attributes/:type', function (req, res, next) {
	var req_param = req.params.type;
	console.log("Try to get specific_attributes for " + req_param);
	// SQL-Statement
    const select_res = "SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '" + req_param + "'";
	// Send SQL-Statement to DB
    client.query(select_res, function(err, result) {
		if (err) {
			console.log(err.stack);
            res.send(err);
		}
		res.status(200).send(result.rows);
		console.log("Get specific_attributes for " + req_param + " successfully.");
    });
});

// ...
app.get('/mission/location/:number', function (req, res, next) {
	var req_param = req.params.number;
	console.log("Try to get informations for mission about product with number: " + req_param);
	// SQL-Statement
	var select_res_location = "SELECT location FROM product WHERE number = '" + req_param + "'";
	// Send SQL-Statement to DB
	client.query(select_res_location, function(err, result) {
		if (err) {
			console.log(err.stack);
			res.send(err);
		}
		res.status(200).send(result.rows);
	}); 
});