/**
 * 
 * @param {string} div_id
 * @param {string} attributes
 * @param {string} type
 */
function get_products(div_id, attributes, type) {
    var url = "http://127.0.0.1:8081/";
    url = url.concat(type);
    $.ajax({
        type : "get",
        url : url,
        contentType : "application/json; charset = utf-8",
        success : function(result, status, xhr){
            console.log("Status: " + status + " for fetching " + type);
            console.log("Fetched " + type);
            console.log(result);
            fill_table(div_id, attributes, result);
        },
        error : function (xhr, status, error){
            console.log("Error");
            console.log("Status: " + status + "Error: " + error + " for fetching " + type);
        }
    });
}

/**
 * 
 * @param {string} type
 * @param {string} item_number
 */
function get_single_product(type, item_number) {
    var url = "http://127.0.0.1:8081/";
    url = url.concat(type);
    $.ajax({
        type : "get",
        url : url,
        contentType : "application/json; charset = utf-8",
        success : function(result, status, xhr){
            var product;
            for (i = 0; i < result.length; i++) {
                if(result[i].item_number == item_number) {
                    product = result[i];
                }
            } 
            console.log("Status: " + status + " for fetching single " + type);
            console.log("Fetched single " + type);
            console.log(product);
            if(type === 'all_products') {
               // ToDo
            } else if(type === 'sensors') {
                toggle_modal_sensor(product);
            } else {
                console.log('Type for get single sector is unknwown. Type: ' + type);
            }
        },
        error : function (xhr, status, error){
            console.log("Error");
            console.log("Status: " + status + "Error: " + error + " for fetching " + type);
        }
    });
}

/**
 * ...
 * @param {string} div_id
 * @param {string} attributes
 * @param {string} type
 */
function get_locations(div_id, attributes, type) {
    var url = "http://127.0.0.1:8081/";
    url = url.concat(type);
    $.ajax({
        type : "get",
        url : url,
        contentType : "application/json; charset = utf-8",
        success : function(result, status, xhr){
            console.log("Status: " + status + " for fetching " + type);
            console.log("Fetched " + type);
            console.log(result);
            fill_table(div_id, attributes, result);
        },
        error : function (xhr, status, error){
            console.log("Error");
            console.log("Status: " + status + "Error: " + error + " for fetching " + type);
        }
    });
}

/**
 * 
 * @param {string} table_body_id
 * @param {string} attributes
 * @param {JSON} data
 */
function fill_table(table_body_id, attributes, data) {
    console.log('Try to fill table ' + table_body_id + ' with these attributes: ' + attributes);
    data.forEach(function (element) {
        var new_tr = "<tr class = 'row_item'>";
        for(x in element) {
            for(i = 0; i < attributes.length; i++) {
                if(x === attributes[i]) {
                    new_tr = new_tr.concat("<td>" + element[x] + "</td>");
                }
            }            
        }
        new_tr = new_tr.concat("</tr>");
        $(table_body_id).append(new_tr);
    });
}

/**
 * Handle click event on row of table for a sensor
 * @param {type} data
 */
function toggle_modal_sensor(data) {
    console.log('Try to fill modal for single sensor with this data: ');
    console.log(data);
    $('#modal_item_sensor_header').text(data.item_name);
    $('#modal_item_sensor_number').text(data.item_number);
    $('#modal_item_sensor_location').text(data.fk_location_name);
    $('#modal_item_sensor_owner').text(data.owner);
    $('#modal_item_sensor_elements').text(data.elements);
    $('#modal_item_sensor_height').text(data.height);
    $('#modal_item_sensor_width').text(data.width);
    $('#modal_item_sensor_lowness').text(data.lowness);
    $('#modal_item_sensor_description').text(data.description);
    $('#modal_item_sensor_s_number').text(data.s_number);
    $('#modal_item_sensor_p_number').text(data.p_number);
    $('#modal_item_sensor_software').text(data.software_version);
    $('#modal_item_sensor_firmware').text(data.firmware_version);
    $('#modal_item_sensor').modal('toggle');
}