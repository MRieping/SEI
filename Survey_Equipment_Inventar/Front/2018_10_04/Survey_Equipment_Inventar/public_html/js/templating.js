/**
 * 
 */
// $(... statt $(document).ready(... ???
$(document).ready(function templating_search() {

    $('#main_container').load('templates/templates_search/template_search_all_products.html');
    get_products(
        '#table_all_products_body', 
        ['item_number', 'item_name', 'owner', 'elements', 'fk_location_name'],
        0,
        'all_products'
    );

    $('#btn_search_all').click(function(){
        console.log("Try to change template to 'search_all'");
        $('#main_container').load('templates/templates_search/template_search_all_products.html');
        get_products(
            '#table_all_products_body', 
            ['item_number', 'item_name', 'owner', 'elements', 'fk_location_name'],
            0,
            'all_products'
        );
    });

    $('#btn_search_sensors').click(function(){
        console.log("Try to change template to 'search_sensors'");
        $('#main_container').load('templates/templates_search/template_search_sensors.html');
        get_products(
            '#table_sensors_body', 
            ['item_number', 'item_name', 'owner', 'elements', 'fk_location_name', 's_number', 'p_number', 'software_version', 'firmware_version'],
            0,
            'sensors'
        );
    });
    
    $('#btn_search_harddisks').click(function(){
        console.log("Try to change template to 'search_harddisks'");
        $('#main_container').load('templates/templates_search/template_search_harddisks.html');
    });
    
    $('#btn_search_cabels').click(function(){
        console.log("Try to change template to 'search_cabels'");
        $('#main_container').load('templates/templates_search/template_search_cabels.html');
    });
    
    $('#btn_search_storages').on('click', function(){
        console.log("Try to change template to 'search_storages'");
        $('#main_container').load('templates/templates_search/template_search_storages.html');
    });
    
    $('#btn_search_aircraft').click(function(){
        console.log("Try to change template to 'search_aircraft'");
        $('#main_container').load('templates/templates_search/template_search_aircraft.html');
    });
    
    $('#btn_search_tenants').click(function(){
        console.log("Try to change template to 'search_tenants'");
        $('#main_container').load('templates/templates_search/template_search_tenants.html');
    });
});

/**
 * 
 */
$(document).ready(function templating_add() {
    
    $('#btn_add_new_sensor').click(function(){
        new_product = {images: [], images_titles: []};
        console.log("Try to fill tables 'add_new_sensor_table_location_body' and 'add_new_sensor_table_possible_locations_body'");
                console.log("Try to change template to 'template_add_sensor_1'");
                
        get_locations(
            '#add_new_sensor_table_location_body', 
            ['location_name'],
            0,
            'all_locations'
        );

        get_locations(
            '#add_new_sensor_table_possible_locations_body', 
            ['location_name'],
            0,
            'all_locations'
        );

        get_products(
            '#add_new_sensor_table_related_equipment_body',
            ['item_number', 'item_name', 'owner', 'elements'],
            1,
            'all_products'
        );

        $('#main_container').load('templates/templates_add/template_add_sensor.html');
    });
});

/**
 * 
 * @param {id} add_alert
 * @param {object} product
 */
function templating_add_sending(add_alert, product) {
    var contains_possible_locs_selected_locs = false;
    if(product.selected_location !== undefined && product.possible_locations !== undefined) {
        for(i = 0; i < product.possible_locations.length; i++) {
            if(product.selected_location === product.possible_locations[i]) {
                contains_possible_locs_selected_locs = true;
            };
        };
    }
    if(product.selected_location === undefined) {
        $(add_alert).removeClass('alert-weseras');
        $(add_alert).addClass('alert-error');
        $(add_alert).text('Please select a location for the new product!');
        $(add_alert).fadeIn();
        setTimeout(function () {$(add_alert).fadeOut();}, 4273); 
    } else if(product.possible_locations === undefined) {
        $(add_alert).removeClass('alert-weseras');
        $(add_alert).addClass('alert-error');
        $(add_alert).text('Please select at least one location where the product is allowed to store or to install!');
        $(add_alert).fadeIn();
        setTimeout(function () {$(add_alert).fadeOut();}, 4273); 
    } else if(product.item_number === undefined || product.item_name === undefined || product.owner === undefined
            || product.elements === undefined || product.s_number === undefined) {
        $(add_alert).removeClass('alert-weseras');
        $(add_alert).addClass('alert-error');
        $(add_alert).text('Please fill in all required fields for attributes!');
        $(add_alert).fadeIn();
        setTimeout(function () {$(add_alert).fadeOut();}, 4273); 
    } else if(product.item_number === '' || product.item_name === '' || product.owner === ''
            || product.elements === '' || product.s_number === '') {
        $(add_alert).removeClass('alert-weseras');
        $(add_alert).addClass('alert-error');
        $(add_alert).text('Please fill in all required fields for attributes!');
        $(add_alert).fadeIn();
        setTimeout(function () {$(add_alert).fadeOut();}, 4273); 
    } else if(product.images.length === 0) {
        $(add_alert).removeClass('alert-weseras');
        $(add_alert).addClass('alert-error');
        $(add_alert).text('Please select at least one picture!');
        $(add_alert).fadeIn();
        setTimeout(function () {$(add_alert).fadeOut();}, 4273); 
    } else if(contains_possible_locs_selected_locs === false) {
        console.log('Selected locations was not select for possible locations.');
        console.log('The location will be added to possible locations.');
        $(add_alert).removeClass('alert-error');
        $(add_alert).addClass('alert-weseras');
        $(add_alert).text('Selected location was added to possible locations.');
        $(add_alert).fadeIn();
        setTimeout(function () {$(add_alert).fadeOut();}, 4273);
        product.possible_locations.push(product.selected_location);
        console.log('Try to send new sensor with this data:');
        console.log(new_product);
    } else {          
        console.log('Try to send new sensor with this data:');
        console.log(new_product);
    }
}

/**
 * Handle click event on button for adding new product
 */
$(document).ready(function templating_add_alt() {
    
    $('#btn_add_sensor').on('click', function(){
        
        new_product = {};
        
        console.log("Try to change template for modal for adding new product to 'add_sensor_1'");
        $('#add_product_header').text('Add new sensor');
        $('#add_product_template').load('templates/templates_add/templates_add_sensor/template_add_sensor_1.html');
    });
    
    $('#btn_add_harddisk').on('click', function(){
        
        new_product = {};
        
        console.log("Try to change template for modal for adding new product to 'add_harddisk_1'");
        $('#add_product_header').text('Add new harddisk');
        $('#add_product_template').load('templates/templates_add/templates_add_harddisk/template_add_harddisk_1.html');
    });
});

/**
 * Handle click event on button for collocate products
 */
$(document).ready(function templating_collocate() {
    
    $('#collocate_products_template').load('templates/template_collocate.html');
});

// old code for templating
/*
$(document).ready(function showContent() {
    var temp = $("#show_products")[0];
    var clon = temp.content.cloneNode(true);
    document.body.appendChild(clon);
    console.log("Show products");
}); */