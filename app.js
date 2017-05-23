var http = require('http');
var url = require('url');
var fs = require('fs');

//create a global variable that will cache the contents of our html file
//for the lifetime of our application
//by default, all functions in node are asynchronous unless otherwise specified
//
var newPostFormHtml = fs.readFileSync('views/post/new.html');

function renderNewPostForm(request, response){
  response.writeHead(200, {
    'Content-type': 'text/html; charset=utf-8'
  });
  response.end(newPostFormHtml);
}

function render404(request, response) {
  response.writeHead(404);
  response.end('404 Move along, there is nothing here to see!');
}

var server = http.createServer(function(request, response){
  var newPostFormRegex = new RegExp('^/posts/new/?$');
  var pathname = url.parse(request.url).pathname;
  if (newPostFormRegex.test(pathname)){
    renderNewPostForm(request, response);
  } else {
    render404(request, response);
  }
  });

server.listen(8000);

console.log('Listening on http://127.0.0.1:8000');
