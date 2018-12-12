/**
 * ...
 * @param {string} div_id
 * @param {object} data
 */
function fill_list_storages_radio(div_id, data) {
    console.log('Try to fill radio-list for storages.');
    $(div_id).append("<p class='text_weseras'>Storages</p>");
    data.forEach(function (element) {
        $(div_id).append(
            "<div class='radio'><label><input type='radio' name='optradio' value = " 
            + element.location_name + " class = 'rad'>" + element.location_name + "</label></div>"
        );
    });
}

/**
 * ...
 * @param {string} div_id
 * @param {object} data
 */
function fill_list_storages_check(div_id, data) {
    console.log('Try to fill checkbox-list for storages.');
    $(div_id).append("<p class='text_weseras'>Storages</p>");
    data.forEach(function (element) {
        $(div_id).append(
            "<div class='checkbox'><label><input type='checkbox' value = " 
            + element.location_name + " checked class = 'chk'>" + element.location_name + "</label></div>"
        );
    });
}

/**
 * ...
 * @param {string} div_id
 * @param {string} list_or_table
 * @param {string} radio_or_check
 */
function get_storages(div_id, list_or_table, radio_or_check) {
    $.ajax({
        type : "get",
        url : "http://127.0.0.1:8081/storages",
        contentType : "application/json; charset = utf-8",
        success : function(result, status, xhr){
            console.log("Status: " + status + " for fetching storages.");
            console.log("Fetched storages:");
            console.log(result);
            if(list_or_table === 'list') {
                if(radio_or_check === 'radio') {
                    fill_list_storages_radio(div_id, result);
                } else if(radio_or_check === 'check') {
                    fill_list_storages_check(div_id, result);
                }  
            } else if(list_or_table === 'table') {
                
            } else {
                console.log('Please select list or table.');
            } 
        },
        error : function (xhr, status, error){
            console.log("Error");
            console.log("Status: " + status + "Error: " + error + " for fetching storages!");
        }
    });
}

/**
 * ...
 * @param {string} div_id
 * @param {object} data
 */
function fill_list_aircrafts_radio(div_id, data) {
    console.log('Try to fill radio-list for aircrafts.');
    $(div_id).append("<p class='text_weseras'>Aircraft</p>");
    data.forEach(function (element) {
        $(div_id).append(
            "<div class='radio'><label><input type='radio' name='optradio' value = " 
            + element.location_name + " class = 'rad'>" + element.location_name + "</label></div>"
        );
    });
}

/**
 * ...
 * @param {string} div_id
 * @param {object} data
 */
function fill_list_aircrafts_check(div_id, data) {
    console.log('Try to fill checkbox-list for aircrafts.');
    $(div_id).append("<p class='text_weseras'>Aircraft</p>");
    data.forEach(function (element) {
        $(div_id).append(
            "<div class='checkbox'><label><input type='checkbox' value = " 
            + element.location_name + " checked class = 'chk'>" + element.location_name + "</label></div>"
        );
    });
}

/**
 * ...
 * @param {string} div_id
 * @param {string} list_or_table
 * @param {string} radio_or_check
 */
function get_aircrafts(div_id, list_or_table, radio_or_check) {
    $.ajax({
        type : "get",
        url : "http://127.0.0.1:8081/aircrafts",
        contentType : "application/json; charset = utf-8",
        success : function(result, status, xhr){
            console.log("Status: " + status + " for fetching aircrafts.");
            console.log("Fetched aircrafts:");
            console.log(result);
            if(list_or_table === 'list') {
                if(radio_or_check === 'radio') {
                    fill_list_aircrafts_radio(div_id, result);
                } else if(radio_or_check === 'check') {
                    fill_list_aircrafts_check(div_id, result);
                }  
            } else if(list_or_table === 'table') {
                
            } else {
                console.log('Please select list or table.');
            } 
        },
        error : function (xhr, status, error){
            console.log("Error");
            console.log("Status: " + status + "Error: " + error + " for fetching aircrafts!");
        }
    });
}