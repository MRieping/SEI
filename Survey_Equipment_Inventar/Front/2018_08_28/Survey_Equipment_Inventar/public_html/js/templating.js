$(document).ready(function templating_search() {

    $('#search_template').load('templates/template_search_all.html');

    $('#btn_search_all').on('click', function(){
        console.log("try to change template 'search_all'");
        $('#search_template').load('templates/template_search_all.html');
    });

    $('#btn_search_sensors').on('click', function(){
        console.log("try to change template 'search_sensors'");
        $('#search_template').load('templates/template_search_sensors.html');
        get_sensors();
        //get_single_sensor(73);
    });
    
    $('#btn_search_harddisks').on('click', function(){
        console.log("try to change template 'search_harddisks'");
        $('#search_template').load('templates/template_search_harddisks.html');
    });
    
    $('#btn_search_cabels').on('click', function(){
        console.log("try to change template 'search_cabels'");
        $('#search_template').load('templates/template_search_cabels.html');
    });
    
    $('#btn_search_storages').on('click', function(){
        console.log("try to change template 'search_storages'");
        $('#search_template').load('templates/template_search_storages.html');
        $('#selected_search_type').text('Storages');
    });
    
    $('#btn_search_aircraft').on('click', function(){
        console.log("try to change template 'search_aircraft'");
        $('#search_template').load('templates/template_search_aircraft.html');
    });
    
    $('#btn_search_tenants').on('click', function(){
        console.log("try to change template 'search_tenants'");
        $('#search_template').load('templates/template_search_tenants.html');
    });
});

/**
 * Handle click event on button for adding new product
 */
// $(document).ready(function($) {
$(document).ready(function templating_add() {
    
    $('#btn_add_sensor').on('click', function(){
        console.log("try to change template for modal for adding new product");
        $('#add_product_header').text('Add new sensor');
        $('#add_product_template').load('templates/template_add_sensor.html');
    });
});

/**
 * Handle click event on button for collocate products
 */
// $(document).ready(function($) {
$(document).ready(function templating_collocate() {
    
    $('#collocate_products_template').load('templates/template_collocate.html');
});

// alter code als Alternative für bootstrap tabs
/*
$(document).ready(function showContent() {
    var temp = $("#show_products")[0];
    var clon = temp.content.cloneNode(true);
    document.body.appendChild(clon);
    console.log("Show products");
}); */