var http = require('http');
var path = require('path');
var spawn = require('child_process').spawn;
var phjs = require('phantomjs').path;

const PORT=8080;

function handleRequest(request, response){

	var request_data = '';
	url = request.url;
	real_url = url.substr(1);

	console.log('url: ' + real_url);

	ls = spawn(phjs, ['src/screenshot.js',real_url]);

	ls.stdout.on('data', function (data) {
		console.log('stdout: ' + data);
		request_data = request_data + data;
	});

	ls.stderr.on('data', function (data) {
		console.log('stderr: ' + data);
	});

	ls.on('close', function (code) {
		console.log('child process exited with code ' + code);
		response.end(request_data);
	});

}

var server = http.createServer(handleRequest);
server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});
