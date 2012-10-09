var querystring = require("querystring");

var handle = {
	"/": 		start,
	"/start": 	start, 
	"/upload": 	upload 
};

function route(pathname, response, postData){
	console.log("About to route a request for "+pathname);

	if (typeof handle[pathname]==='function'){
		return handle[pathname](response, postData);
	} else {
		console.log("No request handler found for "+pathname);
		response.writeHead(404, {"Content-Type": "text/plain"});
    	response.write("404 Not found");
    	response.end();
	} 
}

function start(response){
	console.log("Request handler 'start' was called.");
	
	var body = '<html>'+
	    '<head>'+
	    '<meta http-equiv="Content-Type" content="text/html; '+
	    'charset=UTF-8" />'+
	    '</head>'+
	    '<body>'+
	    '<form action="/upload" method="post">'+
	    '<textarea name="text" rows="20" cols="60"></textarea>'+
	    '<input type="submit" value="Submit text" />'+
	    '</form>'+
	    '</body>'+
	    '</html>';

	response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, postData){
	console.log("Request handler 'upload' was called.");
  	response.writeHead(200, {"Content-Type": "text/plain"});
  	response.write("You've sent the text: "+querystring.parse(postData).text);
  	response.end();
}

exports.route = route;
exports.handle = handle;