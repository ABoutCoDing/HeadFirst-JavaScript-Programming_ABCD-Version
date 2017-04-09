var http = require('http');
http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("헬로 월드~");
  response.end();
}).listen(8888);  // http://127.0.0.1:8888
