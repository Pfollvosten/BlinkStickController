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

app.use(express.static("wwwroot"));
app.get('/wwwroot/color.js', function (req, res) {
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
                    function blink(){
                        led.morph(data.flowcolors[0][0], data.flowcolors[0][1], data.flowcolors[0][2], {"duration":200, "steps":50 } , function(){
                            if(data.power && data.mode == "Blink"){
                                setTimeout(1000/data.blinkspeed);
                                blink();
                            }
                        });
                    }
                break;
                case "Flow":
                    function flow(){
                        led.morph(data.flowcolors[0][0], data.flowcolors[0][1], data.flowcolors[0][2], {"duration":data.flowspeed*1000/4 , "steps":50 } , function(){
                            led.morph(data.flowcolors[1][0], data.flowcolors[1][1], data.flowcolors[1][2], {"duration":data.flowspeed*1000/4 , "steps":50 } , function(){
                                led.morph(data.flowcolors[2][0], data.flowcolors[2][1], data.flowcolors[2][2], {"duration":data.flowspeed*1000/4 , "steps":50 } , function(){
                                    led.morph(data.flowcolors[3][0], data.flowcolors[3][1], data.flowcolors[3][2], {"duration":data.flowspeed*1000/4 , "steps":50 } , function(){
                                        if(data.power && data.mode == "Flow"){ flow(); }
                                    });
                                });
                            });
                        });
                    }
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