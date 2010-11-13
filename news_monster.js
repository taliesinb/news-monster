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
      GAME.circle.dx = -55;
   }
   if(e.keyCode === 38){ //up
      GAME.circle.dy = -55;
   }
   if(e.keyCode === 39){ //right
      GAME.circle.dx = 55;
   }
   if(e.keyCode === 40){ //down
      GAME.circle.dy = 55;
   }
}*/

/*function processKeyUp(e){
   GAME.circle.dx = 0;
   GAME.circle.dy = 0;
}*/

GAME.draw_bg = function (){
   ctxt.strokeStyle='#000000';
   ctxt.fillStyle='#000000';
   ctxt.fillRect(0,0,stage_width,stage_height);
}

GAME.circle = {
	x:10, y:10, 
	dx:50, dy:50, 
	ddx:0, ddy:0,//500,
	radius:10
};

GAME.circle.draw = function(){
   ctxt.shadowColor = '#FFFFFF'
   ctxt.strokeStyle = '#FFFFFF';
   ctxt.fillStyle = '#FFFF00';
   ctxt.shadowBlur = 40;
   ctxt.beginPath();
   ctxt.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
   ctxt.closePath();
   ctxt.fill();
}

GAME.circle.update = function(){

   this.dx += this.ddx*GAME.elapsed;
   this.dy += this.ddy*GAME.elapsed;

   

   this.x += this.dx*GAME.elapsed;
   this.y += this.dy*GAME.elapsed;

   if((this.x + this.radius > stage_width && this.dx > 0)||
      (this.x - this.radius < 0 && this.dx < 0)){
         this.dx = -this.dx;
   }

   if((this.y + this.radius > stage_height && this.dy > 0)|| 
       (this.y - this.radius < 0 && this.dy < 0)){
      this.dy = -this.dy;
   }

}


GAME.play = function(){
   var d = new Date();
   var timeNow = d.getTime();
   //document.write((timeNow-GAME.previousTime)/1000);
   GAME.elapsed = (timeNow-GAME.previousTime)/1000;
   
   GAME.draw_bg();
   GAME.circle.update();
   GAME.circle.draw();

   GAME.previousTime = timeNow;
}

setInterval(GAME.play, 34);

//********************************************
