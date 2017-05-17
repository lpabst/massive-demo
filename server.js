var express = require('express');
var bodyParser = require('body-parser');
var massive = require('massive');
var port = 3000;

var db = massive.connectSync({
  connectionString: 'postgres://vzpschqyumrmgi:2369a40811f02897e6d114adcd4d5de091ade55b05c00f3a69180bb53e9e5682@ec2-54-235-90-107.compute-1.amazonaws.com:5432/d22he7vqlabr78?ssl=true'
})

var app = express();
app.use(bodyParser.json());


app.get('/', function(req, res) {
  db.getAllInjuries(function(err, injuries){
    return res.send(injuries);
  })
});

app.get('/incidents', function(req, res) {
  var state = req.query.state;
  var cause = req.query.cause;

  if (state){
    db.getIncidentsByState([state], function(err, incidents){
      if (err){
        res.send(err);
      }else{
        res.send(incidents);
      }
    })
  }else if (cause){
    db.getIncidentsByCause([cause], function(err, incidents){
      if (err){
        res.send(err);
      }else{
        res.send(incidents);
      }
    })    
  }else{
    db.getAllIncidents(function(err, incidents){
      return res.send(incidents);
    })
  }

});

app.post('/incidents', function(req, res) {
  res.send({id: 123});
});











app.listen(port, function() {
  console.log("Started server on port", port);
});
