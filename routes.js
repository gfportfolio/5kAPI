var events = require('./models/events');

module.exports = {
  configure: function(app) {
    app.get('/events/', function(req, res) {
      todo.get(res);
    });

    app.post('/events/', function(req, res) {
      todo.create(req.body, res);
    });

    app.put('/events/', function(req, res) {
      todo.update(req.body, res);
    });

    app.delete('/events/:id/', function(req, res) {
      todo.delete(req.params.id, res);
    });
  }
};
