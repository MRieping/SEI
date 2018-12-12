$(document).ready(function($) {
    $(".table-row").click(function() {
        alert("Hallo Welt!");
    });
});

$(document).ready(function(){
  $("#input_general_search").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#table_products tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});