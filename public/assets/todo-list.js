$(function() {
    $('form').on('submit', function() {

        var item = $('form input');
        var todo = {
            item: item.val()
        };

        $.ajax({
            type: 'POST',
            url: '/todo',
            data: todo,
            // on success append item with no reloading
            // hidden stores ID mapped to DB to be used for
            // http requests
            success: function(data) {
                $('#todo-table ul').append(
                  '<li class="todo-item">' + data.item +
                  '<div class="id">' + data._id + '</div></li>');
                $('form input').val('');
            }
        });
        return false;
    });

    $('#todo-table ul').on('click', '.todo-item' , function() {
        // remove on click
        // reason - not to use relaoding
        var itemId = $(this).children('.id').text();
        var item = $(this);
        $.ajax({
            type: 'DELETE',
            url: '/todo/' + itemId,
            success: function(data) {
                $('li').remove(':contains(' + item.text() + ')');
            }
        });
    });
});
