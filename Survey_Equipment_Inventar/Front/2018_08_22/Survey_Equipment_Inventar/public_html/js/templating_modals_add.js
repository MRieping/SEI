/**
 * Handle click event on click on button for adding new product
 */
// $(document).ready(function($) {
$(document).ready(function() {
    
    $('#btn_select_type_sensor').on('click', function(){
        console.log("try to change template for modal for adding new product");
        $('#add_product_header').text('Add new sensor');
        $('#add_product_template').load('templates/template_add_sensor.html');
    });
});
