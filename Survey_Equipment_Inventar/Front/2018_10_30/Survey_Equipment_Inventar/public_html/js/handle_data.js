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
        for (x in element) {
            for (i = 0; i < attributes.length; i++) {
                if (x === attributes[i]) {
                    new_tr = new_tr.concat("<td>" + element[x] + "</td>");
                }
            }
        }
        if (description === 0) {
            new_tr = new_tr.concat("</tr>");
        } else if (description === 1) {
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
 * @param {object} data
 * @param {String} type
 */
function fill_tables_for_single_product(data, type) {
    console.log('Try to fill modal for single product with this data: ');
    console.log(data);
    $('#modal_single_product_header').text(data[0].item_name);
    $('#modal_single_product_item_number').text(data[0].item_number);
    $('#modal_single_product_location').text(data[0].fk_location_name);
    $('#modal_single_product_owner').text(data[0].owner);
    $('#modal_single_product_elements').text(data[0].elements);
    if (data[0].height === null) {
        $('#modal_single_product_height').text('');
    } else {
        $('#modal_single_product_height').text(data[0].height);
    }
    if (data[0].width === null) {
        $('#modal_single_product_width').text('');
    } else {
        $('#modal_single_product_width').text(data[0].width);
    }
    if (data[0].lowness === null) {
        $('#modal_single_product_lowness').text('');
    } else {
        $('#modal_single_product_lowness').text(data[0].lowness);
    }
    if (data[0].description === null) {
        $('#modal_single_product_description').text('');
    } else {
        $('#modal_single_product_description').text(data[0].description);
    }

    if (type === 'sensor') {
        $('#modal_single_product_sensor_s_number').text(data[0].s_number);
        if (data[0].p_number === null) {
            $('#modal_single_product_sensor_p_number').text('');
        } else {
            $('#modal_single_product_sensor_p_number').text(data[0].p_number);
        }
        if (data[0].software_version === null) {
            $('#modal_single_product_sensor_software_version').text('');
        } else {
            $('#modal_single_product_sensor_software_version').text(data[0].software_version);
        }
        if (data[0].firmware_version === null) {
            $('#modal_single_product_sensor_firmware_version').text('');
        } else {
            $('#modal_single_product_sensor_firmware_version').text(data[0].firmware_version);
        }
    }

    $('#modal_single_product_related_products_table_body').find('tr').remove();
    for (i = 0; i < data.length; i++) {
        var new_tr = "<tr><td>" + data[i].fk_item_number + "</td>"
                + "<td>" + data[i].description_for_relation + "</td></tr>";
        console.log(new_tr);
        $('#modal_single_product_related_products_table_body').append(new_tr);
    }

    $('#modal_single_product').modal('toggle');
}