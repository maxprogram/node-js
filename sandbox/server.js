var http 	= require("http"),
	url		= require("url");

function start(route){
	http.createServer(function(req, res) {
		var postData = "";
		var pathName = url.parse(req.url).pathname;
		console.log("Request for "+pathName+" received.");

		req.setEncoding("utf8");

	    req.addListener("data", function(postDataChunk) {
	      postData += postDataChunk;
	      console.log("Received POST data chunk '"+
	      postDataChunk + "'.");
	    });

	    req.addListener("end", function() {
	      route(pathName, res, postData);
	    });

	}).listen(3000);

	console.log("Server has started.")
}

exports.start = start;
