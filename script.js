
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'libraries')));
app.use(express.static(__dirname));

app.get('/', function(req, res) {
  res.sendFile('contacts.html', {root: __dirname});
});

app.get('/add_contact', function(req, res) {
  res.sendFile('add_contact.html', {root: __dirname});
});

app.get('/get_json', function(req, res) {
  res.sendFile('data.json', {root: __dirname});
});

app.post('/new_contact', function(req, res) {
  var newperson = {
    'fname':req.body.fname,
    'lname':req.body.lname,
    'email':req.body.email,
    'phone':req.body.phone,
    'hobbies':req.body.hobbies
  }
  fs.readFile('data.json', function(err, data) {
    if (err) throw err;
    var oldjson = JSON.parse(data);
    oldjson.push(newperson);
    fs.writeFile('data.json', JSON.stringify(oldjson), function(err) {
      if (err) throw err;
      console.log('json file written successfully!!');
    });
  });

  res.redirect('/');
});


app.listen(8080);
