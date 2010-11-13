//*********************JAVASCRIPT************

var GAME = {elapsed:0, previousTime:(new Date()).getTime()};

var canvas = document.getElementById('myCanvas');
var ctxt = canvas.getContext('2d');
var stage_width = 600;
var stage_height = 400;

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
   ctxt.lineWidth = 4.0;
   ctxt.strokeStyle='#000000';
   ctxt.fillStyle='#FFFFFF';
   ctxt.fillRect(0,0,stage_width,stage_height);
   ctxt.beginPath();
   ctxt.arc(0, stage_height/2, 80, -Math.PI/2, Math.PI/2, false);
   ctxt.closePath();
   ctxt.stroke();
   ctxt.beginPath();
   ctxt.rect(0,0,stage_width,stage_height);
   ctxt.closePath();
   ctxt.stroke();
}

GAME.monster = {
    spin:0,
    dist:70,
    angle:-Math.PI/2,
    dangle:0,
    dangleMax:1.5,
    x:(stage_width/2 + this.dist),
    y:(stage_width/2)
}

GAME.monster.image = new Image();
GAME.monster.image.src = "monsterImg.gif";

GAME.monster.update = function(){
    var maxAngle = Math.PI/2 - .4;
    var minAngle = -Math.PI/2;

    this.angle += this.dangle*GAME.elapsed;
    
    if(this.angle > maxAngle){
        this.dangle = 0;
        this.angle = maxAngle;
    }
    if(this.angle < minAngle){
        this.dangle = 0;
        this.angle = minAngle;
    }
    
    //this.x = stage_width/2 + this.dist * Math.cos(this.angle);
    //this.y = stage_height/2 + this.dist * Math.sin(this.angle);
}

GAME.monster.draw = function(){
    ctxt.save();
    ctxt.translate(0, stage_height/2);
    ctxt.rotate(this.angle);
    ctxt.drawImage(this.image, this.dist, 0);
    ctxt.restore();
}

GAME.monster.tick = function(){
    this.update();
    this.draw();
}

GAME.text_prototype = function(str, val){
    this.content = str;
    this.dist = 600;
    this.maxAngle = Math.PI/4;
    this.minAngle = -Math.PI/4;
    this.speed = 100;
    this.angle = 0;
    this.valence = val;
        
    this.setAngle = function(){
        this.angle = Math.random()*(this.maxAngle-this.minAngle) +
           this.minAngle;
    };
        
    this.update = function(){
        if(this.dist>=0){
            this.dist -= this.speed*GAME.elapsed;
        }
    };
    
    this.draw = function(){
        ctxt.save();
        ctxt.translate(0, stage_height/2);
        ctxt.rotate(this.angle);
        ctxt.fillStyle='#000000';
        ctxt.fillText(this.content, this.dist, 0);
        ctxt.restore();
    };
    
    this.tick = function(){
        this.update();
        this.draw();
    }
}

GAME.texts = new Array();

GAME.timeBetweenTexts = 5.0;
GAME.textCountdown = this.timeBetweenTexts;

GAME.text1 = new GAME.text_prototype("hello there!", 0);
GAME.text1.setAngle();

GAME.play = function(){
   var timeNow = (new Date()).getTime();
   GAME.elapsed = (timeNow-GAME.previousTime)/1000;
   
   /*if(GAME.textCountdown <= 0){
      GAME.textCountdown = GAME.timeBetweenTexts;
      GAME.texts.push(new GAME.text_prototype("hi"));
   }
   else{
      GAME.textCountdown -= GAME.elapsed;
   }*/
   
   GAME.draw_bg();

   GAME.monster.tick();
   
   GAME.text1.tick();
   
   /*var len = GAME.texts.length;
   
   for(var i = 0, i < len, i++){
      GAME.texts[i].tick();
   }*/

   GAME.previousTime = timeNow;
}

setInterval(GAME.play, 34);

//********************************************
