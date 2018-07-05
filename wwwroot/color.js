var r = 255, g = 255, b = 255, bright = 100;
var mode , speed;
var blinkspeed , flowspeed;
var flowcolors =  [
    [255, 0, 0],
    [0, 255, 0],
    [0, 0, 255],
    [255, 0, 255],
];

function updateColor(){
    var socket = io.connect('http://localhost');
    socket.emit('color update', 
        {
            red:this.r,
            green:this.g,
            blue:this.b,
            brightness:this.bright,
            mode: this.mode,
            blinkspeed: this.blinkspeed,
            flowspeed: this.flowspeed,

            //WIP
        }
    );
}

window.onload = function(){
    //initialize the color pickers
    initColorPicker();
    //click the first tab on start
    openMode(event, "Recommended");
    //Click first flowpicker on start"
    openFlowpicker(event, 1);
}

function openMode(evt, modeName){
    console.log("Tabchange to " + modeName);
    if(modeName != 'Recommended'){
        mode = modeName;
    }

    //Variables
    var i, tabcontent, tablinks;
    //Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for(i = 0; i < tabcontent.length; i++){
        tabcontent[i].style.display = "none";
    }
    //Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for(i = 0; i < tablinks.length; i++){
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    //Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(modeName).style.display = "block";
    evt.currentTarget.classname += " active";
    //Change color of clicked button and unerline it
    evt.currentTarget.style.color = "red";

}

function initColorPicker()
{
    var colcanvs = document.getElementsByTagName("canvas");
    for (let i = 0; i < colcanvs.length; i++) {
        const element = colcanvs[i];
        
        var c = element;
        ctx = c.getContext("2d");
        // Build Color palette
        var gradient = ctx.createLinearGradient(0,0, c.width, 0);
        gradient.addColorStop(0,    "rgb(255,   0,   0)");
        gradient.addColorStop(0.13, "rgb(255, 255,   0)");
        gradient.addColorStop(0.30, "rgb(0,   255,   0)");
        gradient.addColorStop(0.51, "rgb(0,   255, 255)");
        gradient.addColorStop(0.70, "rgb(0,   0,   255)");
        gradient.addColorStop(0.86, "rgb(255, 0  , 255)");
        gradient.addColorStop(1,    "rgb(255,   0,   0)");
        // Apply gradient to canvas
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, c.width, c.height);

        c.onclick = function(mouseEvent)
        {
            var imgData = ctx.getImageData(mouseEvent.offsetX, mouseEvent.offsetY, 1, 1);
            var rgba = imgData.data;
            console.log("rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ", " + rgba[3] + ")");
            r = rgba[0];
            g = rgba[1]
            b = rgba[2];
            updateColor();
        }
    }
}


//TAB 1
var recitems = document.getElementsByClassName('recitem');
//Sunrise
recitems[0].onclick = function(){
    mode = color;
    bright = 60;
    r = 255; g = 230; b = 100;
    updateColor();
    console.log("Applied Recommendation 1");
}
//Night Mode
recitems[1].onclick = function(){
    mode = color;
    bright = 30;
    r = 2; g = 20; b = 255;
    updateColor();
    console.log("Applied Recommendation 2");
}
//Gaming
recitems[2].onclick = function(){
    console.log("Applied Recommendation 3");
}
//Movie
recitems[3].onclick = function(){
    mode = color;
    bright = 85;
    r = 200; g = 140; b = 255;
    updateColor();
    console.log("Applied Recommendation 4");
}
//Candle Flicker
recitems[4].onclick = function(){
    
    console.log("Applied Recommendation 5");
}
//White
recitems[5].onclick = function(){
    mode = color;
    bright = 80;
    r = 255; g = 245; b=240;
    updateColor();
    console.log("Applied Recommendation 6");
}
//TAB 2
$("#blinkspeed").on("mouseup", function(){
    blinkspeed = this.value;
});
//TAB 4
var flowpicker = document.getElementsByClassName("flowpicker-icon");
var currflowpicker;

function openFlowpicker(evt, pos){
    currflowpicker = pos;
    //remove selected tag from 
    var f = document.getElementsByClassName("currentflowselection");
    for (let i = 0; i < f.length; i++) {
        f[i].style.fill="transparent";        
    }
    f[pos-1].style.fill="red";
}

$("#flowspeed").on("mouseup", function(){
    flowspeed = this.value;
});

//Image data from canvas to get value of col slider
$("#colorslider").on("change", function(){
    canvas = document.getElementsByTagName("canvas")[1];
    //Get imagedata on x from 0 to 1 and 0,5*y and delete alpha value
    fillcolor = canvas.getContext("2d").getImageData((this.value/100)*canvas.width , canvas.height/2 , 1, 1).data;
    console.log(fillcolor);
    //Set it as one of the 4 Flowcolors
    flowcolors[currflowpicker-1] = fillcolor;
    //change color of svg;
    document.getElementById("flowcolor" + currflowpicker).children[0].style.stroke =
    "rgb(" + fillcolor[0] + ", " +  fillcolor[1] + ", " + fillcolor[2] +")";
    document.getElementById("flowcolor" + currflowpicker).children[1].style.fill = 
     "rgb(" + fillcolor[0] + ", " +  fillcolor[1] + ", " + fillcolor[2] +")";
});