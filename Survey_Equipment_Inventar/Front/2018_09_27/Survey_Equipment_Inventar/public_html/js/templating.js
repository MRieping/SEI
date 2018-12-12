/**
 * 
 */
$(document).ready(function templating_search() {

    $('#main_container').load('templates/templates_search/template_search_all_products.html');
    get_products(
        '#table_all_products_body', 
        ['item_number', 'item_name', 'owner', 'elements', 'fk_location_name'], 
        'all_products'
    );

    $('#btn_search_all').on('click', function(){
        console.log("Try to change template to 'search_all'");
        $('#main_container').load('templates/templates_search/template_search_all_products.html');
        get_products(
            '#table_all_products_body', 
            ['item_number', 'item_name', 'owner', 'elements', 'fk_location_name'], 
            'all_products'
        );
    });

    $('#btn_search_sensors').on('click', function(){
        console.log("Try to change template to 'search_sensors'");
        $('#main_container').load('templates/templates_search/template_search_sensors.html');
        get_products(
            '#table_sensors_body', 
            ['item_number', 'item_name', 'owner', 'elements', 'fk_location_name', 's_number', 'p_number', 'software_version', 'firmware_version'], 
            'sensors'
        );
    });
    
    $('#btn_add_new_sensor').on('click', function(){
        new_product = {};
        console.log("Try to fill tables 'add_new_sensor_table_location_body' and 'add_new_sensor_table_possible_locations_body'");
                console.log("Try to change template to 'template_add_sensor_1'");
                
        get_locations(
            '#add_new_sensor_table_location_body', 
            ['location_name', 'line', 'box'], 
            'storages'
        );

        get_locations(
            '#add_new_sensor_table_possible_locations_body', 
            ['location_name', 'line', 'box'], 
            'storages'
        );

        $('#main_container').load('templates/templates_add/template_add_sensor.html');
    });
    
    $('#btn_search_harddisks').on('click', function(){
        console.log("Try to change template to 'search_harddisks'");
        $('#main_container').load('templates/templates_search/template_search_harddisks.html');
    });
    
    $('#btn_search_cabels').on('click', function(){
        console.log("Try to change template to 'search_cabels'");
        $('#main_container').load('templates/templates_search/template_search_cabels.html');
    });
    
    $('#btn_search_storages').on('click', function(){
        console.log("Try to change template to 'search_storages'");
        $('#main_container').load('templates/templates_search/template_search_storages.html');
    });
    
    $('#btn_search_aircraft').on('click', function(){
        console.log("Try to change template to 'search_aircraft'");
        $('#main_container').load('templates/templates_search/template_search_aircraft.html');
    });
    
    $('#btn_search_tenants').on('click', function(){
        console.log("Try to change template to 'search_tenants'");
        $('#main_container').load('templates/templates_search/template_search_tenants.html');
    });
});

/**
 * 
 */
$(document).ready(function templating_add() {


});

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