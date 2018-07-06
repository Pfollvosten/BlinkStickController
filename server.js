//imports
/*
const http = require('http');
const { parse } = require('querystring');
const url = require('url');
const fs = require('fs');*/
var blinkstick = require('blinkstick');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//setup
var port = process.env.PORT || 3001;
var led = blinkstick.findFirst();
led.inverse = true;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/wwwroot/blinkstick.html');
});

/*const server = http.createServer((req, res) => {
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
console.log("Server up and running!");*/


http.listen(8080 , function(){
    console.log("Server up and runnning!");
});

io.on('connection', function (socket) {
    socket.on('color update', function (data) {
        console.log("data received");
        applyColor(data);
    });
});


function applyColor(data){
    switch(data.mode){
        case "Color":
            led.setColor(data.color[0] , data.color[1] , data.color[2]);
        break;

        case "Blink":
            console.log("BLINK");
        break;

        case "Flow":
            console.log("FLOW");
        break;
    }

    //Apply brigtness
}