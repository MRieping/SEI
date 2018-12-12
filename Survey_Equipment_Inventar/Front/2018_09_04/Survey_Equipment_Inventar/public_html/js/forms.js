/**
 * ...
 * https://bytutorial.com/blogs/jquery/jquery-get-selected-checkboxes
 */
function get_values_of_radios(){

    var radArray = [];

    $(".rad:checked").each(function() {
            radArray.push($(this).val());
    });

    return radArray;
}

/**
 * ...
 * https://bytutorial.com/blogs/jquery/jquery-get-selected-checkboxes
 */
function get_values_of_checkboxes(){

    var chkArray = [];

    $(".chk:checked").each(function() {
            chkArray.push($(this).val());
    });

    return chkArray;
}

/**
 * ...
 * http://jsfiddle.net/Lm2hS/
 * @param {type} evt
 * @returns {Boolean}
 */
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}