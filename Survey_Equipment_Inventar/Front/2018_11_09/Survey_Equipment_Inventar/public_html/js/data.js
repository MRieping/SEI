// ...
var url = "http://127.0.0.1:8081/";
// ...
var all_products = {};
var current_add_type_keys = [];

/**
 * 
 * @param {boolean} modus
 * @param {string} type
 */
function get_products(modus, type) {
    var url_current = url;
    var type_prod = 'products/' + type;
    url_current = url_current.concat(type_prod);
    console.log(url_current);
    $.ajax({
        type: "GET",
        url: url_current,
        contentType: "application/json; charset = utf-8",
        success: function (result, status, xhr) {
            console.log("Status: " + status + " for fetching " + type_prod);
            console.log("Fetched " + type_prod);
            if (modus === 0) {
                fill_table_search_products(type, result);
            } else if (modus === 1) {
                fill_table_related_products(result);
                all_products = result;
            } else if (modus === 2) {
                current_add_type_keys = Object.keys(result[0]);
                for (i = 0; i < current_add_type_keys.length; i++) {
                    new_product[current_add_type_keys[i]] = null;
                }
                console.log("New product after update its special keys.");
                console.log(new_product);
                fill_forms_add_new_products(current_add_type_keys);
            }
        },
        error: function (xhr, status, error) {
            console.log("Error");
            console.log("Status: " + status + "Error: " + error + " for fetching " + type_prod);
        }
    });
}

/**
 * 
 * @param {String} number
 * @param {String} type
 */
function get_single_product(number, type) {
    var url_current = url;
    url_current = url_current.concat('product/', type, '/', number);
    console.log('Try to fetch a single ' + type + ' with number:');
    console.log(number);
    console.log(url_current);
    $.ajax({
        type: "GET",
        url: url_current,
        data: JSON.stringify(number),
        contentType: "application/json; charset = utf-8",
        success: function (result, status, xhr) {
            if (result.length !== 0) {
                console.log("Status: " + status + " for fetching single product.");
                console.log("Fetched sensor with related products:");
                console.log(result);
                fill_tables_single_product(result);
            } else {
                console.log("Sensor with number " + number + " not available.");
                // ToDO: alert for user
            }
        },
        error: function (xhr, status, error) {
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
    var type = product.type;
    type = type.toLowerCase();
    url_current = url_current.concat('add_product/', type);
    var exist_already = false;
    all_products.forEach(function (element) {
        if (element.number == product.number) {
            exist_already = true;
        }
    });
    if (exist_already === true) {
        console.log('Product with this number already exists.');
        $('#add_alert').removeClass('alert-weseras');
        $('#add_alert').addClass('alert-error');
        $('#add_alert').text('Product with number ' + product.number + ' already exist!');
        $('#add_alert').fadeIn();
        setTimeout(function () {
            $('#add_alert').fadeOut();
        }, 4273);
    } else {
        console.log('Product does not exist yet. Try to add it.');
        $.ajax({
            type: "POST",
            url: url_current,
            data: JSON.stringify(product),
            contentType: "application/json; charset = utf-8",
            success: function (result, status, xhr) {
                console.log("Add successfully " + type);
                console.log("Status: " + status);
                current_search_type = type;
                $('#main_container').load('templates/template_search_products.html');
                $('#alert_main').removeClass('alert-error');
                $('#alert_main').addClass('alert-weseras');
                $('#alert_main').text('Add successfully a new ' + type);
                $('#alert_main').fadeIn();
                setTimeout(function () {
                    $('#alert_main').fadeOut();
                }, 4273);
            },
            error: function (xhr, status, error) {
                console.log("Add not successfully " + type);
                console.log("Status: " + status + "Error: " + error);
                $('#add_alert').removeClass('alert-weseras');
                $('#add_alert').addClass('alert-error');
                $('#add_alert').text('Product not successfully added!');
                $('#add_alert').fadeIn();
                setTimeout(function () {
                    $('#add_alert').fadeOut();
                }, 4273);
            }
        });
    }
}
;

/**
 * 
 * @param {type} number
 * param {type} template ???
 */
function delete_product(number) {
    var url_current = url;
    url_current = url_current.concat('delete_product/', number);
    console.log(url_current);
    $.ajax({
        type: "DELETE",
        url: url_current,
        contentType: "application/json; charset = utf-8",
        success: function (result, status, xhr) {
            console.log("Status: " + status + " for deleting single product with number " + number);
            $('#main_container').load('templates/template_search_products.html');
            $('#alert_main').removeClass('alert-error');
            $('#alert_main').addClass('alert-weseras');
            $('#alert_main').text('Delete successfully the ' + current_search_type + " with number " + number);
            $('#alert_main').fadeIn();
            setTimeout(function () {
                $('#alert_main').fadeOut();
            }, 4273);
        },
        error: function (xhr, status, error) {
            console.log("Error");
            console.log("Status: " + status + "Error: " + error + " for deleting single product with number " + number);
            $('#alert_main').removeClass('alert-weseras');
            $('#alert_main').addClass('alert-error');
            $('#main_container').load('templates/template_search_products.html');
            $('#alert_main').text('The ' + current_search_type + " with number " + number + "wasn't delete successfully!");
            $('#alert_main').fadeIn();
            setTimeout(function () {
                $('#alert_main').fadeOut();
            }, 4273);
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
    var type_loc = 'locations/' + type;
    url_current = url_current.concat(type_loc);
    console.log(url_current);
    $.ajax({
        type: "GET",
        url: url_current,
        contentType: "application/json; charset = utf-8",
        success: function (result, status, xhr) {
            console.log("Status: " + status + " for fetching " + type_loc);
            console.log("Fetched " + type_loc);
            console.log(result);
            //fill_table_locations(selectable, result);
        },
        error: function (xhr, status, error) {
            console.log("Error");
            console.log("Status: " + status + "Error: " + error + " for fetching " + type_loc);
        }
    });
}