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

module.exports = function(app) {
    app.get('/todo', function(req, res) {
        // this way it finds all items in the collection
        Todo.find({}, function(err, data) {
            if (err) return console.error(err);
            res.render('todo', {
                todos: data
            });
        });
    });

    app.post('/todo', urlencodedParser, function(req, res) {

        var newTodo = Todo(req.body).save(function(err, data) {
            if (err) return console.error(err);
            res.json(data);
        });
    });

    app.delete('/todo/:itemId', function(req, res) {
        // reason why we replace all hyphens with space is because
        // in the url item name will come with hyphens. to map item with the
        // item in DB we need an exact match
        // Todo.find({item: req.params.item.replace(/\-/g, ' ')})
        //
        Todo.find({_id: req.params.itemId})
            .remove(function(err, data) {
                if (err) return console.error(err);
                res.json(data);
            });
    });
};