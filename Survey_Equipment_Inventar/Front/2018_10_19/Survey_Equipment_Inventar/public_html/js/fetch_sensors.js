function fill_table_sensors(table_body_id, data) {
    console.log('Try to fill table for sensors.');
    data.forEach(function (element) {
        $(table_body_id).append(
            "<tr class = 'row_item'>" + 
            "<td>" + element.item_number + "</td>" +
            "<td>" + element.item_name + "</td>" +
            "<td>" + element.fk_location_name + "</td>" +
            "<td>" + element.owner + "</td>" +
            "<td>" + element.elements + "</td>" +
            "<td>" + element.s_number + "</td>" +
            "<td>" + element.p_number + "</td>" +
            "<td>" + element.software_version + "</td>" +
            "<td>" + element.firmware_version + "</td>" +
            "</tr>"
        );
    });
}

/**
 * ...
 */
function get_sensors() {
    $.ajax({
        type : "get",
        url : "http://127.0.0.1:8081/sensors",
        contentType : "application/json; charset = utf-8",
        success : function(result, status, xhr){
            console.log("Status: " + status + " for fetching sensors.");
            console.log("Fetched sensors:");
            console.log(result);
            fill_table_sensors('#table_sensors_body', result);
        },
        error : function (xhr, status, error){
            console.log("Error");
            console.log("Status: " + status + "Error: " + error + " for fetching sensors!");
        }
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

/**
 * ...
 * @param {integer} item_number

function get_single_sensor(item_number) {

    var url = 'http://127.0.0.1:8081/sensor/';
    url = url.concat(item_number);
    console.log('Try to fetch the sensor with item_number:');
    console.log(item_number);
    
    $.ajax({
        type : "get",
        url : url,
        contentType : "application/json; charset = utf-8",
        success : function(result, status, xhr){
            if(result !== 0) {
                console.log("Status: " + status + " for fetching single sensor.");
                console.log("Fetched sensor:");
                console.log(result);
                toggle_modal_sensor(result);
            } else {
                console.log("Sensor with item number " + item_number + " not available.");
            }
        },
        error : function (xhr, status, error){
            console.log("Error");
            console.log("Status: " + status + "Error: " + error + " for fetching single sensor!");
        }
    });
} */

/**
 * 
 * @param {type} item_number
 * @returns {undefined}
*/
function get_single_sensor(item_number) {
    $.ajax({
        type : "get",
        url : "http://127.0.0.1:8081/sensors",
        contentType : "application/json; charset = utf-8",
        success : function(result, status, xhr){
            var sensor;
            for (i = 0; i < result.length; i++) {
                if(result[i].item_number == item_number) {
                    sensor = result[i];
                }
            } 
            console.log("Status: " + status + " for fetching single sensor.");
            console.log("Fetched single sensor:");
            console.log(sensor);
            toggle_modal_sensor(sensor);
        },
        error : function (xhr, status, error){
            console.log("Error");
            console.log("Status: " + status + "Error: " + error + " for fetching sensors!");
        }
    });
}  