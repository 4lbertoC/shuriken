var http = require('http');
var fs = require('fs');
var port = process.env.PORT || 9615;

var visits = 0;

var getXmlVisits = function() {
	return 'This API has been deprecated, use json instead. Problem?\n\n' +
	'░░░░░▄▄▄▄▀▀▀▀▀▀▀▀▄▄▄▄▄▄░░░░░░░\n' +
'░░░░░█░░░░▒▒▒▒▒▒▒▒▒▒▒▒░░▀▀▄░░░░\n' +
'░░░░█░░░▒▒▒▒▒▒░░░░░░░░▒▒▒░░█░░░\n' +
'░░░█░░░░░░▄██▀▄▄░░░░░▄▄▄░░░░█░░\n' +
'░▄▀▒▄▄▄▒░█▀▀▀▀▄▄█░░░██▄▄█░░░░█░\n' +
'█░▒█▒▄░▀▄▄▄▀░░░░░░░░█░░░▒▒▒▒▒░█\n' +
'█░▒█░█▀▄▄░░░░░█▀░░░░▀▄░░▄▀▀▀▄▒█\n' +
'░█░▀▄░█▄░█▀▄▄░▀░▀▀░▄▄▀░░░░█░░█░\n' +
'░░█░░░▀▄▀█▄▄░█▀▀▀▄▄▄▄▀▀█▀██░█░░\n' +
'░░░█░░░░██░░▀█▄▄▄█▄▄█▄████░█░░░\n' +
'░░░░█░░░░▀▀▄░█░░░█░█▀██████░█░░\n' +
'░░░░░▀▄░░░░░▀▀▄▄▄█▄█▄█▄█▄▀░░█░░\n' +
'░░░░░░░▀▄▄░▒▒▒▒░░░░░░░░░░▒░░░█░\n' +
'░░░░░░░░░░▀▀▄▄░▒▒▒▒▒▒▒▒▒▒░░░░█░\n' +
'░░░░░░░░░░░░░░▀▄▄▄▄▄░░░░░░░░█░░';
};

var getJsonVisits = function() {
	return '{"visits":"' + (++visits) + '"}';
};

http.createServer(function (req, res) {
	if(req.url === '/visits/xml') {
		res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8', 'Access-Control-Allow-Origin': '*'});
		res.end(getXmlVisits());
	} else if(req.url === '/visits/json' ) {
		res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*'});
		res.end(getJsonVisits());
	} else if(req.url === '/whoareyou' ) {
		res.writeHead(418, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*'});
		res.end();
	} else if(req.url === '/areyouhere' ) {
		res.writeHead(301, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*', 'Location': 'whereareyou?search=europe'});
		res.end();
	} else if(req.url === '/whereareyou?search=europe' ) {
		res.writeHead(410, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*', 'I\'m on a': 'horse'});
		res.end();
	} else if(req.url === '/heavystuff' ) {
		res.writeHead(509, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*'});
		res.end();
	}
}).listen(port);
console.log('Listening on port ' + 9615);