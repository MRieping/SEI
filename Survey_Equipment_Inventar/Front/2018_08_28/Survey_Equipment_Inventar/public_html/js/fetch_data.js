function fill_table_sensors(table_body_id, data) {
    data.forEach(function (element) {
        $(table_body_id).append(
                "<tr class = 'row_item odd' role = 'row'>" + 
                "<td class = 'td_item_number_sensor'>" + element.item_number + "</td>" +
                "<td>" + element.item_name + "</td>" +
                "<td>" + element.fk_location_name + "</td>" +
                "<td>" + element.owner + "</td>" +
                "<td>" + element.elements + "</td>" +
                "<td>" + element.s_number + "</td>" +
                "<td>" + element.p_number + "</td>" +
                "<td>" + element.software_version + "</td>" +
                "<td>" + element.firmware_version + "</td>" +
                "</tr>");
    });
}

var sensors;
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
            sensors = result;
        },
        error : function (xhr, status, error){
            console.log("Error");
            console.log("Status: " + status + "Error: " + error + " for fetching sensors!");
        }
    });
}

console.log('sensors:')
console.log(sensors);

/**
 * Handle click event on row of table for a sensor
 * @param {type} data
 */
function fill_modal_sensor(data) {
    console.log('Fill modal for single sensor with this data: ');
    console.log(data);       
}

/**
 * ...
 * @param {integer} item_number
 */
function get_single_sensor(item_number) {
    var data = {
        "type": "Feature",
        "item_number": item_number
    };
    console.log(data);
    $.ajax({
        type : "post",
        url : "http://127.0.0.1:8081/sensor",
        data : JSON.stringify(data),
        contentType : "application/json; charset = utf-8",
        success : function(result, status, xhr){
            if(result !== 0) {
                console.log("Status: " + status + " for fetching single sensor.");
                console.log("Fetched sensor:");
                console.log(result);
                fill_modal_sensor(result);
            } else {
                console.log("Sensor with item number " + item_number + " not available.");
            }
        },
        error : function (xhr, status, error){
            console.log("Error");
            console.log("Status: " + status + "Error: " + error + " for fetching single sensor!");
        }
    });
}