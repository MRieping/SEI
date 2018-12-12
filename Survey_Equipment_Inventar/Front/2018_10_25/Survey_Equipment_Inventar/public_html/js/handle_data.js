/**
 * 
 * @param {string} table_body_id
 * @param {string} attributes
 * @param {boolean} description
 * @param {JSON} data
 */
function fill_table(table_body_id, attributes, description, data) {
    console.log('Try to fill table ' + table_body_id + ' with these attributes: ' + attributes);
    data.forEach(function (element) {
        new_tr = "<tr class = 'row_item'>";
        for(x in element) {
            for(i = 0; i < attributes.length; i++) {
                if(x === attributes[i]) {
                    new_tr = new_tr.concat("<td>" + element[x] + "</td>");
                }
            }            
        }
        if(description === 0) {
            new_tr = new_tr.concat("</tr>");
        } else if(description === 1) {
            new_tr = new_tr.concat("<td><input type='text'/></tr>");
            related_products = data;
        } else {
            console.log('Please set up the param description');
        } 
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