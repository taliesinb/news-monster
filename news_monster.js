//*********************JAVASCRIPT************

var GAME = {elapsed:0, previousTime:(new Date()).getTime()};

var canvas = document.getElementById('myCanvas');
var ctxt = canvas.getContext('2d');
var stage_width = 600;
var stage_height = 400;

if(typeof Object.create !== "function"){
	Object.create = function(o){
		var F = function(){};
		F.prototype = o;
		return new F();
	}
}

/*function processKeyDown(e){
   if(e.keyCode === 37){ //left
      GAME.monster.dx += GAME.elapsed*dr;
   }

   if(e.keyCode === 39){ //right
      GAME.monster.arc += -GAME.elapsed*dr;
   }
}

GAME.draw_bg = function (){
	
   ctxt.strokeStyle='#000000';
   ctxt.fillStyle='#000000';
   ctxt.fillRect(0,0,stage_width,stage_height);
}

/*GAME.monster = {
    arcRadius:100.0,
    x:(stage_width/2-arcRadius), 
    y:stage_width/2, 
    dx:0, 
    dy:0, 
    ddx:0, 
    ddy:0,//500,
    radius:10,
    arc: Math.PI,
    dr:1
}
/*
GAME.monster.draw = function(){
   ctxt.shadowColor = '#FFFFFF';
   ctxt.strokeStyle = '#FFFFFF';
   ctxt.fillStyle = '#FFFF00';
   ctxt.shadowBlur = 40;
   ctxt.beginPath();
   ctxt.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
   ctxt.closePath();
   ctxt.fill();
}

/*GAME.monster.update = function(){

    this.x = Math.cos(this.arcRadius);
    this.y = Math.sin(this.arcRadius);
}
*/

GAME.play = function(){
   var d = new Date();
   var timeNow = d.getTime();
   //document.write((timeNow-GAME.previousTime)/1000);
   GAME.elapsed = (timeNow-GAME.previousTime)/1000;
   
   GAME.draw_bg();
   //GAME.monster.update();
   //GAME.monster.draw();

   GAME.previousTime = timeNow;
}

setInterval(GAME.play, 34);

//********************************************
