//*********************JAVASCRIPT************

var GAME = {elapsed:0, previousTime:(new Date()).getTime()};

var canvas = document.getElementById('myCanvas');
var ctxt = canvas.getContext('2d');
var stage_width = 600;
var stage_height = 400;

ctxt.font = "font-family:serif, font-size:12";

function processKeyDown(e){
    var m = GAME.monster;

   if(e.keyCode === 39){ //clockwise
      if(m.dangle === 0){
        m.dangle = m.dangleMax;
        m.image.src = "monsterImg.gif";
      }
      else if(m.dangle < 0){
        m.dangle = 0;
      }
   }
   else if(e.keyCode === 37){ //counterclockwise
      if(m.dangle === 0){
        m.dangle = -(m.dangleMax);
        m.image.src = "monsterImg2.gif";
      }
      else if(m.dangle > 0){
        m.dangle = 0;
      }
   }
}

function processKeyUp(){}

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

GAME.child = {
    valence:0.0,
    image:(new Image()),
    src:"child1.gif",
    update:function(){},
    draw:function(){
        if(!this.image.src){
           this.image.src = this.src;
        };
        ctxt.drawImage(this.image, 0, stage_height/2 - 25);
    }
}



GAME.text_prototype = function(str, val){
    this.content = str;
    this.dist = 600;
    this.maxAngle = Math.PI/4;
    this.minAngle = -Math.PI/4;
    this.speed = 100;
    this.angle = 0;
    this.valence = val;
    this.exists = true;
    this.gap = 9;
        
    this.setAngle = function(){
        this.angle = Math.random()*(this.maxAngle-this.minAngle) +
           this.minAngle;
    };
        
    this.update = function(){
        var d = this.dist;
        var a = this.angle;
        
        if(d<=20){
            this.exists = false;
            GAME.child.valence += this.valence;
        }
        else if(d < 100 && d > 85 && a < GAME.monster.angle+.4
           && a > GAME.monster.angle + .1){
            this.exists = false;
        }
        else{
           this.dist -= this.speed*GAME.elapsed;
           if(d <  200){
              this.gap = this.gap*0.92;
           }
        }
    };
    
    this.draw = function(){
        var c = this.content;
        ctxt.save();
        ctxt.translate(0, stage_height/2);
        ctxt.rotate(this.angle);
        ctxt.fillStyle='#000000';
        for(var i = 0; i < c.length; i++){
           ctxt.fillText(c.charAt(i), this.dist+this.gap*i, 0);
        }
        ctxt.restore();
    };
    
    this.tick = function(){
        this.update();
        this.draw();
    }
}

GAME.texts = [];

GAME.timeBetweenTexts = 2.0;
GAME.textCountdown = GAME.timeBetweenTexts;

GAME.play = function(){
   var timeNow = (new Date()).getTime();
   GAME.elapsed = (timeNow-GAME.previousTime)/1000;
   
   if(GAME.textCountdown <= 0){
      GAME.textCountdown = GAME.timeBetweenTexts;
      var txt = new GAME.text_prototype("hello", 0);
      txt.setAngle();
      GAME.texts.push(txt);
   }
   else{
      GAME.textCountdown -= GAME.elapsed;
   }
   //draw everything
   
   GAME.draw_bg();
   GAME.monster.draw();
   GAME.child.draw();

   var len = GAME.texts.length;
   
   for(var i = 0; i<len; i++){
      GAME.texts[i].draw();
   }
   
   //update everything
   GAME.monster.update();
   GAME.child.update();
   
   for(var i = 0; i < len; i++){
      if( GAME.texts[i].exists){
         GAME.texts[i].update();
      }
      else{
         GAME.texts.splice(i, 1);
         len--;
      }
   }
   
   //done

   GAME.previousTime = timeNow;
}

setInterval(GAME.play, 34);

//********************************************

var headlines = [];

function pipeCallback(obj) 
{
	var key, value;
	var	items = obj.value.items;
	for (key in items)
	{
		headlines.push(items[key].content);
	}
}