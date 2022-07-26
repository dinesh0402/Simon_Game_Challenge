// Simon Game logic.


var level = 0;
var index = 0;
var started = false;
var gamePattern = [];
var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        newSequence();
        started = true;
    }
});

$(".btn").click(function(){

    // Get the ID
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    // Play Sound
    playSound(userChosenColor);

    // Animate Press
    animatePress(userChosenColor);

    // Checking answer
    checkAnswer(userClickedPattern.length - 1);

});

function newSequence(){

    // Clear the user pattern and increment level
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);

    // Choose new color and add to game pattern
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    //Add flash effect
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    // Play Sound
    playSound(randomChosenColor);

}

function playSound (name){
    // Play audio
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
    
}

function animatePress(currentColor){
    
    //Button animation
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    
    // Checking for correct pattern
    // If most recent log is true, then check its length and then call newSequence()
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(gamePattern.length == userClickedPattern.length){
            setTimeout(function(){
                newSequence();
            },1000);
        }
    }

    // Else, play wrong sound and reset the game.
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        startOver();
    }
}

function startOver(){
    
    // Reset everything.
    level = 0;
    gamePattern = [];
    started = false;
}