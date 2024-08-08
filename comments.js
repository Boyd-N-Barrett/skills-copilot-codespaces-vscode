// Create web server
// It is simple server that can handle POST requests
// and store comments in memory

var http = require('http');
var url = require('url');
var qs = require('querystring');

// Store comments
var comments = [];

// Create server
http.createServer(function (req, res) {
  // Parse URL
  var parsedUrl = url.parse(req.url);
  // Get query
  var query = qs.parse(parsedUrl.query);

  // Check if request is POST
  if (req.method === 'POST') {
    // Read data
    var data = '';
    req.on('data', function (chunk) {
      data += chunk;
    });
    req.on('end', function () {
      // Parse data
      var comment = qs.parse(data);
      // Add comment to list
      comments.push(comment);
      // Send response
      res.end('Comment added');
    });
  } else {
    // Send comments
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(comments));
  }
}).listen(8000);

// Print message
console.log('Server running at http://
