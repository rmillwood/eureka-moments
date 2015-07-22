function navigateToAppPage(appPageId) { 
    var appPages = document.getElementsByClassName('appPage');
    for ( var i = 0; i < appPages.length; i++ ) {
         if (appPages[i].id == appPageId) {
            appPages[i].style.display = "block";
            }
         else {
            appPages[i].style.display = "none";
            }
         }  
}

var tapOn  = true;
var plugIn = true;
var manIn  = true;
var singOn = true;
var pauseOn= false;


var waterlevel = 0;
var overFlow = false;
var noOfGraphpoints = 0;
var manY=-245;
var graphStart=false;
textHeight = 16;
var waterLevel = 0;
var bathX = 0;
var showerX = bathX+58;
var waterHeightLimit=-76;
var musicNote=true;
var musicCount = 0;
var musicOn=false;
var switchMusicNotes = false;

var flowGraphic = document.getElementById("flow");
var plugGraphic = document.getElementById("plug");
var manGraphic = document.getElementById("man");
var singGraphic = document.getElementById("sing");
var note1Graphic = document.getElementById("note1");
var note2Graphic = document.getElementById("note2");
var note3Graphic = document.getElementById("note3");
var flowGraphic = document.getElementById("flow");
var overflowGraphic = document.getElementById("overflow");
var drainGraphic = document.getElementById("drain");
 
// Action button functions
function tapButtonPressed()  { tapOn  = ! tapOn; updateTap(); }
function plugButtonPressed() { plugIn = ! plugIn;  updatePlug(); }
function manButtonPressed()  { manIn  = ! manIn; updateMan();  }
function singButtonPressed() { singOn = ! singOn;  updateSing(); }
function pauseButtonPressed(){ pauseOn  = ! pauseOn; updatePause(); }


function updateTap() { if( tapOn ) 
  flowGraphic.style.display="none"; else 
  flowGraphic.style.display="block"; 
  };

function updatePlug() { if( plugIn )
  plugGraphic.setAttribute('transform','translate(0,0)'); else 
  plugGraphic.setAttribute('transform','translate(0,-8)')
  };

function updateMan() { 
  timeToAnimate = 300;
  translationYMax = -200;
  var translationy;
  var startTime;
  var elapsedTime;
  var animateManOutFunctionID;
  var animateManInFunctionID;

  function animateManOut(timeStamp) {
    if (!startTime) startTime = timeStamp;
    elapsedTime = timeStamp - startTime;
    translationY = translationYMax * (elapsedTime / timeToAnimate);
    transformText = 'translate(0,' + translationY.toString() + ')';
    manGraphic.setAttribute( 'transform', transformText);
    if (elapsedTime < timeToAnimate)
      animateManOutFunctionID = requestAnimationFrame(animateManOut); else {
      transformText = 'translate(0,' + translationYMax.toString() + ')';
      manGraphic.setattribute( 'transform', transformText);
      cancelAnimationFrame(animateManOutFunctionID);
      }
  };
  
  function animateManIn(timeStamp) {
    if (!startTime) startTime = timeStamp;
    elapsedTime = timeStamp - startTime;
    translationY = translationYMax * (1 - (elapsedTime / timeToAnimate));
    transformText = 'translate(0,' + translationY.toString() + ')';
    manGraphic.setAttribute('transform', transformText);
    if (elapsedTime < timeToAnimate) 
      animateManInFunctionID = requestAnimationFrame(animateManIn); else {
      transformText = 'translate(0,0)';
      manGraphic.setAttribute( 'transform', transformText ); 
      cancelAnimationFrame(animateManInFunctionID);
      }
  };

  if ( manIn ) {
    startTime = null;
    animateManInFunctionID = requestAnimationFrame(animateManIn); 
    } else {
    startTime = null;
    animateManOutFunctionID = requestAnimationFrame(animateManOut);
   }
    
}

function updateSing() { if( singOn ) {
  singGraphic.style.display="block"} else { 
  singGraphic.style.display="none"; } };

function updatePause() { if( pauseOn ) {
} else {  } };


function modelBath() {

if ( tapOn & waterLevel < 103 ) { 
  waterLevel+=1; 
  };
if ( ! plugIn & waterLevel > 0 ) {
  waterLevel-=1;
  };
};  


// A function which is called every 2 seconds 
// to add a new point on the graph to portray the current water level.
function graphPointCreate(ctx){
if(pause==false){
  if(recording==false){
  }
  else {
    noOfGraphpoints++;
    var xPos = 45 + (noOfGraphpoints+3);
    var yPos =  405 + waterLevel * 2;
    ctx.fillStyle="#0000ff";
    ctx.fillRect(xPos,yPos,4,4);
    
    if(xPos>400){
      noOfGraphpoints=0;
      ctx.clearRect(45,410,450,waterHeightLimit*2);
    }

  }
}
};



//A function which increases the height of the water.
function increaseWater(){
  if(waterLevel != waterHeightLimit)
    waterLevel--;
};

//A function which decreases the height of the water.
function decreaseWater(){
  if(waterLevel != 0)
    waterLevel++;
};



//A function which checks the X & Y co-ordinates of the man and updates them if a button has been pressed.
//Increases the water level as man gets into the bath.
//Decreases the water level as man exits the bath.
function checkMan(ctx){

    if(manY<bathY+3)
      ctx.clearRect(450/2, 120,200,-200); //clear area above bath

    if(manIn==true && manY< bathY)   //move man down if button pressed
      manY=manY+4;

    if(manIn==false && manY!= -245)   //move man up otherwise
      manY=manY-4;

    if(manY+55>waterLevel && manY<bathY && manIn == true && waterLevel<0){   //raise water if man getting into bath
      increaseWater();
    }

    if(manY+55>waterLevel && manIn == false){                //lower water if man getting out of bath
      decreaseWater();
    }
}


//checks whether the tap is on or and updates water level accordingly and draws the water coming
//from the tap
function checkTap(ctx){
    if(tapOn===true && plugIn==true && waterLevel != waterHeightLimit){
     increaseWater();
   }
   ctx.clearRect(showerX-3,120,20,-87); // clear shower water above bath
   if(tapOn){

     ctx.fillStyle="#66FFFF"; //set water colour
      ctx.clearRect(showerX,200,7,waterHeightLimit+1); //clear shower water in bath
     ctx.fillRect(showerX,200,7,waterHeightLimit+1); //fill shower water in bath
     ctx.fillRect(showerX,120,7,-87);                //fill shower water above bath
  }
}


//checks whether the plug is in or out and updates water level accordingly
function checkPlug(ctx){
  if(plugIn==false && (waterLevel!=0) && tapOn==false) {
      decreaseWater();
    }

  ctx.fillStyle="#464646";
   
  if(plugIn==true){
    ctx.fillRect(160,200,15,-5);
  }

  else
    ctx.fillRect(160,195,15,-5);
}


//A function which draws music notes as the man sings.
// Switches between two music notes images periodically.

function checkMusicNote(ctx){
 
  if(musicNote==true)
    loadImage(ctx,notesOne,450/3-20, 30);  

 else
   loadImage(ctx,notesTwo,450/3-20, 30);   

  musicCount++;

  if(musicCount%15==0){

    switchMusicNotes = true;
    if(musicNote==true)
      musicNote=false;

    else
      musicNote=true;
  }

   if(musicCount>60){
    musicOn=false;

    musicCount=0;
  }
 

}




//A function which when run loads all of the images onto the canvas,
//Draws the current water level in the bath depending on which
//of the user buttons have been clicked.
//
function drawBoard(ctx){
    if(pause==false){
  ctx.fillStyle="#66FFFF";    //water colour
  ctx.clearRect(bathX+20,201,305,waterHeightLimit);
  ctx.fillRect(bathX+20,201,305,waterLevel);           //draw water
  
  checkMan(ctx);
  checkTap(ctx);
  checkPlug(ctx);

  loadImage(ctx,bathImage,bathX, bathY);   //load bath
  loadImage(ctx,graphImage,10,450/2+20);    //
  loadImage(ctx,manImage,bathX, manY);

  if(musicOn==true)
    checkMusicNote(ctx);


  if(switchMusicNotes==true || musicOn==false){
     ctx.clearRect(450/3-20, 30, 100,71);     //clear area of music notes between changes and after music stops
    switchMusicNotes=false;
  }
}


}



/*
* Plays the audio, remove this code if you don't want any sounds
*/
function play(){
	if(manIn==true && plugIn==true && waterLevel!=0 && tapOn==false){
		var audio=document.getElementById("audio");

    musicOn=true;
		audio.play();
	}


}






//The main Function of the programme.
//Runs several functions periodically
var main = function(){

}
 
addEventListener('load', function(){ try { main(); } catch(e) { alert(e.msg); } }, false);
