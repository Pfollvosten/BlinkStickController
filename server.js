//imports
const http = require('http');
const { parse } = require('querystring');
const url = require('url');
const fs = require('fs');
//var app = require('express')();
//var http = require('http').Server(app);
var io = require('socket.io')(http);
//
var port = process.env.PORT || 3001;


/*
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
*/
const server = http.createServer((req, res) => {
    console.log('got request...processing');
    fs.readFile('./wwwroot' + req.url , function(err, data){
        if(!err){
            var dotoffset = req.url.lastIndexOf('.');
            var mimetype = dotoffset == -1
                ? 'text/plain'
                : {
                    '.html' : 'text/html',
                    '.ico' : 'image/x-icon',
                    '.jpg' : 'image/jpeg',
                    '.png' : 'image/png',
                    '.gif' : 'image/gif',
                    '.css' : 'text/css',
                    '.js' : 'text/javascript'
                } [req.url.substr(dotoffset)];
            
            res.setHeader('Content-type' , mimetype);
            res.end(data);
            console.log(req.url , mimetype);
        }else{
            console.log('file not found: ' + req.url);
            res.writeHead(404, "Not Found")
            res.end();
        }
    });
}).listen(8080, '192.168.178.28');
console.log("Server up and running!");




io.on('connection', function (socket) {
    socket.on('color update', function (col) {
        console.log(col);
    });
});
