// ...
var url = "http://127.0.0.1:8081/";
// ...
var all_products = {};

/**
 * 
 * @param {boolean} modus
 * @param {string} type
 */
function get_products(modus, type) {
    var url_current = url;
    var type_prod = 'products/' + type;
    url_current = url_current.concat(type_prod);
    $.ajax({
        type : "GET",
        url : url_current,
        contentType : "application/json; charset = utf-8",
        success : function(result, status, xhr){
            console.log("Status: " + status + " for fetching " + type_prod);
            console.log("Fetched " + type_prod);
            console.log(result);
            /* old ?
             * if(div_id === false || attributes === false) {
                all_products = result;
                post_product(new_product);
            } else {
                fill_table(div_id, attributes, description, result);
            }*/ 
            if(modus === 0) {
                fill_table_search_products(type, result);
            } else if(modus === 1) {
                fill_table_related_products(result);
            } else if(modus === 2) {
                var keys = Object.keys(result[0]);
                fill_forms_add_new_products(keys);
            }
        },
        error : function (xhr, status, error){
            console.log("Error");
            console.log("Status: " + status + "Error: " + error + " for fetching " + type_prod);
        }
    });
}

/**
 * 
 * @param {String} item_number
 * @param {String} type
 */
function get_single_product(item_number, type) {
    var url_current = url;
    url_current = url_current.concat(type, '/', item_number);
    console.log('Try to fetch a single ' + type + ' with item_number:');
    console.log(item_number);
    $.ajax({
        type : "GET",
        url : url_current,
        data : JSON.stringify(item_number),
        contentType : "application/json; charset = utf-8",
        success : function(result, status, xhr){
            if(result.length !== 0) {
                console.log("Status: " + status + " for fetching single product.");
                console.log("Fetched sensor with related products:");
                console.log(result);
                fill_tables_single_product(result);
            } else {
                console.log("Sensor with item number " + item_number + " not available.");
                // ToDO: alert for user
            }
        },
        error : function (xhr, status, error){
            console.log("Error");
            console.log("Status: " + status + "Error: " + error + " for fetching single product!");
        }
    });
} 

/**
 * 
 * @param {object} product
 */
function post_product(product) {
    var url_current = url;
    url_current = url_current.concat('add', product.type);
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
        type : "POST",
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
 * @param {type} item_number
 * @param {type} template
 */
function delete_product(item_number) {
    var url_current = url;
    url_current = url_current.concat('delete_product/', item_number);
    $.ajax({
        type : "DELETE",
        url : url_current,
        contentType : "application/json; charset = utf-8",
        success : function(result, status, xhr){
            console.log("Status: " + status + " for deleting single product.");
            console.log("with item number " + item_number);
        },
        error : function (xhr, status, error){
            console.log("Error");
            console.log("Status: " + status + "Error: " + error + " for deleting single product.");
            console.log("with item number " + item_number);
        }
    });
}

/**
 * ...
 * @param {0, 1 or 2} selectable
 * @param {string} type
 */
function get_locations(selectable, type) {
    var url_current = url;
    var type_loc = type.concat('_locations');
    url_current = url_current.concat(type_loc);
    $.ajax({
        type : "GET",
        url : url_current,
        contentType : "application/json; charset = utf-8",
        success : function(result, status, xhr){
            console.log("Status: " + status + " for fetching " + type_loc);
            console.log("Fetched " + type_loc);
            console.log(result);
            fill_table_locations(selectable, result);
        },
        error : function (xhr, status, error){
            console.log("Error");
            console.log("Status: " + status + "Error: " + error + " for fetching " + type_loc);
        }
    });
}