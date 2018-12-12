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
        "deferRender": true
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
    
    $(table_body_id).on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
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
 * Function to create table to select locations where a product can be stored or installed
 * Using https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js
 * @param {string} table_id
 * @param {string} table_body_id
 * @param {array} clicked_rows
 * @param {string} cell_id_confirm_table
 * @param {Object} product
 */
function table_select_possible_locations(table_id, table_body_id, clicked_rows, cell_id_confirm_table, product) {
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
    
    $(table_body_id).on( 'click', 'tr', function () {
        $(this).toggleClass('selected');
        var clicked_row = this.cells.item(0).innerHTML;
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
        console.log('Selected possible locations for product:');
        console.log(clicked_rows.length);
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
 * @param {array} clicked_rows
 * @param {array} clicked_rows_names
 * @param {string} cell_id_confirm_table
 * @param {Object} product
 */
function table_select_related_equipment(table_id, table_body_id, clicked_rows, clicked_rows_names, cell_id_confirm_table, product) {
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
    
    $(table_body_id).on( 'click', 'tr', function () {
        $(this).toggleClass('selected');
        var clicked_row = this.cells.item(0).innerHTML;
        var clicked_row_name = this.cells.item(1).innerHTML;
        var counter = 0;
        var length = clicked_rows.length;
        if(clicked_rows.length > 0 ) {
            for(i = 0; i < length; i ++) {
                if(clicked_rows[i] === clicked_row) {
                    if(length === 1) {
                        clicked_rows = [];
                        clicked_rows_names = [];
                    } else {
                        clicked_rows.splice(i, 1);
                        clicked_rows_names.splice(i, 1);
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
        }
        console.log('Selected related equipment for product:');
        console.log(clicked_rows);
        console.log(clicked_rows_names)
        product.related_equipment = clicked_rows;
        product.related_equipment_names = clicked_rows_names;
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
