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
        // changing all space for hypthens so that url request doesnt
        // any
        // var item = $(this).text().replace(/ /g, '-');
        // below better version, but it's monkey-patching :)
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
