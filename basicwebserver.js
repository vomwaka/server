var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    host = '127.0.0.1',
    port = '9000';

var mimes = {
    ".htm" : "text/html",
    ".css" : "text/css",
    ".js" : "text/javascript",
    ".gif" : "image/gif",
    ".jpg" : "image/jpg",
    ".png" : "image/png"
}

var server = http.createServer(function(req, res){
    var filepath = (req.url === '/') ? ('./index.html') : ('.' + req.url);
    var contentType = mimes[path.extname(filepath)];
    
    //check to see if the file exits
    
    fs.exists(filepath, function(file_exists){
        if(file_exists){
            //read and serve
            fs.readFile(filepath, function(error, content){
                if(error){
                    res.writeHead(500);
                    res.end();
                }else {
                    res.writeHead(200, { 'Content-Type' : contentType});
                    res.end(content, 'utf-8');
                }
            })
        }else {
            res.writeHead(404);
            res.end("Sorry we could find any file!");
        }
    })
}).listen(port, host, function(){
              console.log('server is running on http://' + host + ':' + port)
              })