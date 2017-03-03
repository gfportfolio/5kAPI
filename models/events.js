var connection = require('../connection');

function events() {



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
      var queryBuilder = "insert into `events` (`Name`,`StartTime`,`EndTime`,`LoadKey`) VALUES ";
      var rowcounter = 0;
      for(var thisEvent of events){
        if(typeof thisEvent.StartTime === 'undefined'){
          thisEvent.StartTime="NULL";
        }
                else{
          thisEvent.StartTime="'"+thisEvent.StartTime+"'";
        }
        if(typeof thisEvent.EndTime === 'undefined'){
          thisEvent.EndTime="NULL";
        }
        else{
          thisEvent.EndTime="'"+thisEvent.EndTime+"'";
        }
        queryBuilder+="('"+thisEvent.Name+"',"+thisEvent.StartTime+","+thisEvent.EndTime+","+thisEvent.LoadKey+")";
            rowcounter++;
           if(rowcounter<events.length) {
             queryBuilder+=",";
            }
           else{
              queryBuilder+=";";

            }
      }
      con.query(queryBuilder,function(err,result){
          con.release();
          if(err){
            res.send({status: 1, message: 'TODO creation failed', error:err});
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
}
module.exports = new events();
