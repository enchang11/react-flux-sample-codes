var express = require('express')
var app = express();
var pg = require('pg');

var conString = "postgres://cabinet:cabinet@192.168.0.42:5432/cabinet";

var client = new pg.Client(conString);
client.connect();

app.use(express.static('public'))

app.get('/api/1.0/members', function (req, res, next) {
  client.query('SELECT *  FROM tblmembers WHERE member_id=$1', ['2'], function (err, result) {
    if (err) {
      return console.error('error happened during query', err)
    }
    res.status(200).json(result.rows);
  })
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})