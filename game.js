const buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

const nextSequence = () => {
  level++;

  $("h1").text(`Level ${level}`);

  userClickedPattern = [];

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
};

const playSound = (fileName) => {
  const audio = new Audio(`./sounds/${fileName}.mp3`);
  audio.play();
};

$(".btn").on("click", function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

const animatePress = (currentColour) => {
  $("#" + currentColour).addClass("pressed");

  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
};

$(document).on("keydown", function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

const checkAnswer = (lastIndex) => {
  if (userClickedPattern[lastIndex] === gamePattern[lastIndex]) {
    if (gamePattern.length === userClickedPattern.length) {
      console.log("success");
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }
};

const startOver = () => {
  level = 0;
  gamePattern = [];
  started = false;
};
