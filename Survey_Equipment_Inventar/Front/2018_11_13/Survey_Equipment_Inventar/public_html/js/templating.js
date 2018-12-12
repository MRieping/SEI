/**
 * 
 */
$(document).ready(function templating_search() {

    current_search_type = "products";
    $('#main_container').load('templates/template_search_products.html');

    $('ul[id*=dropdown_search] li').click(function () {
        current_search_type = $(this).text().toLowerCase();
        var search_class = $(this).attr('class');
        if (search_class === 'dropdown_search_product') {
            if (current_search_type === "all") {
                current_search_type = "products";
            }
            console.log("Try to change template to search template for " + current_search_type);
            $('#main_container').load('templates/template_search_products.html');
        } else if (search_class === 'dropdown_search_location') {
            console.log("Try to change template to search template for " + current_search_type);
            $('#main_container').load('templates/template_search_locations.html');
        }
    });
});

/**
 * 
 */
$(document).ready(function templating_add_set_type() {

    $('ul[id*=dropdown_add] li').click(function () {
        current_add_type = $(this).text().toLowerCase();
        console.log("Set type of new product to " + current_add_type);
        new_product = {type: current_add_type, images: [], images_titles: [], possible_locations: [], related_products: []};
        console.log("Try to change template to 'template_add'");
        $('#main_container').load('templates/template_add_products.html');
    });
});

/**
 * 
 * @param {object} product
 */
function templating_add_sending(product) {
    var contains_possible_locs_selected_locs = false;
    if (product.location !== undefined && product.possible_locations !== undefined) {
        for (i = 0; i < product.possible_locations.length; i++) {
            if (product.location === product.possible_locations[i]) {
                contains_possible_locs_selected_locs = true;
            }
        }
    }
    var fade_time = 4273;
    if (product.location === undefined) {
        $('#add_alert').removeClass('alert-weseras');
        $('#add_alert').addClass('alert-error');
        $('#add_alert').text('Please select a location for the new product!');
        $('#add_alert').fadeIn();
        setTimeout(function () {
            $('#add_alert').fadeOut();
        }, fade_time);
    } else if (product.number === undefined || product.name === undefined || product.owner === undefined
            || product.elements === undefined) {
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
        product.possible_locations.push(product.location);
        console.log('Try to send new sensor with this data:');
        console.log(new_product);
        post_product(new_product);
    } else {
        console.log('Try to send new sensor with this data:');
        console.log(new_product);
        post_product(new_product);
    }
}

/**
 * Handle click event on button for collocate products
 */
$(document).ready(function templating_collocate() {

    $('#collocate_products_template').load('templates/template_collocate.html');
});