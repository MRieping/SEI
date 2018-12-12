/**
 * 
 * @param {boolean} description
 * @param {string} type
 * @param {JSON} data
 */
function fill_table_multiple_products(description, type, data) {
    console.log('Try to fill table for searching products for type: ' + type);
    var attributes = Object.keys(data[0]);
    var thead = "<tr>"
    for (i = 0; i < attributes.length; i++) {
        if (attributes[i] === "description") {
            // Do nothing
        } else if (attributes[i] === "item_number") {
            thead = thead.concat("<th>Number</th>");
        } else if (attributes[i] === "item_name") {
            thead = thead.concat("<th>Name</th>");
        } else if (attributes[i] === "owner") {
            thead = thead.concat("<th>Owner</th>");
        } else if (attributes[i] === "elements") {
            thead = thead.concat("<th>Elements</th>");
        } else if (attributes[i] === "height") {
            thead = thead.concat("<th>Height</th>");
        } else if (attributes[i] === "width") {
            thead = thead.concat("<th>Width</th>");
        } else if (attributes[i] === "lowness") {
            thead = thead.concat("<th>Lowness</th>");
        } else if (attributes[i] === "fk_location_name") {
            thead = thead.concat("<th>Location</th>");
        } else {
            thead = thead.concat("<th>" + attributes[i] + "</th>");
        }
    }
    thead = thead.concat("</tr>");
    if (thead !== "<tr></tr>") {
        $('#table_search_products_head').append(thead);
        $('#table_search_products_foot').append(thead);
    }
    data.forEach(function (element) {
        var new_tr = "<tr class = 'row_item'>";
        for (x in element) {
            if (x === "description") {
                // Do nothing
            } else {
                if (element[x] === null) {
                    new_tr = new_tr.concat("<td>unknown</td>");
                } else {
                    new_tr = new_tr.concat("<td>" + element[x] + "</td>");
                }
            }
        }
        if (description === 0) {
            new_tr = new_tr.concat("</tr>");
        } else if (description === 1) {
            new_tr = new_tr.concat("<td><input type='text'/></tr>");
            // hier oder schon woanders initialisiert? wenn hier, var davor und wo weiter benutzt?
            related_products = data;
        } else {
            console.log('Please set up the param description.');
        }
        $('#table_search_products_body').append(new_tr);
    });
    table_filter_by_col('#table_search_products');
}

/**
 * Handle click event on row of table for a sensor
 * @param {object} data
 * @param {String} type
 */
function fill_tables_single_product(data, type) {
    console.log('Remove all rows from table for single product before filling it.');
    $('#modal_single_product_table_body').empty();
    console.log('Try to fill modal for single product with this data: ');
    var single_product_keys = Object.keys(data[0]);
    var single_product_values = Object.values(data[0]);
    for (i = 0; i < single_product_keys.length; i++) {
        var new_tr = "<tr>";
        var current_key = single_product_keys[i].charAt(0).toUpperCase() + single_product_keys[i].slice(1);
        new_tr = new_tr.concat("<td>" + current_key + "</td>");
        new_tr = new_tr.concat("<td>" + single_product_values[i] + "</td>");
        new_tr = new_tr.concat("</tr>");
        $('#modal_single_product_table_body').append(new_tr);
    }

    /*$('#modal_single_product_related_products_table_body').find('tr').remove();
    for (i = 0; i < data.length; i++) {
        var new_tr = "<tr><td>" + data[i].fk_item_number + "</td>"
                + "<td>" + data[i].description_for_relation + "</td></tr>";
        $('#modal_single_product_related_products_table_body').append(new_tr);
    }*/

    $('#modal_single_product').modal('toggle');
}