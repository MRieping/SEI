/**
 * Function to create table and filter it by column(s)
 * Using https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js
 * @param {string} id
 */
function filter_by_col(id) {
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
        colReorder: true
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
 * Handle click event on row of table for a sensor
 * @param {string} id
 */
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
}

/**
 * Handle click event on row of table for a sensor
 * @param {string} id
 */
function show_table_sensor(id) {
    $(".row_item").click(function() {
        console.log(this.cells.item(0).innerHTML);
        $(id).modal('toggle');
    });
}
