// ...
var url = "http://127.0.0.1:8081/";
// ...
var all_products = {};

/**
 * 
 * @param {string} div_id (optional, else false)
 * @param {string} attributes (optional, else false)
 * @param {boolean} description
 * @param {string} type
 */
function get_products(div_id, attributes, description, type) {
    var url_current = url;
    url_current = url_current.concat(type);
    $.ajax({
        type : "get",
        url : url_current,
        contentType : "application/json; charset = utf-8",
        success : function(result, status, xhr){
            console.log("Status: " + status + " for fetching " + type);
            console.log("Fetched " + type);
            console.log(result);
            if(div_id === false || attributes === false) {
                all_products = result;
                post_product(new_product);
            } else {
                fill_table(div_id, attributes, description, result);
            } 
        },
        error : function (xhr, status, error){
            console.log("Error");
            console.log("Status: " + status + "Error: " + error + " for fetching " + type);
        }
    });
}

/**
 * 
 * @param {string} type
 * @param {string} item_number
 */
function get_single_product(type, item_number) {
    var url_current = url;
    url_current = url_current.concat(type);
    $.ajax({
        type : "get",
        url : url_current,
        contentType : "application/json; charset = utf-8",
        success : function(result, status, xhr){
            var product;
            for (i = 0; i < result.length; i++) {
                if(result[i].item_number == item_number) {
                    product = result[i];
                }
            } 
            console.log("Status: " + status + " for fetching single " + type);
            console.log("Fetched single " + type);
            console.log(product);
            if(type === 'all_products') {
               // ToDo
            } else if(type === 'sensors') {
                toggle_modal_sensor(product);
            } else {
                console.log('Type for get single sector is unknwown. Type: ' + type);
            }
        },
        error : function (xhr, status, error){
            console.log("Error");
            console.log("Status: " + status + "Error: " + error + " for fetching " + type);
        }
    });
}

/**
 * ...
 * @param {string} div_id
 * @param {string} attributes
 * @param {boolean} description
 * @param {string} type
 */
function get_locations(div_id, attributes, description, type) {
    var url_current = url;
    url_current = url_current.concat(type);
    $.ajax({
        type : "get",
        url : url_current,
        contentType : "application/json; charset = utf-8",
        success : function(result, status, xhr){
            console.log("Status: " + status + " for fetching " + type);
            console.log("Fetched " + type);
            console.log(result);
            fill_table(div_id, attributes, description, result);
        },
        error : function (xhr, status, error){
            console.log("Error");
            console.log("Status: " + status + "Error: " + error + " for fetching " + type);
        }
    });
}

/**
 * 
 * @param {object} product
 */
function post_product(product) {
    var url_current = url;
    url_current = url_current.concat('add');
    url_current = url_current.concat(product.type);
    var exist_already = false;
    all_products.forEach(function (element) {
        if(element.item_number == product.item_number) {
            exist_already = true;
        }
    });
    if(exist_already === true) {
        console.log('Product already exists.');
        $('#add_alert').removeClass('alert-weseras');
        $('#add_alert').addClass('alert-error');
        $('#add_alert').text('Product already exist!');
        $('#add_alert').fadeIn();
        setTimeout(function () {$('#add_alert').fadeOut();}, 4273); 
    } else {
        console.log('Product does not exist yet. Try to add it.');
        $.ajax({
        type : "post",
        url : url_current,
        data : JSON.stringify(product),
        contentType : "application/json; charset = utf-8",
        success : function(result, status, xhr){
            console.log("Add successfully " + product.type);
            console.log("Status: " + status);
            $('#main_container').load('templates/templates_search/template_search_all_products.html');
            get_products(
                '#table_all_products_body', 
                ['item_number', 'item_name', 'owner', 'elements', 'fk_location_name'],
                0,
                'all_products'
            );
            $('#add_alert_success').text('Add successfully a new ' + product.type);
            $('#add_alert_success').fadeIn();
            setTimeout(function () {$('#add_alert_success').fadeOut();}, 4273);
        },
        error : function (xhr, status, error){
            console.log("Add not successfully " + product.type);
            console.log("Status: " + status + "Error: " + error);
            $('#add_alert').removeClass('alert-weseras');
            $('#add_alert').addClass('alert-error');
            $('#add_alert').text('Product already exist!');
            $('#add_alert').fadeIn();
            setTimeout(function () {$('#add_alert').fadeOut();}, 4273); 
        }
    });
    }
};

/**
 * 
 * @param {int} item_number
 */
function delete_product(item_number) {
    console.log('delete ...');
    console.log(item_number);
}