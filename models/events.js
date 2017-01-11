var connection = require('../connection');

function Events() {

}
module.exports = new Events();

this.get = function(res){
  connection.acquire(function(err,con){
    con.query('select * from events', function(err, result){
      con.release();
      res.send(result);
    })
  })
}

this.create = function(events, res){
  connection.acquire(function(err,con){
    con.query('insert into events set', event, function(err,result){
      con.release();
      if(err){
        res.send({status: 1, message: 'TODO creation failed'});
      }
      else {
        res.send({status: 0, message: 'TODO created successfully'});
      }
    })
  })
}

this.update = function(events, res) {
  connection.acquire(function(err, con) {
    con.query('update events set ? where id = ?', [events, events.id], function(err, result) {
      con.release();
      if (err) {
        res.send({status: 1, message: 'TODO update failed'});
      } else {
        res.send({status: 0, message: 'TODO updated successfully'});
      }
    });
  });
};


  this.delete = function(id, res) {
    connection.acquire(function(err, con) {
      con.query('delete from event where id = ?', [id], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Failed to delete'});
        } else {
          res.send({status: 0, message: 'Deleted successfully'});
        }
      });
    });
  };
