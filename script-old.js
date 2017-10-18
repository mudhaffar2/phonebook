
var objHttp = require('http');
var objFS = require('fs');
var objURL = require('url');
var objQString = require('querystring');


function sendResponse(code, response, content) {

	response.writeHead(code, {'content-type': 'text/html'});

	response.write(content);

	response.end();

}

function processPost(request, response, callback) {

  var queryData = '';

  if(typeof callback !== 'function') return null;

  if(request.method == 'POST') {

    request.on('data', function(data) {

      queryData += data;

      if(queryData.length > 1e6) {

        queryData = '';

        response.writeHead(413, {'Content-Type': 'text/plain'}).end();

        request.connection.destroy();

      }

    });

    request.on('end', function() {

      request.post = objQString.parse(queryData);

      callback();

    });

  } else {

    response.writeHead(405, {'Content-Type': 'text/plain'});

    response.end();

  }

}

function listContacts(request, response) {

   response.writeHead(200, {'content-type': 'text/html'});

   objFS.readFile('contacts.html', 'utf8', function(err, data) {

     if (err) throw err;

     response.write(data);

     response.end();

   });

}

function onRequest(request, response) {

	var varURL = objURL.parse(request.url, true);

	if(request.url == '/') {

		response.writeHead(200, {'content-type': 'text/html'});

		objFS.createReadStream('./add_contact.html').pipe(response);

	} else if(varURL.pathname == '/new_contact') {

		processPost(request, response, function() {

      var jsonFile = {};

      objFS.readFile('data.json', 'utf8', function(err, data) {

        if (err) throw err;

        jsonFile = JSON.parse(data);

      });

      console.log(jsonFile);
      console.log(response.post);

      // var newJson = jsonFile.push(request.post);

      objFS.writeFile('data.json', JSON.stringify(request.post), 'utf8', function(err){

       if (err) throw err;

      });

    });

	} else if(varURL.pathname == '/list_contacts') {
    
    listContacts(request, response);

  } else {

		sendResponse(404, response, 'Page not found!');

	}

}

////////////////  listening to port 8080 (http server)

objHttp.createServer(onRequest).listen(8080);



