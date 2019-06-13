class Star {
  constructor(x, y, radius, speed, ctx) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.speed = speed / 25;
    this.radius = radius;
    this.saturation = 30 + this.radius * 5;
    this.lightness = 8 + this.radius * 3;
  }

  update(i) {
    this.y += this.speed * self.dt;
    if (this.y - this.radius >= self.ch) {
      this.x = self.rand(0, self.cw - this.radius);
      this.y = -this.radius;
    }
  }

  render() {
    this.ctx.beginPath();
    this.ctx.arc(
      this.x,
      this.y,
      this.radius < 0 ? 0 : this.radius,
      0,
      Math.PI * 2,
      false
    );
    this.ctx.fillStyle = "grey";
    this.ctx.fill();
  }
}
export default Star;
