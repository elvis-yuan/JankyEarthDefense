class Circle {
  drawCircle() {
    ctx.beginPath();
    ctx.arc(300, 300, 20, 0, Math.PI * 2);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
  }
}
