// alter code als Alternative für bootstrap tabs
/*
$(document).ready(function showContent() {
    var temp = $("#show_products")[0];
    var clon = temp.content.cloneNode(true);
    document.body.appendChild(clon);
    console.log("Show products");
}); */

$(document).ready(function templating() {

    $('#search_products_template').load('templates/template_search_all.html');

    $('#btn_search_all').on('click', function(){
        console.log("try to change template");
        $('#search_products_template').load('templates/template_search_all.html');
    });

    $('#btn_search_camera').on('click', function(){
        console.log("try to change template");
        $('#search_products_template').load('templates/template_search_cameras.html');
    });
    
    $('#btn_search_harddisk').on('click', function(){
        console.log("try to change template");
        $('#search_products_template').load('templates/template_search_harddisks.html');
    });
    
    $('#btn_search_cabel').on('click', function(){
        console.log("try to change template");
        $('#search_products_template').load('templates/template_search_cabels.html');
    });

});