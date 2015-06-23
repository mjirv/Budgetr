$(document).ready(function() {

    $('#submitExpensePOST').on('click', addExpense);

});

// POST new expense
function addExpense(event) {
    var formData = {
        accountId : 0,
        account : $('#addExpense fieldset input#accountName').val(),
        user : {
            firstName : $('#addExpense fieldset input#inputFirstName').val(),
            lastName : $('#addExpense fieldset input#inputLastName').val(),
            email : $('#addExpense fieldset input#inputEmail').val()
        },
        event : {
            name : $('#addExpense fieldset input#inputEventName').val(),
            date : $('#addExpense fieldset input#inputEventDate').val()
        },
        expense : {
            name : $('#addExpense fieldset input#inputExpenseName').val(),
            amount : $('#addExpense fieldset input#inputExpenseAmount').val(),
            description : $('#addExpense fieldset textarea#inputExpenseDescription').val()
        }
    }
    $.ajax({
        type: 'POST',
        cache: false,
        url: '/add_expense/addexpense',
        data: JSON.stringify(formData),
        dataType: 'json',
        contentType: 'application/json'
    }).done(function(res) {
        if(res.msg=="") {
            window.location = 'added/' + res.id;
        }
        else {
            alert(res.msg);
        }
    });
    console.log(formData);
}