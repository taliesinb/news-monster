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
      GAME.monster.angle += GAME.elapsed*GAME.monster.dangle;
   }

   if(e.keyCode === 39){ //right
      GAME.monster.angle += -GAME.elapsed*GAME.monster.dangle;
   }
}*/

GAME.draw_bg = function (){
	
   ctxt.strokeStyle='#000000';
   ctxt.fillStyle='#000000';
   ctxt.fillRect(0,0,stage_width,stage_height);
}

GAME.monster = {
    spin:0,
    dist:100,
    angle:0,
    dangle:1,
    x:(stage_width/3),
    y:(stage_width/3)
}

GAME.monster.image = new Image();
GAME.monster.image.src = "monsterImg.png";

/*GAME.monster.update = function(){
    this.
}*/

GAME.monster.draw = function(){
    ctxt.drawImage(this.image, this.x, this.y);
}

GAME.play = function(){
   var d = new Date();
   var timeNow = d.getTime();
   //document.write((timeNow-GAME.previousTime)/1000);
   GAME.elapsed = (timeNow-GAME.previousTime)/1000;
   
   GAME.draw_bg();
   
   GAME.monster.draw();

   GAME.previousTime = timeNow;
}

setInterval(GAME.play, 34);

//********************************************
