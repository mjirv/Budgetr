// Userlist data array for filling in info box
var lineItemData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/lineitems', function( data ) {

        lineItemData = data;
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href=lineitems/' +this._id + ' class="linkshowlineitem" rel="' + this.name + '">' + this.name + '</a></td>';
            tableContent += '<td>' + this.start + '</td>';
            tableContent += '<td>' + this.remaining + '';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#lineItemList table tbody').html(tableContent);
    });
};