//*********************JAVASCRIPT************

var GAME = {elapsed:0, previousTime:(new Date()).getTime()};

var canvas = document.getElementById('myCanvas');
var ctxt = canvas.getContext('2d');
var stage_width = 600;
var stage_height = 400;

GAME.mode = 0;//0-welcome, 1-play, 2-win, 3-lose

function processKeyDown(e){
    var p = GAME.mode;
    if(p === 0){
        GAME.mode = 1;
    }
    else if(p === 1){
       var m = GAME.monster;
   
      if(e.keyCode === 39){ //clockwise
           m.dangle = m.dangleMax;
           m.image.src = "monsterImg.gif";
      }
      else if(e.keyCode === 37){ //counterclockwise
           m.dangle = -(m.dangleMax);
           m.image.src = "monsterImg2.gif";
      }
   }
   else if(p === 2){
        GAME.mode = 1;
        GAME.child.valence = 0;
    }
    else if(p === 3){
        GAME.mode = 1;
        GAME.child.valence = 0;
    }
}

function processKeyUp(e){
   if(GAME.mode === 1){
       GAME.monster.dangle = 0;
    }
}

GAME.draw_welcome = function(){
    canvas.width = canvas.width;

    var key = new Image();
    key.src = "arrow.gif";

    ctxt.lineWidth = 4.0;
    ctxt.strokeStyle='#000000';
    ctxt.fillStyle='#FFFFFF';
    ctxt.fillRect(0,0,stage_width,stage_height);
    ctxt.beginPath();
    ctxt.rect(0,0,stage_width,stage_height);
    ctxt.closePath();
    ctxt.stroke();
    
    ctxt.save();
    ctxt.scale(3, 3);
    ctxt.drawImage(GAME.monster.image, 25,25)
    ctxt.restore();
    
    ctxt.save();
    ctxt.translate(350, 110);
    ctxt.scale(2.5, 2.5);
    ctxt.drawImage(key, 0, 0);
    ctxt.translate(76, 22);
    ctxt.rotate(Math.PI);
    ctxt.drawImage(key, 0, 0);
    ctxt.restore();
    
    ctxt.fillStyle='#000000';
    ctxt.font = "48px Helvetica";
    ctxt.fillText("You are the news monster.", 10, 40);
    ctxt.font = "24px Helvetica";
    ctxt.fillText("use             and", stage_width/2, 150);
    ctxt.fillText("Protect the child from tragic news while", stage_width/8,
        250);
    ctxt.fillText("allowing other news to get through.", stage_width/8, 275);
    ctxt.font = "bold 30px Helvetica";
    ctxt.fillText("PRESS ANY KEY TO START", stage_width/8, 400);
    }
    
GAME.draw_win = function(){
   canvas.width = canvas.width;

   var good_boy = new Image();
   good_boy.src = "child2.gif";

   ctxt.lineWidth = 4.0;
   ctxt.strokeStyle='#000000';
   ctxt.fillStyle='#FFFFFF';
   ctxt.fillRect(0,0,stage_width,stage_height);
   ctxt.beginPath();
   ctxt.rect(0,0,stage_width,stage_height);
   ctxt.closePath();
   ctxt.stroke();

   ctxt.save();
   ctxt.translate(30, 30);
   ctxt.scale(3, 3);
   ctxt.drawImage(good_boy, 0, 0);
   ctxt.restore();
   
   ctxt.fillStyle='#000000';
   ctxt.font = "48px Helvetica";
   ctxt.fillText("Congratulations!", 200, 150);
   ctxt.font = "24px Helvetica";
   ctxt.fillText("Your child is well-informed,", 200, 200);
   ctxt.fillText(" but not traumatized!", 200, 230);
   
   ctxt.font = "bold 30px Helvetica";
    ctxt.fillText("PRESS ANY KEY TO PLAY AGAIN", stage_width/10, 400);
}

GAME.draw_lose = function(){
   canvas.width = canvas.width;

   var good_boy = new Image();
   good_boy.src = "child3.gif";

   ctxt.lineWidth = 4.0;
   ctxt.strokeStyle='#000000';
   ctxt.fillStyle='#FFFFFF';
   ctxt.fillRect(0,0,stage_width,stage_height);
   ctxt.beginPath();
   ctxt.rect(0,0,stage_width,stage_height);
   ctxt.closePath();
   ctxt.stroke();

   ctxt.save();
   ctxt.translate(30, 30);
   ctxt.scale(3, 3);
   ctxt.drawImage(good_boy, 0, 0);
   ctxt.restore();
   
   ctxt.fillStyle='#000000';
   ctxt.font = "48px Helvetica";
   ctxt.fillText("Oh No!", 200, 150);
   ctxt.font = "24px Helvetica";
   ctxt.fillText("Your child is terrified!", 200, 200);
   ctxt.font = "18px Helvetica";
   ctxt.fillText(" He will most likely become a", 200, 220);
   ctxt.fillText(" vagabond conspiracy theorist,", 200, 240);
   ctxt.fillText(" or FOX news anchor.", 200, 260);
   
   ctxt.font = "bold 30px Helvetica";
    ctxt.fillText("PRESS ANY KEY TO PLAY AGAIN", stage_width/10, 400);
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

GAME.meter = {
   width: 200,
   height: 20,
   x: 10,
   y: 10,
   maxValence:1,
   draw:function(){
      var _x = this.x;
      var _y = this.y;
      var _w = this.width;
      var _h = this.height;
      var val = GAME.child.valence;
      
      if(val > this.maxValence){
         val = this.maxValence;
         GAME.mode = 2;
      }
      else if(val < -this.maxValence){
         val = -this.maxValence;
         GAME.mode = 3;
      }
      
      ctxt.lineWidth = 4.0;
      ctxt.strokeStyle='#000000';
      ctxt.beginPath();
      ctxt.rect(_x, _y, _w, _h);
      ctxt.closePath();
      ctxt.stroke();
      if(val <= 0){
         ctxt.fillStyle='#FF0000';
         ctxt.fillRect(
            _x + (1 - (val/(-this.maxValence)))*(_w/2),
            _y, (val/(-this.maxValence))*(_w/2), _h);
      }
      else{
         ctxt.fillStyle='#0000FF';
         ctxt.fillRect(_x+_w/2, _y, (val/(this.maxValence))*(_w/2), _h);
      }
   }
}


GAME.text_prototype = function(str, val){
    this.content = str;
    this.dist = 600;
    this.maxAngle = Math.PI/4;
    this.minAngle = -Math.PI/4;
    this.speed = 50;
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
            EvalSound('Wow');
            GAME.child.valence += this.valence;
        }
        else if(d < 100 && d > 85 && a < GAME.monster.angle+.5
           && a > GAME.monster.angle + .1){
            this.exists = false;
            EvalSound('Chomp');
        }
        else{
           this.dist -= this.speed*GAME.elapsed;
           if(d <  150){
              this.gap = this.gap*0.90;
           }
        }
    };
    
    this.draw = function(){
        var c = this.content;
        ctxt.save();
        ctxt.translate(0, stage_height/2);
        ctxt.rotate(this.angle);
        ctxt.fillStyle='#000000';
        ctxt.font = "font-family:serif, font-size:12";
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

eastereggs = [
	"Cure to cancer discovered, hope for millions", 
	"Poverty ended",
	"Nelson Mandela saved by three-legged puppy",
	"Peace in the Middle East",
	"Lollipop subsidy announced",
	"Jane McGonigal awarded MacArthur grant"
	];

function pop_suitable_headline()
{
	var head, score;
	
	if (Math.random() < 0.03 && eastereggs.length)
	{
		head = eastereggs.pop();
		score = +0.5;
		
	} else {
	
		head = headlines.pop();
		headlines = headlines.reverse();
		headlines.push(head);
		headlines = headlines.reverse();
		score = total_score(head);
		
		var sign = -1;
		if (score > 0) sign = 1;
		score = Math.abs(score);
		if (score > 6) score = 0.1;
		else if (score > 2) score = 0.06;
		else if (score > 0) score = 0.03;
		else score = 0;
		
		score = score * sign;
	}	
		
	if (score == 0 && head.split(' ').length < 4)
	{	
		return pop_suitable_headline();
	}
	
	if (score == 0) score = 0.05;
	
	return {"headline": head, "score": score};
}

GAME.play = function(){
   var md = GAME.mode;
   
   if(md === 0){
        GAME.draw_welcome();
        return;
   }
   else if(md === 2){
        GAME.draw_win();
        return;
   }
   else if(md === 3){
        GAME.draw_lose();
        return;
   }

   var timeNow = (new Date()).getTime();
   GAME.elapsed = (timeNow-GAME.previousTime)/1000;
   
   if(GAME.textCountdown <= 0 && headlines.length > 0){
      GAME.textCountdown = GAME.timeBetweenTexts;

	      var obj = pop_suitable_headline();
	      console.log(obj.headline, " ", obj.score);

	      var txt = new GAME.text_prototype(obj.headline, obj.score);
    	  txt.setAngle();
    	  GAME.texts.push(txt);
   }
   else{
      GAME.textCountdown -= GAME.elapsed;
   }
   //draw everything
   
   GAME.draw_bg();
   GAME.child.draw();

   var len = GAME.texts.length;
   
   for(var i = 0; i<len; i++){
      GAME.texts[i].draw();
   }
   GAME.monster.draw();
   GAME.meter.draw();
   
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