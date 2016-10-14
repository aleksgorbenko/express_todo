var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

var mongoose = require('mongoose');

//connect to the Mlab DB.
mongoose.connect('mongodb://test:test@ds021434.mlab.com:21434/express_todo');

//define Schema for items and the data type
var todoSchema = new mongoose.Schema({
    item: String
});

//create model and the type of schmea it uses
var Todo = mongoose.model('Todo', todoSchema);

var itemOne = Todo({item: 'make bed'}).save(function(err) {
    if (err) throw err;
    console.log('item saved');
});

var data = [{
    item: 'get milk'
}, {
    item: 'walk dog'
}, {
    item: 'learn python'
}];

module.exports = function(app) {
    app.get('/todo', function(req, res) {
        res.render('todo', {
            todos: data
        });
    });

    app.post('/todo', urlencodedParser, function(req, res) {
        data.push(req.body);
        res.json(data);
    });

    app.delete('/todo/:item', function(req, res) {
        data = data.filter(function(todo) {
            return todo.item.replace(/ /g, '-') !== req.params.item;
        });
        res.json(data);
    });
};