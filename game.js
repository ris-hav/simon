var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var flag = true;
var count = 0;

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  level++;
  $("h1").text("Level " + level);
  gamePattern.push(randomChosenColor);
  animateKey(randomChosenColor);
  playSound(randomChosenColor);
}

$(document).keypress(function () {
  if (flag == true) {
    nextSequence();
    flag = false;
  }
});

$(".btn").click(function (event) {
  count++;
  console.log(count);
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animateClick(userChosenColor);

  if (userClickedPattern[count - 1] == gamePattern[count - 1]) {
    if (count == gamePattern.length) {
      setTimeout(function () {
        nextSequence();
        count = 0;
      }, 1000);
    }
  } else {
    $("h1").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);
    gamePattern = [];
    flag = true;
    level = 0;
    count = 0;
  }
});

function playSound(name) {
  var audio = new Audio("sound/" + name + ".mp3");
  audio.play();
}

function animateClick(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function animateKey(currentColor) {
  $("#" + currentColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
}
