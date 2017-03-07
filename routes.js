var events = require('./models/events');

module.exports = {
  configure: function(app) {
    app.get('/events/', function(req, res) {
      events.get(req.query,res);
    });

    app.post('/events/', function(req, res) {
      events.create(req.body, res);
    });

    app.put('/events/', function(req, res) {
      events.update(req.body, res);
    });

    app.delete('/events/:id/', function(req, res) {
      events.delete(req.params.id, res);
    });
  }
};
