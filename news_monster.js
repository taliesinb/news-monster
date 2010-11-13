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

function processKeyDown(e){
    var m = GAME.monster;

   if(e.keyCode === 39){ //clockwise
      if(m.dangle === 0){
        m.dangle = m.dangleMax;
      }
      else if(m.dangle < 0){
        m.dangle = 0;
      }
   }
   else if(e.keyCode === 37){ //counterclockwise
      if(m.dangle === 0){
        m.dangle = -(m.dangleMax);
      }
      else if(m.dangle > 0){
        m.dangle = 0;
      }
   }
}

GAME.draw_bg = function (){
   ctxt.lineWidth = 20.0;
   ctxt.strokeStyle='#000000';
   ctxt.fillStyle='#FFFFFF';
   ctxt.fillRect(0,0,stage_width,stage_height);
   ctxt.rect(0,0,stage_width,stage_height);
}

GAME.monster = {
    spin:0,
    dist:100,
    angle:-Math.PI/2,
    dangle:0,
    dangleMax:1.5,
    x:(stage_width/2 + this.dist),
    y:(stage_width/2)
}

GAME.monster.image = new Image();
GAME.monster.image.src = "monsterImg.gif";

GAME.monster.update = function(){
    this.angle += this.dangle*GAME.elapsed;

    //this.x = stage_width/2 + this.dist * Math.cos(this.angle);
    //this.y = stage_height/2 + this.dist * Math.sin(this.angle);
}

GAME.monster.draw = function(){
    ctxt.save();
    ctxt.translate(stage_width/2, stage_height/2);
    ctxt.rotate(this.angle);
    ctxt.drawImage(this.image, this.dist, 0);
    ctxt.restore();
}

GAME.play = function(){
   var d = new Date();
   var timeNow = d.getTime();
   //document.write((timeNow-GAME.previousTime)/1000);
   GAME.elapsed = (timeNow-GAME.previousTime)/1000;
   
   GAME.draw_bg();
   GAME.monster.update();
   GAME.monster.draw();

   GAME.previousTime = timeNow;
}

setInterval(GAME.play, 34);

//********************************************
