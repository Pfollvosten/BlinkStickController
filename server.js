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
var led = blinkstick.findFirst();
led.inverse = true;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/wwwroot/blinkstick.html');
});

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
    if(led){
        if(data.power){
            switch(data.mode){
                case "Color":
                    led.setColor(data.color[0] , data.color[1] , data.color[2]);
                break;
        
                case "Blink":

                break;
        
                case "Flow":
                    
                break;
            }
        }
        else
        {
            led.setColor("black");
        }
    }

    //Apply brigtness
}