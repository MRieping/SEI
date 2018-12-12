/**
 * Function to create table and filter it by column(s)
 * Using https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js
 * @param {string} id
 */
function table_filter_by_col(id) {
    // Setup - add a text input to each footer cell
    search_param = id.concat(' tfoot th');
    // table_any_type tfoot th
    $(search_param).each( function () {
        //var title = $(this).text();
        $(this).html( '<div class="input-group input-group-sm">' 
                + '<span class="input-group-addon"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></span>'
                + '<input type="text" class="form-control" placeholder="" aria-describedby="sizing-addon3">'
                + '</div>' );
    });

    // DataTable
    var table = $(id).DataTable( {
        responsive: {
            details: {
                display: $.fn.dataTable.Responsive.display.childRowImmediate,
                type: ''
            }
        },
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        scrollY: '14em',
        paging: false,
        colReorder: true,
        info: false
    });

    // Apply the search
    table.columns().every( function () {
        var that = this;

        $( 'input', this.footer() ).on( 'keyup change', function () {
            if ( that.search() !== this.value ) {
                that
                    .search( this.value )
                    .draw();
            }
        });
    });
}

/**
 * Function to create table for selecting the location of a product
 * Using https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js
 * @param {string} table_id
 * @param {string} table_body_id
 * @param {string} cell_id_confirm_table
 * @param {Object} product
 */
function table_select_location(table_id, table_body_id, cell_id_confirm_table, product) {
    // DataTable
    var table = $(table_id).DataTable( {
        scrollY: '14em',
        paging: false,
        colReorder: true,
        info: false,
        deferRender: true
    });
    
    $(table_body_id).on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            delete product.selected_location;
            $(cell_id_confirm_table).text("");
            console.log('New product after delete its location');
            console.log(new_product);
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            var clicked_row = this.cells.item(0).innerHTML;
            console.log('Selected location for product:');
            console.log(clicked_row);
            product.selected_location = clicked_row;
            console.log('New product after update its location');
            console.log(new_product);
            console.log('Update confirm table with selected location');
            $(cell_id_confirm_table).text(product.selected_location);
        }
    } );
}

/**
 * 
 * @param {id} id_button_all
 * @param {id} id_button_none
 * @param {id} table_body_id
 * @param {string} cell_id_confirm_table
 * @param {object} product 
 */
function add_all_possible_locations(id_button_all, id_button_none, table_body_id, cell_id_confirm_table, product) {
    console.log('Select all locations.')
    $(table_body_id).children().addClass('selected');
    var rows_values = [];
    var search_str = table_body_id.concat(' tr');
    $(search_str).each(function() {
        if(this.cells.item(0).innerHTML !== "Placeholder") {
            rows_values.push(this.cells.item(0).innerHTML);
        }    
    });
    product.possible_locations = rows_values;
    console.log('New product after update its possible locations');
    console.log(new_product);
    console.log('Update confirm table with possible locations');
    var possible_locations_str = product.possible_locations.toString();
    var possible_locations_str_split = possible_locations_str.split(",");
    var possible_locations_seperated_str = possible_locations_str_split[0];
    for(i = 1; i < possible_locations_str_split.length; i ++) {
        possible_locations_seperated_str = possible_locations_seperated_str.concat(', ' + possible_locations_str_split[i]);
    }
    $(cell_id_confirm_table).text(possible_locations_seperated_str);
    $(id_button_all).toggleClass('active');
    $(id_button_all).toggleClass('btn-toggle-on');
    $(id_button_all).toggleClass('btn-toggle-off');
    $(id_button_none).toggleClass('active');
    $(id_button_none).toggleClass('btn-toggle-off');
    $(id_button_none).toggleClass('btn-toggle-on');
};

function delete_all_possible_locations(id_button_all, id_button_none, table_body_id, cell_id_confirm_table, product) {
    console.log('Unselect all locations.')
    $(table_body_id).children().removeClass('selected');
    delete product.possible_locations;
    $(cell_id_confirm_table).text("");
    $(id_button_all).toggleClass('active');
    $(id_button_all).toggleClass('btn-toggle-off');
    $(id_button_all).toggleClass('btn-toggle-on');
    $(id_button_none).toggleClass('active');
    $(id_button_none).toggleClass('btn-toggle-on');
    $(id_button_none).toggleClass('btn-toggle-off');
};

/**
 * 
 * @param {id} id_button_all
 * @param {id} id_button_none
 * @param {id} table_body_id
 * @param {string} cell_id_confirm_table
 * @param {object} product 
 */
function toggle_buttons_possible_locations(id_button_all, id_button_none, table_body_id, cell_id_confirm_table, product){
    $(id_button_all).click(function() {
        if($(id_button_all).hasClass('active') === false) {
           add_all_possible_locations(id_button_all, id_button_none, table_body_id, cell_id_confirm_table, product); 
        } else {
           delete_all_possible_locations(id_button_all, id_button_none, table_body_id, cell_id_confirm_table, product)
        }
    });
    $(id_button_none).click(function() {
        if($(id_button_none).hasClass('active') === false) {
           delete_all_possible_locations(id_button_all, id_button_none, table_body_id, cell_id_confirm_table, product); 
        } else {
           add_all_possible_locations(id_button_all, id_button_none, table_body_id, cell_id_confirm_table, product)
        }
    });
};

/**
 * Function to create table to select locations where a product can be stored or installed
 * Using https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js
 * @param {string} table_id
 * @param {string} table_body_id
 * @param {string} cell_id_confirm_table
 * @param {Object} product
 */
function table_select_possible_locations(table_id, table_body_id, cell_id_confirm_table, product) {
    var clicked_rows = [];
    // DataTable
    $(table_id).DataTable( {
        scrollY: '14em',
        paging: false,
        colReorder: true,
        info: false
    });
    
    $(table_body_id).on('click', 'tr', function () {
        var clicked_row = this.cells.item(0).innerHTML;
        if(product.possible_locations !== undefined) {
            console.log('Possible locations already filled with data.');
            console.log('Data will be used to update itself.')
            console.log(product.possible_locations);
            clicked_rows = product.possible_locations;
        }
        $(this).toggleClass('selected');
        var counter = 0;
        var length = clicked_rows.length;
        if(clicked_rows.length > 0 ) {
            for(i = 0; i < length; i ++) {
                if(clicked_rows[i] === clicked_row) {
                    if(length === 1) {
                        clicked_rows = [];
                    } else {
                        clicked_rows.splice(i, 1);
                    }
                } else {
                    counter = counter + 1;
                }
            }
        } 
        if(counter === length) {
            // clicked_rows.push(clicked_rows.clicked_row = clicked_row); ???
            clicked_rows.push(clicked_row);
        }
        if(clicked_rows.length === 0) {
            delete product.possible_locations;
            $(cell_id_confirm_table).text("");
            console.log('New product after delete its possible locations');
            console.log(product);
        } else {
            product.possible_locations = clicked_rows;
            console.log('New product after update its possible locations');
            console.log(new_product);
            console.log('Update confirm table with possible locations');
            var possible_locations_str = product.possible_locations.toString();
            var possible_locations_str_split = possible_locations_str.split(",");
            var possible_locations_seperated_str = possible_locations_str_split[0];
            for(i = 1; i < possible_locations_str_split.length; i ++) {
                possible_locations_seperated_str = possible_locations_seperated_str.concat(', ' + possible_locations_str_split[i]);
            }
            $(cell_id_confirm_table).text(possible_locations_seperated_str);
        }
    });
}

/**
 * Function to create table to select locations where a product can be stored or installed
 * Using https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js
 * @param {string} table_id
 * @param {string} table_body_id
 * @param {string} cell_id_confirm_table
 * @param {Object} product
 */
function table_select_related_equipment(table_id, table_body_id, cell_id_confirm_table, product) {
    var clicked_rows = [];
    var clicked_rows_names = [];
    var clicked_rows_descriptions = [];
    // Setup - add a text input to each footer cell
    search_param = table_id.concat(' tfoot th');
    // table_any_type tfoot th
    $(search_param).each( function () {
        //var title = $(this).text();
        $(this).html( '<div class="input-group input-group-sm">' 
                + '<span class="input-group-addon"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></span>'
                + '<input type="text" class="form-control" placeholder="" aria-describedby="sizing-addon3">'
                + '</div>' );
    });

    // DataTable
    var table = $(table_id).DataTable( {
        scrollY: '14em',
        paging: false,
        colReorder: true,
        info: false,
    });

    // Apply the search
    table.columns().every( function () {
        var that = this;

        $( 'input', this.footer() ).on( 'keyup change', function () {
            if ( that.search() !== this.value ) {
                that
                    .search( this.value )
                    .draw();
            }
        });
    });
    
    $(table_body_id).on('click', 'tr', function () {
        if($(this.cells.item(4).children[0]).is(":focus") === true) {
            if($(this).hasClass("selected") === true) {
                $(this).removeClass("selected");
                var clicked_row_0 = this.cells.item(0).innerHTML;           
                var counter_0 = 0;
                var length_0 = clicked_rows.length;
                if(length_0 > 0 ) {
                    for(i = 0; i < length_0; i ++) {
                        if(clicked_rows[i] === clicked_row_0) {
                            if(length_0 === 1) {
                                clicked_rows = [];
                                clicked_rows_names = [];
                                clicked_rows_descriptions = [];
                            } else {
                                clicked_rows.splice(i, 1);
                                clicked_rows_names.splice(i, 1);
                                clicked_rows_descriptions.splice(i, 1);
                            }
                        } else {
                            counter_0 = counter_0 + 1;
                        }
                    }
                }
            }
        } else {
            $(this).toggleClass('selected');
            var clicked_row = this.cells.item(0).innerHTML;
            var clicked_row_name = this.cells.item(1).innerHTML;
            var clicked_row_description = this.cells.item(4).children[0].value;
            var counter = 0;
            var length = clicked_rows.length;
            if(clicked_rows.length > 0 ) {
                for(i = 0; i < length; i ++) {
                    if(clicked_rows[i] === clicked_row) {
                        if(length === 1) {
                            clicked_rows = [];
                            clicked_rows_names = [];
                            clicked_rows_descriptions = [];
                        } else {
                            clicked_rows.splice(i, 1);
                            clicked_rows_names.splice(i, 1);
                            clicked_rows_descriptions.splice(i, 1);
                        }
                    } else {
                        counter = counter + 1;
                    }
                }
            } 
            if(counter === length) {
                // clicked_rows.push(clicked_rows.clicked_row = clicked_row); ???
                clicked_rows.push(clicked_row);
                clicked_rows_names.push(clicked_row_name);
                clicked_rows_descriptions.push(clicked_row_description);
            }
            if(clicked_rows.length === 0) {
                delete product.related_equipment;
                delete product.related_equipment_names;
                delete product.related_equipment_descriptions;
                $(cell_id_confirm_table).text("");
                console.log('New product after delete its related equipment');
                console.log(product);
            } else {
                console.log('Selected related equipment for product:');
                console.log(clicked_rows);
                console.log(clicked_rows_names);
                console.log(clicked_rows_descriptions);
                product.related_equipment = clicked_rows;
                product.related_equipment_names = clicked_rows_names;
                product.related_equipment_descriptions = clicked_rows_descriptions;
                console.log('New product after update its related equipment');
                console.log(new_product);
                var related_equipment_str = product.related_equipment.toString();
                var related_equipment_str_split = related_equipment_str.split(",");
                var related_equipment_name_str = product.related_equipment_names.toString();
                var related_equipment_name_str_split = related_equipment_name_str.split(",");
                var related_equipment_seperated_str = related_equipment_str_split[0];
                related_equipment_seperated_str = related_equipment_seperated_str.concat(" (" + related_equipment_name_str_split[0] + ")");
                for(i = 1; i < related_equipment_str_split.length; i ++) {
                    related_equipment_seperated_str = related_equipment_seperated_str.concat(', ' 
                        + related_equipment_str_split[i] + ' (' + related_equipment_name_str_split[i] +  ')');
                }
                console.log('Update confirm table with related euqipment');
                $(cell_id_confirm_table).text(related_equipment_seperated_str);
            }
        }
    });
}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
};

/**
 * 
 * @param {string} cell_id_confirm_table
 * @param {input value} value
 * @returns {undefined}
 */
function update_table_confirm(cell_id_confirm_table, value) {
    $(cell_id_confirm_table).text(value);
};

/**
 * Function to create table and filter it by column(s)
 * Using https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js
 * @param {string} id

function table_for_modals(id) {

    var table = $(id).DataTable( {
        responsive: {
            details: {
                display: $.fn.dataTable.Responsive.display.childRowImmediate,
                type: ''
            }
        },
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        "paging":   false,
        "ordering": false,
        "info":     false
    });

    //Apply the search
    table.columns().every( function () {
        var that = this;

        $( 'input', this.footer() ).on( 'keyup change', function () {
            if ( that.search() !== this.value ) {
                that
                    .search( this.value )
                    .draw();
            }
        });
    });
} */

/**
 * NICHT MEHR NÖTIG ?!
 * Handle click event on row of table for a sensor
 * @param {string} id

function edit_table_sensor(id) {
    $(".row_item").click(function() {
        textcontent = this.textContent;
        textcontent_split = textcontent.split("\n");
        console.log(this);
        console.log(textcontent);
        $('#modal_item_all_header').text(textcontent_split[2]);
        $('#modal_item_sensor_name').text(textcontent_split[3]);
        $('#modal_item_sensor_number').text(textcontent_split[4]);
        $('#modal_item_sensor_owner').text(textcontent_split[5]);
        $('#modal_item_sensor_elements').text(textcontent_split[6]);
        $('#modal_item_sensor_s_number').text('test s number');
        // ToDo: send get-request with id to fetch missing attributes of specific types of products ?!
        $(id).modal('toggle');
    });
}*/

/**
 * Handle click event on row of table for a sensor
 * @param {string} id

function show_table_sensor(id) {
    $(".row_item").click(function() {
        console.log(this.cells.item(0).innerHTML);
        $(id).modal('toggle');
    });
} */
