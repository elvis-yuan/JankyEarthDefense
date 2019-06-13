import Game from "./game";

document.addEventListener("DOMContentLoaded", () => {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");

  var instructions = document.getElementById("game-instructions");
  var play = document.getElementById("play-button");
  play.addEventListener("click", handleClick);

  function handleClick(e) {
    const newGame = new Game(canvas, ctx);
    newGame.startGame();
    instructions.classList.toggle("hidden");
  }
});
