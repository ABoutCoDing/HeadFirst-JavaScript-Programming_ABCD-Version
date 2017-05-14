var http = require('http');
http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain; charset=UTF-8"});
  response.addHeader("Access-Control-Allow-Origin", "*");
  response.write("헬로 월드~");
  response.end();
}).listen(8888);  // http://127.0.0.1:8888
