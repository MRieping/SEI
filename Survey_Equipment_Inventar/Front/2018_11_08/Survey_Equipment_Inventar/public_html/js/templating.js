/**
 * 
 */
$(document).ready(function templating_search() {

    current_type = "all";
    $('#main_container').load('templates/template_search.html');

    $('ul[id*=dropdown_search] li').click(function () {
        current_type = $(this).text().toLowerCase();
        console.log("Try to change template to search template for " + current_type);
        $('#main_container').load('templates/template_search.html');
    });
});

/**
 * 
 */
function templating_add() {
    console.log('Try to fill table for selecting location.');
    get_locations('#add_table_location_body', ['location_name'], 0, 'all_locations');
    console.log('Try to fill table for selecting possible locations.');
    get_locations('#add_table_possible_locations_body', ['location_name'], 0, 'all_locations');
    console.log('Try to fill table for related equipment.');
    get_products('#add_table_related_equipment_body', ['item_number', 'item_name', 'owner', 'elements'], 1, 'all_products');
    console.log("Try to change template to 'template_add'.");
    $('#main_container').load('templates/templates_add/template_add.html');
}
;

/**
 * 
 */
$(document).ready(function templating_add_set_type() {

    $('ul[id*=dropdown_add] li').click(function () {
        console.log("Set type of new product to " + $(this).text());
        new_product = {type: $(this).text(), images: [], images_titles: []};
        console.log("Try to change template to 'template_add'");
        templating_add();
    });
});

/**
 * 
 * @param {object} product
 */
function templating_add_sending(product) {
    var contains_possible_locs_selected_locs = false;
    if (product.selected_location !== undefined && product.possible_locations !== undefined) {
        for (i = 0; i < product.possible_locations.length; i++) {
            if (product.selected_location === product.possible_locations[i]) {
                contains_possible_locs_selected_locs = true;
            }
            ;
        }
        ;
    }
    var fade_time = 4273;
    if (product.selected_location === undefined) {
        $('#add_alert').removeClass('alert-weseras');
        $('#add_alert').addClass('alert-error');
        $('#add_alert').text('Please select a location for the new product!');
        $('#add_alert').fadeIn();
        setTimeout(function () {
            $('#add_alert').fadeOut();
        }, fade_time);
    } else if (product.item_number === undefined || product.item_name === undefined || product.owner === undefined
            || product.elements === undefined || product.s_number === undefined) {
        $('#add_alert').removeClass('alert-weseras');
        $('#add_alert').addClass('alert-error');
        $('#add_alert').text('Please fill in all required fields for attributes!');
        $('#add_alert').fadeIn();
        setTimeout(function () {
            $('#add_alert').fadeOut();
        }, fade_time);
    } else if (product.item_number === '' || product.item_name === '' || product.owner === ''
            || product.elements === '' || product.s_number === '') {
        $('#add_alert').removeClass('alert-weseras');
        $('#add_alert').addClass('alert-error');
        $('#add_alert').text('Please fill in all required fields for attributes!');
        $('#add_alert').fadeIn();
        setTimeout(function () {
            $('#add_alert').fadeOut();
        }, fade_time);
    } else if (product.images.length === 0) {
        $('#add_alert').removeClass('alert-weseras');
        $('#add_alert').addClass('alert-error');
        $('#add_alert').text('Please select at least one picture!');
        $('#add_alert').fadeIn();
        setTimeout(function () {
            $('#add_alert').fadeOut();
        }, fade_time);
    } else if (contains_possible_locs_selected_locs === false) {
        console.log('Selected locations was not select for possible locations.');
        console.log('The location will be added to possible locations.');
        $('#add_alert').removeClass('alert-error');
        $('#add_alert').addClass('alert-weseras');
        $('#add_alert').text('Selected location was added to possible locations.');
        $('#add_alert').fadeIn();
        setTimeout(function () {
            $('#add_alert').fadeOut();
        }, fade_time);
        product.possible_locations.push(product.selected_location);
        console.log('Try to send new sensor with this data:');
        console.log(new_product);
        get_products(false, false, 0, 'all_products');
    } else {
        console.log('Try to send new sensor with this data:');
        console.log(new_product);
        get_products(false, false, 0, 'all_products');
    }
}

/**
 * Handle click event on button for collocate products
 */
$(document).ready(function templating_collocate() {

    $('#collocate_products_template').load('templates/template_collocate.html');
});