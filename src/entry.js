import Game from "./game";

document.addEventListener("DOMContentLoaded", () => {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  const newGame = new Game(canvas, ctx);
  newGame.startGame();
});
