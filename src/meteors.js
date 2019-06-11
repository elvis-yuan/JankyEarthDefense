class Meteor {
  constructor(x, y, dx, dy) {
    // this.x = Math.floor(Math.random() * 600)
    this.x = x;
    this.y = y;
    this.dy = dx;
    this.dx = dy;
  }

  drawMeteor() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
    this.x -= this.dx;
    this.y -= this.dy;
  }
}
