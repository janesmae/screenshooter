var http = require('http');
var path = require('path');
var spawn = require('child_process').spawn;
var phjs = require('phantomjs').path;
const { parse } = require('querystring');

const PORT=8080;

function collectRequestData(request, callback) {
	const FORM_URLENCODED = 'application/x-www-form-urlencoded';
	if(request.headers['content-type'] === FORM_URLENCODED) {
		let body = '';
		request.on('data', chunk => {
			body += chunk.toString();
		});
		request.on('end', () => {
			callback(parse(body));
		});
	}  else {
		callback(null);
	}
}

function handleRequest(request, response){
	if (request.method === 'POST') {
		var request_data = '';
		collectRequestData(request, result => {
			real_url = result.url.toString();
			ls = spawn(phjs, ['src/screenshot.js',real_url]);
			ls.stdout.on('data', function (data) {
				console.log('stdout: ' + data);
				request_data = request_data + data;
			});
			ls.stderr.on('data', function (data) {
				console.log('stderr: ' + data);
			});
			ls.on('close', function (code) {
				// console.log('child process exited with code ' + code);
				response.end(request_data);
			});
		});
	} else {
		response.end('curl --data "url=http(s)://full.domain.org/including.files?and=get_params" host:port ');
	}
}

var server = http.createServer(handleRequest);
server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});
