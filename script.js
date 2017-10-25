
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

app.get('/get_hobbies', function(req, res) {
  res.sendFile('pidHobbies.json', {root: __dirname});
});

app.get('/user', function(req, res) {
  var userId = req.query.pid;
  fs.readFile('data.json', function(err, data) {
    if (err) throw err;
    var jsonFile = JSON.parse(data);
    var recPidHobbies = jsonFile.filter(function(person){
      return person.pid == userId;
    });
    var hobbiesList = recPidHobbies[0].hobbies.split('#');
    fs.writeFile('pidHobbies.json', JSON.stringify(hobbiesList), function(err) {
      if (err) throw err;
    });
  });
  res.sendFile('hobbies.html', {root: __dirname});
});

app.post('/new_contact', function(req, res) {
  var newperson = {
    'pid':Math.ceil(Math.random()*1000000),
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
    });
  });

  res.redirect('/add_contact');
});


app.listen(8080);
