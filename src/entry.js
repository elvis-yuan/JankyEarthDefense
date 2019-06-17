import Game from "./game";

document.addEventListener("DOMContentLoaded", () => {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");

  var instructions = document.getElementById("game-instructions");
  var play = document.getElementById("play-button");
  var gameover = document.getElementById("game-over");
  play.addEventListener("click", handleClick);

  function handleClick(e) {
    const newGame = new Game(canvas, ctx);
    newGame.startGame();
    instructions.classList.add("hidden");
  }
  var retry = document.getElementById("retry");
  retry.addEventListener("click", () => {
    gameover.classList.toggle("show");
    instructions.classList.remove("hidden");
  });
});
