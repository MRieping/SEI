/**
 * 
 * @param {string} type
 * @param {JSON} data
 */
function fill_table_search_products(type, data) {
    console.log('Try to fill table for searching products for type: ' + type);
    if (data.length === 0) {
        console.log('No data available for ' + type);
    } else {
        var attributes = Object.keys(data[0]);
        for (i = 0; i < attributes.length; i++) {
            var current_attribute = attributes[i].charAt(0).toUpperCase() + attributes[i].slice(1);
            if (attributes[i] === "description") {
                // Do nothing
            } else {
                var thead = "<th>" + current_attribute + "</th>";
                $('#table_search_products_head').append(thead);
                $('#table_search_products_foot').append(thead);
            }
        }
        data.forEach(function (element) {
            var new_tr = "<tr class = 'row_item'>";
            for (x in element) {
                if (x === "description") {
                    // Do nothing
                } else {
                    if (element[x] === null || element[x] === '') {
                        new_tr = new_tr.concat("<td>unknown</td>");
                    } else {
                        new_tr = new_tr.concat("<td>" + element[x] + "</td>");
                    }
                }
            }
            $('#table_search_products_body').append(new_tr);
        });
    }
    // ...
    table_search_products();
}

/**
 * Handle click event on row of table for a sensor
 * @param {object} data
 */
function fill_tables_single_product(data) {
    console.log('Remove all rows from table for single product before filling it.');
    $('#modal_single_product_table_body').empty();
    $('#modal_single_product_poss_locs_table_body').empty();
    $('#modal_single_product_related_products_table_body').empty();
    console.log('Try to fill modal for single product with this data: ');
    console.log(data);
    $('#modal_single_product_header').text(data[0].number);
    var single_product_keys = Object.keys(data[0]);
    var single_product_values = Object.values(data[0]);
    // ...
    for (i = 0; i < single_product_keys.length; i++) {
        var current_key = single_product_keys[i];
        if (current_key === 'fk_number' || current_key === 'fk_location' || current_key === 'fk_rel_number'
                || current_key === 'description_for_relation' || current_key === 'photo_id'
                || current_key === 'photo_name' || current_key === 'base_64') {
            // Do nothing
        } else {
            var new_tr = "<tr>";
            var current_key_upper = current_key.charAt(0).toUpperCase() + current_key.slice(1);
            new_tr = new_tr.concat("<td>" + current_key_upper + "</td>");
            if (single_product_values[i] === null || single_product_values[i] === '') {
                new_tr = new_tr.concat("<td>unknown</td>");
            } else {
                new_tr = new_tr.concat("<td>" + single_product_values[i] + "</td>");
            }
            new_tr = new_tr.concat("</tr>");
            $('#modal_single_product_table_body').append(new_tr);
        }
    }
    // ...
    var possible_locations = [];
    var related_products = [];
    var photos = [];
    data.forEach(function (element) {
        if (element.fk_location === undefined || element.fk_location === null) {
            // Do nothing
        } else if (possible_locations.includes(element.fk_location)) {
            // Do nothing
        } else {
            possible_locations.push(element.fk_location);
            var new_tr = "<tr><td>" + element.fk_location + "</td>";
            $('#modal_single_product_poss_locs_table_body').append(new_tr);
        }
        if (element.photo_id === undefined || element.photo_id === null) {
            // Do nothing
        } else if (photos.includes(element.photo_id)) {

        } else {
            photos.push(element.photo_id);
            console.log(photos);
        }
        if (element.fk_rel_number === undefined || element.fk_rel_number === null) {
            // Do nothing
        } else if (related_products.includes(element.fk_rel_number)) {
            // Do nothing
        } else {
            related_products.push(element.fk_rel_number);
            var new_tr = "<tr><td>" + element.fk_rel_number + "</td>";
            new_tr = new_tr.concat("<td>" + element.description_for_relation + "</td></tr>");
            $('#modal_single_product_related_products_table_body').append(new_tr);
        }
    });

    /*$('#modal_single_product_related_products_table_body').find('tr').remove();
     for (i = 0; i < data.length; i++) {
     var new_tr = "<tr><td>" + data[i].fk_item_number + "</td>"
     + "<td>" + data[i].description_for_relation + "</td></tr>";
     $('#modal_single_product_related_products_table_body').append(new_tr);
     }*/
    if ($.fn.dataTable.isDataTable('#modal_single_product_table')) {
        // Do nothing
    } else {
        table_modal_single_product('#modal_single_product_table');
    }
    if ($.fn.dataTable.isDataTable('#modal_single_product_poss_locs_table')) {
        // Do nothing
    } else {
        table_modal_single_product('#modal_single_product_poss_locs_table');
    }
    if ($.fn.dataTable.isDataTable('#modal_single_product_related_products_table')) {
        // Do nothing
    } else {
        table_modal_single_product('#modal_single_product_related_products_table');
    }
    $('#modal_single_product').modal('toggle');
}

/**
 * 
 * @param {0, 1 or 2} selectable
 * @param {type} data
 */
function fill_table_locations(selectable, data) {
    if (selectable === 0) {
        console.log('Try to fill table for selecting location for new product.');
    } else if (selectable === 1) {
        console.log('Try to fill table for selecting possible location for new product.');
    } else if (selectable === 2) {
        console.log('Try to fill table for searching locations.');
    }
    data.forEach(function (element) {
        var new_tr = "<tr>";
        for (x in element) {
            if (element[x] === null) {
                new_tr = new_tr.concat("<td>unknown</td>");
            } else {
                new_tr = new_tr.concat("<td>" + element[x] + "</td>");
            }
        }
        if (selectable === 0) {
            $('#add_table_location_body').append(new_tr);
        } else if (selectable === 1) {
            $('#add_table_possible_locations_body').append(new_tr);
        } else if (selectable === 2) {
            // ...
        }
    });
    if (selectable === 0) {
        table_select_location(new_product);
    } else if (selectable === 1) {
        table_select_possible_locations(new_product);
    } else if (selectable === 2) {
        // ...
    }
}

/**
 * 
 * @param {type} data
 */
function fill_table_related_products(data) {
    console.log('Try to fill table for selecting related products for new product.');
    data.forEach(function (element) {
        var new_tr = "<tr>";
        for (x in element) {
            if (x === "number" || x === 'name' || x === 'owner' || x === 'elements') {
                if (element[x] === null) {
                    new_tr = new_tr.concat("<td>unknown</td>");
                } else {
                    new_tr = new_tr.concat("<td>" + element[x] + "</td>");
                }
            } else {
                // Do nothing
            }
        }
        new_tr = new_tr.concat("<td><input type='text'/></tr>");
        // hier oder schon woanders initialisiert? wenn hier, var davor und wo weiter benutzt?
        // related_products = data;
        $('#add_table_related_products_body').append(new_tr);
    });
    table_select_related_equipment(new_product);
}

/**
 * 
 * @param {type} keys
 */
function fill_forms_add_new_products(keys) {
    console.log('Try to fill forms for adding new product.');
    for (i = 0; i < keys.length; i++) {
        var current_key = keys[i];
        var current_key_upper = current_key.charAt(0).toUpperCase() + current_key.slice(1);
        if (keys[i] === 'number' || current_key === 'name' || current_key === 'owner'
                || current_key === 'elements' || current_key === 'description' || current_key === 'height'
                || current_key === 'width' || current_key === 'lowness' || current_key === 'location') {

        } else {
            var new_form_group = "<div class='form-group'><label for='add_new_product_" + current_key + "'>";
            new_form_group = new_form_group.concat(current_key_upper + "</label><input id='add_" + current_key) + "'";
            new_form_group = new_form_group.concat(" type='text' class='form-control' onkeyup='new_product."
                    + current_key + " = $(this).val()'");
            //new_form_group = new_form_group.concat(" onchange='update_table_confirm('#add_new_product_confirm_" + current_key + "', $(this).val())'");
            new_form_group = new_form_group.concat("></div>");
            $('#add_new_product_form_specific_attributes').append(new_form_group);
            //var new_row_confirm = "<tr><td>" + current_key_upper + "**</td>";
            //new_row_confirm = new_row_confirm.concat("<td id='add_new_product_confirm_" + current_key + "'></td></tr>");
            //$('#add_new_product_table_confirm_attributes_body').append(new_row_confirm);
        }
    }
}