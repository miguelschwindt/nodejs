// Configuración básica de un servidor con Node.js
 
var port = 8008;
var serverUrl = "127.0.0.1";
 
var http = require("http");
var path = require("path"); 
var fs = require("fs"); 		
 
console.log("Running nodejs server " + serverUrl + ":" + port);
 
http.createServer( function(req, res) {
 
	var now = new Date();
 
	var filename = req.url || "index.html";
	var ext = path.extname(filename);
	var localPath = __dirname;
	var validExtensions = {
		".html" : "text/html",			
		".js": "application/javascript", 
		".css": "text/css",
		".txt": "text/plain",
		".jpg": "image/jpeg",
		".gif": "image/gif",
		".png": "image/png"
	};
	//is ValidExt tiene el valor del mimeType para setearselo al header de la response
	var isValidExt = validExtensions[ext];
	
	if (isValidExt) {
		
		localPath += filename;
		path.exists(localPath, function(exists) {
			if(exists) {
				console.log("Serving file: " + localPath);
				getFile(localPath, res, validExtensions[ext]);
			} else {
				console.log("File not found: " + localPath);
				res.writeHead(404);
				res.end("404 - Page not found");
			}
		}); 
	} else {
		console.log("Invalid file extension detected: " + ext);
		res.writeHead(404);
		res.end("404 - Page not found");
	}
 
}).listen(port, serverUrl);
 
function getFile(localPath, res, mimeType) {
	fs.readFile(localPath, function(err, contents) {
		if(!err) {
			res.setHeader("Content-Length", contents.length);
			res.setHeader("Content-Type", mimeType);
			res.statusCode = 200;			
			res.end(contents);
		} else {
			res.writeHead(500);
			res.end();
		}
	});
}